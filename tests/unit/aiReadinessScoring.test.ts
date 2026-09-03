import { describe, expect, it } from "vitest";
import { questions, CATEGORY_LABELS } from "../../src/constants/aiReadiness";
import {
  buildAssessmentSummary,
  classifyReadiness,
  recommendationsFor,
  scoreAssessment,
} from "../../src/lib/aiReadinessScoring";

const answerAll = (score: number) =>
  Object.fromEntries(questions.map((question) => [question.id, score]));

const answerCategory = (category: string, score: number, rest: number) =>
  Object.fromEntries(
    questions.map((question) => [question.id, question.category === category ? score : rest])
  );

describe("scoreAssessment", () => {
  it("scores a full-marks assessment at 100%", () => {
    expect(scoreAssessment(answerAll(5))).toEqual({
      categoryAverages: { data: 5, infrastructure: 5, culture: 5, strategy: 5 },
      totalScore: 5,
      percentageScore: 100,
    });
  });

  it("scores a lowest-marks assessment at 20%, not 0%", () => {
    // 1 is the floor of the option scale, not an absence of one, so the floor
    // of the percentage is 20.
    expect(scoreAssessment(answerAll(1)).percentageScore).toBe(20);
  });

  it("averages each category independently", () => {
    const averages = scoreAssessment(answerCategory("data", 5, 1)).categoryAverages;

    expect(averages.data).toBe(5);
    expect(averages.infrastructure).toBe(1);
    expect(averages.culture).toBe(1);
    expect(averages.strategy).toBe(1);
  });

  it("returns zeroes rather than NaN when nothing is answered", () => {
    // Every category average divides by its own count, so an unanswered
    // category must not produce 0/0.
    const result = scoreAssessment({});

    expect(result.categoryAverages).toEqual({ data: 0, infrastructure: 0, culture: 0, strategy: 0 });
    expect(result.percentageScore).toBe(0);
    expect(Number.isNaN(result.totalScore)).toBe(false);
  });

  it("ignores answers to questions that do not exist", () => {
    expect(scoreAssessment({ ...answerAll(5), "not-a-question": 1 })).toEqual(
      scoreAssessment(answerAll(5))
    );
  });
});

describe("classifyReadiness", () => {
  it.each([
    [100, "Excellent"],
    [80, "Excellent"],
    [79.9, "Good"],
    [60, "Good"],
    [59.9, "Moderate"],
    [40, "Moderate"],
    [39.9, "Beginning"],
    [0, "Beginning"],
  ])("classifies %s%% as %s", (percentage, expected) => {
    expect(classifyReadiness(percentage as number)).toBe(expected);
  });
});

describe("recommendationsFor", () => {
  it("names each weak category once", () => {
    const recommendations = recommendationsFor({
      data: 1,
      infrastructure: 1,
      culture: 1,
      strategy: 1,
    });

    expect(recommendations).toHaveLength(4);
    expect(recommendations[0]).toContain("data governance");
    expect(recommendations[1]).toContain("infrastructure");
    expect(recommendations[2]).toContain("training");
    expect(recommendations[3]).toContain("use cases");
  });

  it("treats 3 as the threshold, not a weakness", () => {
    expect(recommendationsFor({ data: 3, infrastructure: 3, culture: 3, strategy: 3 })).toEqual(
      recommendationsFor({ data: 5, infrastructure: 5, culture: 5, strategy: 5 })
    );
  });

  it("never returns nothing to do", () => {
    const recommendations = recommendationsFor({
      data: 5,
      infrastructure: 5,
      culture: 5,
      strategy: 5,
    });

    expect(recommendations).toHaveLength(2);
    expect(recommendations[0]).toContain("well-positioned");
  });

  it("calls out only the categories that are weak", () => {
    const recommendations = recommendationsFor({
      data: 1,
      infrastructure: 5,
      culture: 5,
      strategy: 5,
    });

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0]).toContain("data governance");
  });
});

describe("buildAssessmentSummary", () => {
  it("labels every category and rounds the headline", () => {
    const results = scoreAssessment(answerAll(5));

    expect(buildAssessmentSummary(results, classifyReadiness(results.percentageScore))).toEqual({
      "Overall readiness": "100% - Excellent",
      [CATEGORY_LABELS.data]: "5.0 / 5.0",
      [CATEGORY_LABELS.infrastructure]: "5.0 / 5.0",
      [CATEGORY_LABELS.culture]: "5.0 / 5.0",
      [CATEGORY_LABELS.strategy]: "5.0 / 5.0",
    });
  });
});

describe("the question set", () => {
  it("covers all four categories evenly", () => {
    // The percentage is a straight mean of four category means, so an uneven
    // split would silently weight one category more than another.
    const perCategory = questions.reduce<Record<string, number>>(
      (counts, question) => ({ ...counts, [question.category]: (counts[question.category] ?? 0) + 1 }),
      {}
    );

    expect(questions).toHaveLength(16);
    expect(perCategory).toEqual({ data: 4, infrastructure: 4, culture: 4, strategy: 4 });
  });

  it("gives every question a unique id and a full option scale", () => {
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    for (const question of questions) {
      expect(question.options.map((option) => option.value)).toEqual([1, 2, 3, 4, 5]);
    }
  });
});
