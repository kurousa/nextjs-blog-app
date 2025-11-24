import { getSortedPostsData } from "@/lib/posts";

export default async function Home() {
  // 記事一覧を取得
  const posts = await getSortedPostsData();

  // 取得したデータを描画
  return (
    <main className="mx-auto max-w-2xl">
      <h1>記事一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => {
          return (
            <li key={post.id} className="border-b pb-4">
              <h2>
                <a href={`/posts/${post.id}`}>{post.title}</a>
              </h2>
              <p className="text-sm text-gray-500">
                公開日:{new Date(post.date).toLocaleDateString()}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
