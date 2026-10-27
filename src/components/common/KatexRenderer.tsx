import React, { useMemo } from 'react';
import katex from 'katex';

interface KatexRendererProps {
  content: string;
  className?: string;
}

/**
 * Splits text into inline ($...$) and block ($$...$$) LaTeX expressions and renders them with KaTeX
 */
export const KatexRenderer: React.FC<KatexRendererProps> = ({ content, className = '' }) => {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    try {
      // First process block math $$...$$
      let processed = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
        try {
          return `<div class="my-2 py-1 overflow-x-auto text-center">${katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false
          })}</div>`;
        } catch {
          return `$$${math}$$`;
        }
      });

      // Then process inline math $...$
      processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false
          });
        } catch {
          return `$${math}$`;
        }
      });

      // Convert line breaks
      processed = processed.replace(/\n/g, '<br/>');

      return processed;
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div 
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};
