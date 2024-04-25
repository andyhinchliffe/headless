import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";

async function getPosts() { 
  const query = `
  {
    posts(first: 6) {
      nodes {
        title
        content
        uri
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        
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

// console.log(getPosts());

export default async function PostList() {
  const posts = await getPosts();

  

  return (<>
  
    <Suspense fallback={<Loading />}>
    
    <div className=" bg-[url('/background.jpg')] h-screen bg-cover bg-no-repeat">
    <div className="navbar bg-transparent">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Template</a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
  
</div>
<div className="h-screen flex items-center justify-center">
<h1 className="-mt-14 text-center font-medium text-4xl">Wireframe Headless Server</h1>
</div>  
        
        
    
      </div>
      



        <div className="flex flex-wrap mx-20 mt-4 justify-center ">
        {posts.map((post) => (
          
          <div key={post.uri} className="m-6">
            <Link href={`/post/${post.uri}`}>
            
      <div className="card w-96 mx-4 bg-base-100 shadow-xl">
  <figure><img src={post.featuredImage.node.sourceUrl} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{post.title}</h2>
    <div dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
    
    <div className="card-actions justify-end">
      <button className="btn btn-gray-400">More Info</button>
    </div>
  </div>
</div>

      
              
              
              {/* <div className="text-sm mt-2"
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 200) + "...",
                }}
              /> */}
            </Link>
          </div>
          
        )
        
        
        
        )}
        
      </div>
      
    </Suspense>
    



    
    <footer className="footer w-fullfooter-center p-4 bg-base-300 text-base-content">
  <aside>
    <p>Copyright © 2024 - All right reserved by Headless Wordpress Template</p>
  </aside>
</footer>
    </>
  );
}
