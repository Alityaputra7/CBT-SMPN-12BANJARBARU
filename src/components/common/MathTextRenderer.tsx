import React, { useMemo } from 'react';
import katex from 'katex';

export interface MathTextRendererProps {
  content?: string | null;
  className?: string;
  inline?: boolean;
}

interface MathSegment {
  type: 'text' | 'inline-math' | 'block-math';
  value: string;
}

const KNOWN_LATEX_COMMANDS =
  '(?:frac|dfrac|tfrac|sqrt|sum|int|iint|iiint|oint|lim|sin|cos|tan|csc|sec|cot|arcsin|arccos|arctan|log|ln|exp|times|div|pm|mp|cdot|leq|geq|le|ge|neq|ne|approx|equiv|sim|infty|pi|alpha|beta|gamma|delta|theta|lambda|mu|sigma|omega|phi|psi|Delta|Sigma|Omega|circ|to|rightarrow|leftarrow|Rightarrow|Leftarrow|leftrightarrow|Leftrightarrow|subset|subseteq|supset|supseteq|in|notin|cup|cap|emptyset|forall|exists|partial|nabla|left|right|begin|end|overline|underline|vec|hat|bar|tilde|dot|ddot|text|textbf|textit|mathrm|mathbf|mathbb|mathcal|quad|qquad)';

/**
 * Safely repairs accidentally double-escaped LaTeX commands from Excel/CSV/JSON copy-paste
 * (e.g. `\\frac{a}{b}` -> `\frac{a}{b}`) while strictly preserving genuine LaTeX row breaks
 * inside matrices/cases (`a & b \\ c & d`).
 */
export function normalizeLatexForKatex(rawMath: string): string {
  const doubleEscapedCmdRegex = new RegExp(`\\\\\\\\(?=${KNOWN_LATEX_COMMANDS}\\b)`, 'g');
  return rawMath.replace(doubleEscapedCmdRegex, '\\').trim();
}

/**
 * Checks whether a text string contains LaTeX math delimiters or common LaTeX commands.
 */
export function containsMathSyntax(text?: string | null): boolean {
  if (!text) return false;
  return (
    /\$\$[\s\S]+?\$\$/.test(text) ||
    /(?<!\\)\$[^$\n]+?(?<!\\)\$/.test(text) ||
    /\\\([\s\S]+?\\\)/.test(text) ||
    /\\\[[\s\S]+?\\\]/.test(text)
  );
}

/**
 * Tokenizes mixed plain text and LaTeX expressions (`$$...$$`, `\[...\]`, `$...$`, `\(...\)`)
 * while preserving escaped dollar signs (`\$`) as literal `$`.
 */
function tokenizeMathText(input: string): MathSegment[] {
  const segments: MathSegment[] = [];
  // Matches (1) block $$...$$, (2) block \[...\], (3) inline \(...\), (4) inline $...$ (ignoring escaped \$)
  const tokenRegex =
    /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|(?<!\\)\$([^$\n]+?)(?<!\\)\$/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      const plainChunk = input.slice(lastIndex, match.index).replace(/\\\$/g, '$');
      segments.push({ type: 'text', value: plainChunk });
    }

    if (match[1] !== undefined) {
      segments.push({ type: 'block-math', value: match[1] });
    } else if (match[2] !== undefined) {
      segments.push({ type: 'block-math', value: match[2] });
    } else if (match[3] !== undefined) {
      segments.push({ type: 'inline-math', value: match[3] });
    } else if (match[4] !== undefined) {
      segments.push({ type: 'inline-math', value: match[4] });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < input.length) {
    const tailChunk = input.slice(lastIndex).replace(/\\\$/g, '$');
    segments.push({ type: 'text', value: tailChunk });
  }

  return segments;
}

function renderKatexHtml(rawMath: string, displayMode: boolean): string {
  const normalized = normalizeLatexForKatex(rawMath);
  try {
    return katex.renderToString(normalized, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: 'htmlAndMathml',
    });
  } catch {
    return normalized;
  }
}

/**
 * Reusable component for rendering regular text mixed seamlessly with inline (`$...$`, `\(...\)`)
 * and block (`$$...$$`, `\[...\]`) KaTeX math expressions.
 * - Safe against HTML injection (plain text is rendered as React text nodes; KaTeX runs with `trust: false`)
 * - Mobile-responsive (`overflow-x-auto` on long formulas so narrow phone screens never clip or break layout)
 */
export const MathTextRenderer: React.FC<MathTextRendererProps> = ({
  content,
  className = '',
  inline = false,
}) => {
  const segments = useMemo(() => {
    if (!content) return [];
    return tokenizeMathText(String(content));
  }, [content]);

  if (!content) return null;

  const Wrapper = inline ? 'span' : 'div';

  return (
    <Wrapper className={`cbt-math-content max-w-full break-words ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          const lines = seg.value.split('\n');
          return (
            <React.Fragment key={idx}>
              {lines.map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  {line}
                  {lineIdx < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        }

        if (seg.type === 'block-math') {
          const html = renderKatexHtml(seg.value, true);
          return (
            <div
              key={idx}
              className="cbt-math-block my-2 py-1 px-1 overflow-x-auto max-w-full text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        const html = renderKatexHtml(seg.value, false);
        return (
          <span
            key={idx}
            className="cbt-math-inline max-w-full overflow-x-auto align-baseline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </Wrapper>
  );
};
