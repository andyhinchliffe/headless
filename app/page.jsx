import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

async function getPosts() {
  const query = `
  {
    posts(first: 5) {
      nodes {
        title
        content
        uri
        date
      }
    }
  }
  
  `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ... any other headers you need to include (like authentication tokens)
      },
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<Loading />}>
      <div>
      <h1 className="text-center font-medium text-lg">Wireframe Headless Server</h1>
        {posts.map((post) => (
          <div key={post.uri} className="card mx-auto bg-slate-200 p-4 my-4 w-4/5 h-24 rounded-xl">
            <Link href={`/post/${post.uri}`}>
              <h3 className="font-semibold">{post.title}</h3>
              <div >{post.sourceURL}</div>
              <div className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 200) + "...",
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </Suspense>
  );
}