import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (!import.meta.env.DEV) {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    const dataDir = path.resolve(__dirname, "../../data");
    const entries = await fs.readdir(dataDir, { withFileTypes: true });

    // Get only directories and filter out non-event directories
    const folders = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((folder) => ({
        id: folder.name,
        name: folder.name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }));

    res.status(200).json(folders);
  } catch (error) {
    console.error("Failed to list folders:", error);
    res.status(500).json({ error: "Failed to list folders" });
  }
}
