import { hasConcreteAuthorityEvidence } from "../../../shared/matchers/concrete-evidence.js";
import {
  cleanSentence,
  tokens,
  type SentenceMatch
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = ["however, ", "but ", "and ", "so "];
const EVIDENCE_SUBJECTS = [
  "the evidence",
  "evidence",
  "the strongest evidence",
  "the recent evidence",
  "the broader evidence",
  "the available evidence"
];
const RESEARCH_SUBJECTS = [
  "the research",
  "what the research",
  "the broader research",
  "the recent research",
  "the science",
  "the data",
  "the dataset",
  "the literature",
  "data",
  "research",
  "studies"
];
const RESEARCHER_SUBJECTS = [
  "experts",
  "researchers",
  "scientists",
  "specialists"
];
const EVIDENCE_PREDICATES = [
  "backs",
  "is clear",
  "is strongest",
  "is not subtle",
  "points",
  "shows",
  "suggests"
];
const RESEARCH_PREDICATES = [
  "backs",
  "confirms",
  "does show is",
  "is clear",
  "is not mysterious",
  "points",
  "proves",
  "shows",
  "suggests"
];
const RESEARCHER_PREDICATES = [
  "agree",
  "keep finding",
  "keep saying",
  "keep showing",
  "say"
];
const AUTHORITY_ADVERBS = ["clearly", "consistently", "strongly"];
const ABSTRACT_AUTHORITY_COMPLEMENTS = [
  "alignment",
  "aligned",
  "claim",
  "content",
  "decision",
  "engagement",
  "launch",
  "meeting",
  "meetings",
  "owner",
  "owners",
  "progress",
  "retention",
  "rollback",
  "strategy",
  "teams",
  "trust",
  "visibility"
];
const PRESTIGE_SUFFIXES = [
  "'s work is famous for a reason",
  "\u2019s work is famous for a reason"
];

function hasAbstractAuthorityComplement(text: string): boolean {
  const words = tokens(text);
  return ABSTRACT_AUTHORITY_COMPLEMENTS.some((word) => words.includes(word));
}

function matchesSubjectPredicate(
  text: string,
  subjects: readonly string[],
  predicates: readonly string[]
): boolean {
  return subjects.some((subject) => {
    const subjectText = `${subject} `;
    if (!text.startsWith(subjectText)) {
      return false;
    }

    return predicates.some((predicate) => {
      const predicateText = `${subjectText}${predicate}`;
      if (!text.startsWith(predicateText)) {
        return false;
      }

      return predicate.includes("is ") || hasAbstractAuthorityComplement(text);
    });
  });
}

function matchesAdverbialSubjectPredicate(
  text: string,
  subjects: readonly string[],
  predicates: readonly string[]
): boolean {
  return subjects.some((subject) =>
    AUTHORITY_ADVERBS.some((adverb) =>
      predicates.some(
        (predicate) =>
          text.startsWith(`${subject} ${adverb} ${predicate}`) &&
          (predicate.includes("is ") || hasAbstractAuthorityComplement(text))
      )
    )
  );
}

function matchAuthorityPadding(sentence: string): SentenceMatch | undefined {
  const stripped = cleanSentence(sentence, PREFIXES);

  if (hasConcreteAuthorityEvidence(stripped)) {
    return undefined;
  }

  if (PRESTIGE_SUFFIXES.some((suffix) => stripped.includes(suffix))) {
    return { kind: "prestige-frame", signal: "work is famous for a reason" };
  }

  if (
    matchesSubjectPredicate(stripped, EVIDENCE_SUBJECTS, EVIDENCE_PREDICATES) ||
    matchesAdverbialSubjectPredicate(
      stripped,
      EVIDENCE_SUBJECTS,
      EVIDENCE_PREDICATES
    ) ||
    stripped.startsWith("the strongest recent evidence points")
  ) {
    return { kind: "evidence-frame", signal: "the evidence" };
  }

  if (
    matchesSubjectPredicate(stripped, RESEARCH_SUBJECTS, RESEARCH_PREDICATES) ||
    matchesAdverbialSubjectPredicate(
      stripped,
      RESEARCH_SUBJECTS,
      RESEARCH_PREDICATES
    ) ||
    stripped.startsWith("the broader research backs") ||
    matchesSubjectPredicate(
      stripped,
      RESEARCHER_SUBJECTS,
      RESEARCHER_PREDICATES
    ) ||
    matchesAdverbialSubjectPredicate(
      stripped,
      RESEARCHER_SUBJECTS,
      RESEARCHER_PREDICATES
    )
  ) {
    return { kind: "research-frame", signal: "the research" };
  }

  return undefined;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchAuthorityPadding(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched.signal,
        label: matched.kind,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Authority padding found: ${report.evidence}. Cite the actual evidence or remove the frame.`,
  ruleId: "syntactic-patterns:authority-padding",
  unitKind: "sentence"
});

export default rule;
