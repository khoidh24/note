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
  previewMode: boolean;
};

const Preview: React.FC<Props> = ({ doc, previewMode }) => {
  const markdown = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
        img: ({ node, ...props }) =>
          props.src ? (
            <img
              {...props}
              className="max-w-full h-auto rounded-md my-2"
              loading="lazy"
              alt={props.alt || ""}
            />
          ) : null,
      }}
    >
      {doc}
    </ReactMarkdown>
  );

  return (
    <div
      className={`preview markdown-body ${
        previewMode ? "!w-screen" : "overflow-auto"
      }`}
    >
      {previewMode ? (
        <div className="container mx-auto px-0 md:px-24 lg:px-72 pb-4">
          {markdown}
        </div>
      ) : (
        markdown
      )}
    </div>
  );
};

export default Preview;
