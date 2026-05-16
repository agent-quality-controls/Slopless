import type { TxtDocumentNode } from "@textlint/ast-node-types";
import { allParagraphs } from "./sections.js";
import { splitSentences } from "./sentences.js";
import { wordTokens } from "./tokens.js";

export type DocumentMetrics = {
  readonly sentenceCount: number;
  readonly text: string;
  readonly wordCount: number;
};

export function documentText(document: TxtDocumentNode): string {
  return allParagraphs(document)
    .map((paragraph) => paragraph.text.trim())
    .filter((text) => text.length > 0)
    .join("\n\n");
}

export function documentMetrics(document: TxtDocumentNode): DocumentMetrics {
  const text = documentText(document);

  return {
    sentenceCount: splitSentences(text).length,
    text,
    wordCount: wordTokens(text).length
  };
}
