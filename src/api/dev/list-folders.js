import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  // Only allow in development mode
  if (!import.meta.env.DEV) {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    const dataDir = path.resolve(__dirname, "../../data");
    const entries = fs.readdirSync(dataDir, { withFileTypes: true });

    // Get only directories and filter out non-event directories
    const folders = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((folder) => {
        const folderPath = path.join(dataDir, folder.name);
        const files = fs
          .readdirSync(folderPath)
          .filter((file) => file.endsWith(".json"))
          .sort((a, b) => {
            // Sort by the numeric prefix if it exists
            const aNum = parseInt(a.split("-")[0]);
            const bNum = parseInt(b.split("-")[0]);
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return aNum - bNum;
            }
            return a.localeCompare(b);
          });

        return {
          name: folder.name,
          files,
        };
      });

    res.status(200).json(folders);
  } catch (error) {
    console.error("Failed to list folders:", error);
    res.status(500).json({ error: "Failed to list folders" });
  }
}
