import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createKebabCase = (str) => {
  return (
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric characters with hyphens for a kebab case
      .replace(/^-+|-+$/g, "") || 
    "untitled"
  ); 
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: "dev-cms-routes",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === "/api/dev/save-event" && req.method === "POST") {
            try {
              let body = "";
              for await (const chunk of req) {
                body += chunk.toString();
              }
              const { event, filePath, isEditing, targetFolder } =
                JSON.parse(body);

              // For editing existing files
              if (isEditing && filePath) {
                const absolutePath = path.resolve(
                  __dirname,
                  "src",
                  filePath.replace("../../", "")
                );

                await fs.writeFile(
                  absolutePath,
                  JSON.stringify(event, null, 2)
                );

                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    success: true,
                    message: "Event updated successfully",
                    path: filePath,
                  })
                );
                return;
              }

              // For new files
              if (!targetFolder) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    error: "Target folder is required for new files",
                  })
                );
                return;
              }

              if (!event?.name?.en) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "English name is required" }));
                return;
              }

              const folderPath = path.join(
                __dirname,
                "src",
                "data",
                targetFolder
              );
              try {
                await fs.access(folderPath);
              } catch {
                await fs.mkdir(folderPath, { recursive: true });
              }

              const filename = createKebabCase(event.name.en) + ".json";
              const fullPath = path.join(folderPath, filename);

              await fs.writeFile(fullPath, JSON.stringify(event, null, 2));

              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: true,
                  message: "Event saved successfully",
                  path: fullPath,
                })
              );
            } catch (error) {
              console.error("Failed to save event:", error);
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  error: "Failed to save event",
                  details: error.message,
                })
              );
            }
          } else {
            if (req.url.startsWith("/dev/cms")) {
              req.url = "/index.html";
            }
            next();
          }
        });
      },
    },
    {
      name: "save-event",
      configureServer(server) {
        server.middlewares.use("/api/dev/save-event", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          try {
            const chunks = [];
            for await (const chunk of req) {
              chunks.push(chunk);
            }
            const data = JSON.parse(Buffer.concat(chunks).toString());
            const { event, filePath, isEditing } = data;

            // Convert relative path to absolute
            const absolutePath = path.resolve(
              fileURLToPath(import.meta.url),
              "../src",
              filePath.replace("../../", "")
            );

            // Ensure the directory exists
            await fs.mkdir(path.dirname(absolutePath), { recursive: true });

            // Format the event data
            const formattedEvent = JSON.stringify(event, null, 2);

            // Write the file
            await fs.writeFile(absolutePath, formattedEvent, "utf-8");

            res.statusCode = 200;
            res.end(
              JSON.stringify({
                message: `Event ${
                  isEditing ? "updated" : "saved"
                } successfully!`,
                path: filePath,
              })
            );
          } catch (error) {
            console.error("Failed to save event:", error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      },
    },
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    outDir: "dist/cms",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        cms: path.resolve(__dirname, "src/routes/dev/cms/index.html"),
      },
    },
  },
});
