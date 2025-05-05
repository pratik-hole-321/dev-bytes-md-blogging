import { getAllPosts } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();
  // console.log(posts);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <h2 className="text-3xl text-zinc-700 font-bold py-6 text-devbytes">
        DevBytes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white shadow-sm border flex flex-col justify-between  border-slate-200 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-1 transition-transform duration-300"
          >
            {post.coverImg && (
              <div className="relative w-full h-48">
                <Image
                  src={post.coverImg}
                  alt={post.slug}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-center"
                />
              </div>
            )}

            <div className="p-4">
              <h6 className="text-slate-800 text-lg font-semibold mb-2">
                {post.title}
              </h6>
              <p className="text-slate-600 text-sm">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + "..."
                  : post.content}
              </p>
            </div>

            <div className="flex justify-between items-center px-4 pb-4">
              <Link
                href={`/posts/${post.slug}`}
                className="text-white bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-md transition"
              >
                Read more
              </Link>
              <span className="text-xs text-gray-500">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
