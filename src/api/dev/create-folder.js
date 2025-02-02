import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (!import.meta.env.DEV) {
    return res.status(404).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { folderName } = JSON.parse(req.body);

    if (!folderName) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    const sanitizedName = folderName.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const folderPath = path.resolve(__dirname, "../../data", sanitizedName);

    try {
      await fs.access(folderPath);
      return res.status(400).json({ error: "Folder already exists" });
    } catch {
      await fs.mkdir(folderPath, { recursive: true });
      res.status(200).json({ success: true, path: folderPath });
    }
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: error.message });
  }
}
