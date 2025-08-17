"use client";

import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "katex/dist/katex.min.css";
import "./preview.css";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
  doc: string;
  className?: string;
};

const Preview: React.FC<Props> = ({ doc, className }) => {
  return (
    <div className={`preview markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          img: ({ node, ...props }) => {
            if (!props.src) return null;

            return (
              <img
                {...props}
                className="max-w-full h-auto rounded-md my-2"
                loading="lazy"
                alt={props.alt || ""}
              />
            );
          },
        }}
      >
        {doc}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;
