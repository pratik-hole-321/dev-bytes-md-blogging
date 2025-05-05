// components/MarkdownComponents.js

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownComponents = {
  // Inline & Block Code
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        className="bg-zinc-800 text-zinc-400 rounded px-1 py-0.5 inline-block w-full"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Links
  a({ href, children, ...props }) {
    return (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },

  // Tables
  table({ children }) {
    return (
      <table className="w-full border border-gray-300 border-collapse my-4">
        {children}
      </table>
    );
  },
  thead({ children }) {
    return <thead className="bg-gray-100">{children}</thead>;
  },
  tbody({ children }) {
    return <tbody>{children}</tbody>;
  },
  tr({ children }) {
    return <tr className="border-b">{children}</tr>;
  },
  th({ children }) {
    return (
      <th className="border px-3 py-2 font-bold bg-gray-200">{children}</th>
    );
  },
  td({ children }) {
    return <td className="border px-3 py-2">{children}</td>;
  },

  // Paragraphs
  p({ children }) {
    // If children contains a <div> or block element, wrap in a fragment instead
    const isOnlyText = React.Children.toArray(children).every(
      (child) => typeof child === "string"
    );

    return isOnlyText ? (
      <p className="my-2 text-gray-800">{children}</p>
    ) : (
      <div className="my-8 text-gray-800">{children}</div>
    );
  },

  // Headings
  h1({ children }) {
    return <h1 className="text-3xl font-bold my-4 mt-5">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-2xl font-semibold my-3 mt-5">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-xl font-medium my-2 mt-10">{children}</h3>;
  },

  hr({ children }) {
    return <hr className="text-black/25 font-bold my-5" />;
  },

  // Lists
  ul({ children }) {
    return <ul className="list-disc text-gray-800 pl-6 my-2">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal text-gray-800 pl-6 my-2">{children}</ol>;
  },

  img({ src, alt, ...props }) {
    return (
      <img
        loading="lazy"
        src={src}
        alt={alt || ""}
        className="w-full h-auto rounded-md my-4"
        {...props}
      />
    );
  },

  div({ children }) {
    return <div className="mt-10">{children}</div>;
  },

  // Blockquotes
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    );
  },
};

export default MarkdownComponents;
