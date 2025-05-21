import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

// 마크다운 렌더링 컴포넌트
export const MarkdownRenderer = ({ markdown }) => {
  console.log(markdown);
  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        table: ({ node, ...props }) => (
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginBottom: "1.5rem",
              overflow: "hidden",
              color: "#000",
            }}
            {...props}
          />
        ),
        th: ({ node, ...props }) => (
          <th
            style={{
              border: "1px solid #7d7d7d",
              padding: "10px",
              backgroundColor: "#F0F2F6",
              textAlign: "left",
              fontWeight: "600",
            }}
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            style={{
              border: "1px solid #7d7d7d",
              backgroundColor: "#fff",
              padding: "10px",
              textAlign: "left",
            }}
            {...props}
          />
        ),
        strong: ({ node, ...props }) => (
          <strong
            style={{
              fontWeight: 700,
            }}
            {...props}
          />
        ),
        h1: ({ node, ...props }) => (
          <h1
            style={{
              color: "#232527",
              fontSize: "24px",
              borderBottom: "2px solid #ddd",
              paddingBottom: "1rem",
            }}
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            style={{
              color: "#232527",
              fontSize: "24px",
              marginTop: "40px",
              marginBottom: "10px",
            }}
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            style={{
              color: "#232527",
              fontSize: "1.4rem",
            }}
            {...props}
          />
        ),
        h4: ({ node, ...props }) => (
          <h4
            style={{
              margin: "16px 0 8px 0",
            }}
            {...props}
          />
        ),
        h5: ({ node, ...props }) => (
          <h5
            style={{
              fontSize: "15px",
              fontWeight: 400,
            }}
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p
            style={{
              color: "#666",
              fontSize: "15px",
            }}
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul
            style={{
              margin: "5px 0",
            }}
            {...props}
          />
        ),
        li: ({ node, ...props }) => (
          <li
            style={{
              margin: 0,
            }}
            {...props}
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            style={{
              borderLeft: "5px solid #0070f3",
              paddingLeft: "1rem",
              backgroundColor: "#eef7ff",
              color: "#555",
            }}
            {...props}
          />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          return !inline ? (
            <pre
              style={{
                backgroundColor: "#f0f0f0",
                padding: "1rem",
                borderRadius: "8px",
                overflowX: "auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <code {...props}>{children}</code>
            </pre>
          ) : (
            <code
              style={{
                backgroundColor: "#f0f0f0",
                padding: "2px 4px",
                borderRadius: "4px",
                fontSize: "0.9rem",
                color: "#d63384",
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
        hr: ({ node, ...props }) => (
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#ddd",
              margin: "1.5rem 0",
            }}
            {...props}
          />
        ),
      }}
    />
  );
};
