import { getPostData } from "@/lib/posts";
import { getAllPostIds } from "@/lib/posts"; // (新しい関数をインポート)

type Props = {
  params: {
    id: string;
  };
};

export default async function Post({ params }: Props) {
  console.debug(`params: ${JSON.stringify(params)}`);
  const { id } = await params;
  console.debug(`id: ${id}`);
  const post = getPostData(id);

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}

export async function generateStaticParams() {
  return getAllPostIds();
}
