import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import MarkdownComponents from "@/components/MarkdownComponents";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkHighlight } from "@/lib/remarkHighlight";
import Link from "next/link";
import Head from "next/head";

const md = new MarkdownIt();

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
        <meta name="description" content={post?.content.slice(0, 20)} />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.content?.slice(0, 20)} />
        <meta property="og:image" content={post?.coverImg} />
      </Head>
      <article className="max-w-3xl mx-auto px-4 flex justify-center items-center mt-12 text-[18px]">
        <div className="px-3 py-10">
          <Link
            href="/"
            prefetch={true}
            className="text-white bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-md transition"
          >
            Back To Home
          </Link>
          <h1 className="font-bold text-2xl mt-3">{post.title}</h1>
          <p className="text-right text-gray-500 py-4">
            <span className="bg-blue-300/20 px-2 py-3 rounded-full">
              {post.date}
            </span>
          </p>
          <Image
            className="mx-auto mt-5 w-full h-auto"
            src={post.coverImg}
            width={650}
            height={200}
            alt={post.title}
          />
          <div className="prose max-w-none dark:prose-invert">
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
