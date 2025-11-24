import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

export type PostMetadata = {
  id: string;
  title: string;
  date: string;
};

export type PostData = PostMetadata & {
  contentHtml: string;
};

const POSTS_DIR = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // 1. posts ディレクトリ内のファイル名を取得する
  const fileNames = fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith(".md"));

  // 2. ファイル名を基に、メタデータを取得
  const allPostsData: PostMetadata[] = fileNames.map((fileName) => {
    const id = fileName.substring(0, fileName.lastIndexOf("."));
    const fullPath = path.join(POSTS_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    } as PostMetadata; // NOTE: satisfiesが本来は望ましい
  });

  // 3. メタデータを日付順で降順（新しい順）にソート
  return allPostsData.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });
}

export function getPostData(id: string): PostData {
  const fullPath = path.join(POSTS_DIR, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = remark()
    .use(html as any)
    .processSync(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml: contentHtml,
  } as PostData;
}

export function getAllPostIds(): { id: string }[] {
  // 1. posts ディレクトリ内のファイル名を取得する
  const fileNames = fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith(".md"));

  // 2. IDの配列を返す
  return fileNames.map((fileName) => {
    return {
      id: fileName.substring(0, fileName.lastIndexOf(".")),
    };
  });

}