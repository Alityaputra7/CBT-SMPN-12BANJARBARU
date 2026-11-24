import React from 'react';
import { MathTextRenderer, MathTextRendererProps } from './MathTextRenderer';

/**
 * Backward-compatible alias for MathTextRenderer.
 */
export const KatexRenderer: React.FC<MathTextRendererProps> = props => (
  <MathTextRenderer {...props} />
);

export { MathTextRenderer, containsMathSyntax, normalizeLatexForKatex } from './MathTextRenderer';
