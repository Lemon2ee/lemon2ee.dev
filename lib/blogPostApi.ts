import fs from "fs";
import path from "path";
import { MetaData } from "@/types/blog";

// Function to fetch metadata from all MDX files in the _posts folder
export async function fetchAllMetaData(): Promise<MetaData[]> {
  const postsDirectory = path.join(process.cwd(), "_posts");
  const filenames = fs.readdirSync(postsDirectory);
  const allMetaData: MetaData[] = [];

  filenames.forEach((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Extract metadata from the file content
    const metaMatch = fileContents.match(/export const meta = (.*?);/s);
    if (metaMatch && metaMatch[1]) {
      try {
        // Evaluate the string as an object
        const metaData = eval("(" + metaMatch[1] + ")");
        allMetaData.push(metaData as MetaData);
      } catch (error) {
        console.error(`Error parsing metadata in file ${filename}: `, error);
      }
    }
  });

  return allMetaData;
}
