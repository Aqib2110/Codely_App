// // import fs from "fs/promises";
// // import fsSync from "fs";
// // import fg from "fast-glob";
// // import path from "path";
// // import { NextRequest, NextResponse } from "next/server";
// // import { db } from "../../auth/[...nextauth]/route";
// // import { getAuthSession } from "@/utils/getSession";

// // /* ---------------- Helper to read all file paths ---------------- */
// // const files = async (setup: string) => {
// //   const basePath = path.resolve(`./templates/${setup}`);
// //   const dirs = fsSync.readdirSync(basePath, { withFileTypes: true });

// //   const innerAppDir = dirs.find(
// //     (d) =>
// //       d.isDirectory() &&
// //       !["node_modules", ".git", ".next", "dist", "build"].includes(d.name)
// //   );

// //   const hasFiles = dirs.some((d) => d.isFile());
// //   const cwd = hasFiles ? basePath : path.join(basePath, innerAppDir?.name || "");

// //   const matched = await fg("**/*", {
// //     cwd,
// //     ignore: [
// //       "**/node_modules/**",
// //       "**/.next/**",
// //       "**/dist/**",
// //       "**/build/**",
// //       "**/.turbo/**",
// //       "**/.git/**",
// //       "**/.vercel/**",
// //       "**/coverage/**",
// //       "**/*.log",
// //       "**/*.lock",
// //     ],
// //     dot: true,
// //     onlyFiles: true,
// //     absolute: false,
// //   });

// //   matched.sort((a, b) => a.localeCompare(b));
// //   return { cwd, matched };
// // };

// // /* ---------------- Helper to read file contents ---------------- */
// // const readFilesAsMap = async (matched: string[], cwd: string) => {
// //   const entries = await Promise.all(
// //     matched.map(async (f) => {
// //       const filePath = path.join(cwd, f);
// //       try {
// //         const content = await fs.readFile(filePath, "utf-8");
// //         return [f, content];
// //       } catch {
// //         console.warn("⚠️ Skipped missing file:", filePath);
// //         return null;
// //       }
// //     })
// //   );
// //   return Object.fromEntries(entries.filter((e): e is [string, string] => e !== null));
// // };

// // /* ---------------- Convert file map to tree ---------------- */
// // function buildTree(fileMap: Record<string, string>) {
// //   const root: any[] = [];

// //   function getFolder(parts: string[], level: any[]) {
// //     let current = level;
// //     for (const part of parts) {
// //       let folder = current.find((x) => x.name === part && x.type === "folder");
// //       if (!folder) {
// //         folder = { name: part, type: "folder", children: [] };
// //         current.push(folder);
// //       }
// //       current = folder.children;
// //     }
// //     return current;
// //   }

// //   for (const [path, content] of Object.entries(fileMap)) {
// //     const parts = path.split("/").filter(Boolean);
// //     if (parts.length === 1) {
// //       root.push({ name: parts[0], type: "file", content });
// //     } else {
// //       const folderParts = parts.slice(0, -1);
// //       const fileName = parts.at(-1)!;
// //       const folder = getFolder(folderParts, root);
// //       folder.push({ name: fileName, type: "file", content });
// //     }
// //   }

// //   return root;
// // }

// // /* ---------------- Main POST endpoint ---------------- */
// // export async function POST(req: NextRequest) {
// //    const session = await getAuthSession();
// //       if (!session) {
// //           return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //         }
// //         const userId = (session?.user as any)?.id;
// //   try {
// //     const setups = ["nextjs-setup", "reactjs-setup", "nodejs-setup", "nodets-setup"];

// //     for (const setup of setups) {
// //       const { cwd, matched } = await files(setup);
// //       const fileMap = await readFilesAsMap(matched, cwd);
// //       const tree = buildTree(fileMap);

// //       await db.setup.create({
// //         data: {
// //           name: setup,
// //           fileContent: JSON.stringify(tree),
// //         },
// //       });

// //       console.log(`✅ Saved setup: ${setup}`);
// //     }

// //     return NextResponse.json(
// //       { message: "All setups saved as directory trees successfully." },
// //       { status: 200 }
// //     );
// //   } catch (error: any) {
// //     console.error("❌ Error:", error);
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "../../auth/[...nextauth]/route";
// import { getAuthSession } from "@/utils/getSession";
// import fs from "fs/promises";
// import path from "path";
// import fg from "fast-glob";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req: NextRequest) {
//   // const session = await getAuthSession();
//   // if (!session) {
//   //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   // }
//   // const userId = (session.user as any).id;
//   // const setups = ["nextjs-setup", "reactjs-setup", "nodejs-setup", "nodets-setup"];
//     const setups = ["nextjs-setup"];


//   try {
//     for (const setup of setups) {
//       const baseDir = path.resolve(`./templates/${setup}`);

//       // Get all files in the setup folder
//       const files = await fg("**/*", {
//         cwd: baseDir,
//         ignore: [
//           "**/node_modules/**",
//           "**/.next/**",
//           "**/dist/**",
//           "**/build/**",
//           "**/.turbo/**",
//           "**/.git/**",
//           "**/.vercel/**",
//           "**/coverage/**",
//           "**/*.log",
//           "**/*.lock",
//         ],
//         onlyFiles: true,
//       });

//       // Create an array of file objects with IDs
//       const fileList = await Promise.all(
//         files.map(async (file) => {
//           const fullPath = path.join(baseDir, file);
//           try {
//             const content = await fs.readFile(fullPath, "utf-8");
//             return {
//               id: uuidv4(),      
//               path: file,
//               name: path.basename(file),
//               type: "file",
//               content,
//             };
//           } catch {
//             console.warn(`⚠️ Skipped reading file: ${file}`);
//             return null;
//           }
//         })
//       );
// const validFiles = fileList.filter((f): f is NonNullable<typeof f> => f !== null);

// let global:any = [];

// function buildTree(files: any[]) {
//   const root: any[] = [];

//   for (const file of files) {
//     const parts = file.path.split("/"); // e.g. ["my-app", "src", "app", "page.tsx"]
//     let currentLevel = root;

//     parts.forEach((part:any, index:any) => {
//       const isFile = index === parts.length - 1;
//       let existing = currentLevel.find((item) => item.name === part);

//       // if this level doesn't exist, create it
//       if (!existing) {
//         if (isFile) {
//           existing = {
//             id: file.id,
//             name: part,
//             type: "file",
//             content: file.content,
//           };
//         } else {
//           existing = {
//             id: uuidv4(),
//             name: part,
//             type: "folder",
//             children: [],
//           };
//         }
//         currentLevel.push(existing);
//       }

//       // move one level deeper if it's a folder
//       if (!isFile) {
//         currentLevel = existing.children;
//       }
//     });
//   }

//   return root;
// }
// const tree = buildTree(validFiles);
// console.log(tree,"aqib");

//       // Filter out any nulls from skipped files
//       // Save the project to the database
//       // await db.setup.create({
//       //   data: {
//       //     name: setup,
//       //     fileContent: JSON.stringify(validFiles),
//       //   },
//       // });

//       // console.log(`✅ Saved project: ${setup} (${validFiles.length} files)`);
//     }

//     return NextResponse.json(
//       { message: "All setups saved successfully with unique file IDs!" },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("❌ Error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/route";
import { getAuthSession } from "@/utils/getSession";
import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  // 🔒 Uncomment these if you want to restrict access to logged-in users
  // const session = await getAuthSession();
  // if (!session) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }
  // const userId = (session.user as any).id;

const setups = ["nextjs-setup", "reactjs-setup", "nodejs-setup", "nodets-setup"];
  try {
    for (const setup of setups) {
      const baseDir = path.resolve(`./templates/${setup}`);

      // 🗂️ Get all files in the setup folder
      const filePaths = await fg("**/*", {
        cwd: baseDir,
        ignore: [
          "**/node_modules/**",
          "**/.next/**",
          "**/dist/**",
          "**/build/**",
          "**/.turbo/**",
          "**/.git/**",
          "**/.vercel/**",
          "**/coverage/**",
          "**/*.log",
          "**/*.lock",
        ],
        onlyFiles: true,
      });

      // 📄 Read files and attach metadata
      const files = await Promise.all(
        filePaths.map(async (relativePath) => {
          const fullPath = path.join(baseDir, relativePath);
          const content = await fs.readFile(fullPath, "utf-8");
          return {
            id: uuidv4(),
            path: relativePath,
            name: path.basename(relativePath),
            type: "file",
            content,
          };
        })
      );

      // 🪄 Build nested folder/file tree
      function buildTree(files: any[]) {
        const root: any[] = [];

        for (const file of files) {
          const parts = file.path.split("/");
          let currentLevel = root;

          parts.forEach((part:any, index:any) => {
            const isFile = index === parts.length - 1;
            let existing = currentLevel.find((item) => item.name === part);

            if (!existing) {
              if (isFile) {
                existing = {
                  id: file.id,
                  name: part,
                  type: "file",
                  content: file.content,
                };
              } else {
                existing = {
                  id: uuidv4(),
                  name: part,
                  type: "folder",
                  children: [],
                };
              }
              currentLevel.push(existing);
            }

            if (!isFile) currentLevel = existing.children;
          });
        }

        return root;
      }

      const tree = buildTree(files);

      console.log(tree,"aqib");
      console.dir(tree, { depth: null });

      // 💾 Save to DB
      await db.setup.create({
        data: {
          name: setup,
          fileContent: JSON.stringify(tree),
        },
      });

      console.log(`✅ Saved project: ${setup}`);
    }

    return NextResponse.json(
      { message: "All setups saved successfully!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}























