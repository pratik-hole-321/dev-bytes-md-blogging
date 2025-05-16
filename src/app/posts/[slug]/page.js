import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import MarkdownComponents from "@/components/MarkdownComponents";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkHighlight } from "@/lib/remarkHighlight";
import Link from "next/link";
import Head from "next/head";

function fetchPosts(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = fetchPosts(slug);
  if (!post) return notFound();

  return (
    <>
      <Head>
        <title>{post?.title} | My Blog</title>
        <meta name="description" content={post?.content.slice(0, 150)} />
        <meta property="og:title" content={post?.title} />
        <meta
          property="og:description"
          content={post?.content?.slice(0, 150)}
        />
        <meta property="og:image" content={post?.coverImg} />
      </Head>

      <article className="max-w-4xl mx-3 px-4 sm:px-6 lg:px-8 mt-12 text-base">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-block bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            ← Back To Home
          </Link>

          <h1 className="font-extrabold text-3xl sm:text-4xl leading-tight">
            {post.title}
          </h1>

          <p className="text-sm text-gray-500">
            <span className="inline-block bg-blue-300/20 px-3 py-1 rounded-full">
              {post.date}
            </span>
          </p>

          <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={post.coverImg}
              layout="fill"
              objectFit="cover"
              alt={post.title}
              className="rounded-lg"
            />
          </div>

          <div className="prose max-w-none dark:prose-invert prose-headings:font-bold prose-img:rounded-lg prose-a:text-blue-600">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkHighlight]}
              components={MarkdownComponents}
            >
              {post?.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  );
}
