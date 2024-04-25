"use client";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../../loading";

async function getPost(uri) {
  const query = `
  query GetPostByUri($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      
    }
  }
      `;

  const variables = {
    uri,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.post) {
    return responseBody.data.post;
  } else {
    throw new Error("Failed to fetch the post");
  }
}

export default async function PostDetails({ params }) {
  const post = await getPost(params.uri);

  return (<>
  
    <main >
    <div className="bg-[url('/background.jpg')] h-full bg-cover bg-no-repeat">
    <div className="navbar bg-transparent">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>



    {/* <p>{post.featuredImage.node.sourceUrl}</p> */}
    
    <div className="mt-4 card   mx-auto w-1/2 bg-base-100 shadow-xl">
  <figure><img src={post.featuredImage.node.sourceUrl} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{post.title}</h2>
    <p dangerouslySetInnerHTML={{ __html: post.content }}></p> 
    <div className="card-actions justify-end">
    <Link href="/">
      <button className="btn btn-gray-600">Back</button>

      </Link>
    </div>
  </div>
</div>
      <nav>
        {/* <h1>{post.title}</h1> */}
      </nav>
      <Suspense fallback={<Loading />}>
        <div className="card " key={post.uri}>
          {/* <p dangerouslySetInnerHTML={{ __html: post.content }} /> */}
        </div>
      </Suspense>
      </div>
    </main>
    <footer className="footer w-fullfooter-center p-4 bg-base-300 text-base-content">
  <aside>
    <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
    </>);
}
