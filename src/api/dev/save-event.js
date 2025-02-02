import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createKebabCase = (str) => {
  return (
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled"
  );
};

export default async function handler(req, res) {
  if (!import.meta.env.DEV) {
    return res.status(404).json({ error: "Not found" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { event, filePath, isEditing, targetFolder } = JSON.parse(req.body);

    // For editing existing files
    if (isEditing && filePath) {
      const absolutePath = path.resolve(
        __dirname,
        "../../",
        filePath.replace("../../", "")
      );

      await fs.writeFile(absolutePath, JSON.stringify(event, null, 2));

      res.status(200).json({
        success: true,
        message: "Event updated successfully",
        path: filePath,
      });
      return;
    }

    // For new files
    if (!targetFolder) {
      return res.status(400).json({
        error: "Target folder is required for new files",
      });
    }

    if (!event?.name?.en) {
      return res.status(400).json({ error: "English name is required" });
    }

    const folderPath = path.resolve(__dirname, "../../data", targetFolder);
    try {
      await fs.access(folderPath);
    } catch {
      await fs.mkdir(folderPath, { recursive: true });
    }

    const filename = createKebabCase(event.name.en) + ".json";
    const fullPath = path.join(folderPath, filename);

    await fs.writeFile(fullPath, JSON.stringify(event, null, 2));

    res.status(200).json({
      success: true,
      message: "Event saved successfully",
      path: fullPath,
    });
  } catch (error) {
    console.error("Failed to save event:", error);
    res.status(500).json({
      error: "Failed to save event",
      details: error.message,
    });
  }
}
