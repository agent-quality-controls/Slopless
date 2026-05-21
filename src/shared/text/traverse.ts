import type { TxtParentNode } from "@textlint/ast-node-types";
import { StringSource } from "textlint-util-to-string";

export type SourceText = {
  readonly originalEndFor: (end: number) => number;
  readonly originalStartFor: (start: number) => number;
  readonly text: string;
};

export function sourceText(node: TxtParentNode): SourceText {
  // textlint-util-to-string has not updated its public type for textlint 15.7's
  // readonly children, but it only reads the node at runtime.
  const source = new StringSource(
    node as ConstructorParameters<typeof StringSource>[0] // type-coverage:ignore-line
  );

  return {
    originalEndFor: (end) => source.originalIndexFromIndex(end, true) ?? end,
    originalStartFor: (start) => source.originalIndexFromIndex(start) ?? start,
    text: source.toString()
  };
}
