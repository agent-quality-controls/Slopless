import { type Token } from "../../../../shared/text/tokens.js";

const INLINE_CONTRAST_CONNECTORS = new Set([
  "also",
  "but",
  "instead",
  "rather"
]);

export function hasInlineContrastConnectorAfterNegation(
  tokens: readonly Token[],
  negationIndex: number
): boolean {
  if (
    tokens[negationIndex + 1]?.normalized === "help" &&
    tokens[negationIndex + 2]?.normalized === "but"
  ) {
    return false;
  }

  return tokens
    .slice(negationIndex + 1)
    .some((token) => INLINE_CONTRAST_CONNECTORS.has(token.normalized));
}
