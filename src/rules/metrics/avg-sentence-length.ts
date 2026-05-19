import type { AnyTxtNode, TxtDocumentNode } from "@textlint/ast-node-types";
import { documentMetrics } from "../../shared/text/document.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const MAX_WORDS = 24;

function isDocumentNode(node: AnyTxtNode): node is TxtDocumentNode {
  return node.type === "Document" && "children" in node;
}

const rule = oneToOneRule({
  detect: (unit) => {
    if (!isDocumentNode(unit.node)) {
      return [];
    }

    const metrics = documentMetrics(unit.node);
    if (metrics.sentenceCount === 0) {
      return [];
    }

    const average = Math.floor(metrics.wordCount / metrics.sentenceCount);
    if (average <= MAX_WORDS) {
      return [];
    }

    return [
      {
        evidence: String(average),
        label: "average sentence length",
        range: { start: 0, end: 0 }
      }
    ];
  },
  family: "metrics",
  formatMessage: (report) =>
    `Average sentence length is ${report.evidence} words. Keep it at ${MAX_WORDS} or fewer.`,
  ruleId: "metrics:avg-sentence-length",
  unitKind: "document"
});

export default rule;
