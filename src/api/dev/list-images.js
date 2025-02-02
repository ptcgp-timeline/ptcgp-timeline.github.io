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
    const imagesDir = path.resolve(__dirname, "../../../public/images/events");
    const files = await fs.readdir(imagesDir);
    const images = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    res.status(200).json(images);
  } catch (error) {
    console.error("Failed to list images:", error);
    res.status(500).json({ error: "Failed to list images" });
  }
}
