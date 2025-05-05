import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "src/posts");

export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postDir);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(postDir, fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");

    const { content, data } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    };
  });
};
