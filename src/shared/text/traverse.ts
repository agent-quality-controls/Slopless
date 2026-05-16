import type { TxtParentNode } from "@textlint/ast-node-types";
import { StringSource } from "textlint-util-to-string";

export type SourceText = {
  readonly originalEndFor: (end: number) => number;
  readonly originalStartFor: (start: number) => number;
  readonly text: string;
};

export function sourceText(node: TxtParentNode): SourceText {
  const source = new StringSource(node);

  return {
    originalEndFor: (end) => source.originalIndexFromIndex(end, true) ?? end,
    originalStartFor: (start) => source.originalIndexFromIndex(start) ?? start,
    text: source.toString()
  };
}
