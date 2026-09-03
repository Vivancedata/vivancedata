import { CATEGORY_LABELS, questions, type ReadinessCategory } from "@/constants/aiReadiness";

/**
 * The scoring model behind the AI readiness assessment.
 *
 * It used to sit inside a 691-line "use client" module, exercisable only by
 * rendering the quiz and answering twenty questions -- and structurally
 * ineligible for the coverage list, which names only src/lib.
 *
 * classifyReadiness returns a level *name*, not an icon or a colour. Mapping
 * that name to a lucide icon and a Tailwind colour is presentation, and it
 * stays in the component; otherwise React would be dragged in here and the
 * thresholds would still only be testable through a render.
 */

export type CategoryAverages = Record<ReadinessCategory, number>;

export interface AssessmentResults {
  categoryAverages: CategoryAverages;
  totalScore: number;
  percentageScore: number;
}

export type ReadinessLevelName = "Excellent" | "Good" | "Moderate" | "Beginning";

const EMPTY_CATEGORY_SCORES: CategoryAverages = {
  data: 0,
  infrastructure: 0,
  culture: 0,
  strategy: 0,
};

const questionCategories = new Map(questions.map((question) => [question.id, question.category]));

export const scoreAssessment = (answers: Record<string, number>): AssessmentResults => {
  const categoryScores: CategoryAverages = { ...EMPTY_CATEGORY_SCORES };
  const categoryCounts: CategoryAverages = { ...EMPTY_CATEGORY_SCORES };

  Object.entries(answers).forEach(([questionId, score]) => {
    const category = questionCategories.get(questionId);
    if (!category) {
      return;
    }
    categoryScores[category] += score;
    categoryCounts[category] += 1;
  });

  const categoryAverages: CategoryAverages = {
    data: categoryCounts.data > 0 ? categoryScores.data / categoryCounts.data : 0,
    infrastructure: categoryCounts.infrastructure > 0 ? categoryScores.infrastructure / categoryCounts.infrastructure : 0,
    culture: categoryCounts.culture > 0 ? categoryScores.culture / categoryCounts.culture : 0,
    strategy: categoryCounts.strategy > 0 ? categoryScores.strategy / categoryCounts.strategy : 0,
  };
  const totalScore = Object.values(categoryAverages).reduce((sum, score) => sum + score, 0) / 4;
  const percentageScore = (totalScore / 5) * 100;

  return { categoryAverages, totalScore, percentageScore };
};

export const classifyReadiness = (percentage: number): ReadinessLevelName => {
  if (percentage >= 80) {
    return "Excellent";
  }
  if (percentage >= 60) {
    return "Good";
  }
  if (percentage >= 40) {
    return "Moderate";
  }
  return "Beginning";
};

export const recommendationsFor = (categoryAverages: CategoryAverages): string[] => {
  const recommendations: string[] = [];

  if (categoryAverages.data < 3) {
    recommendations.push("Focus on establishing a data governance framework and improving data quality before major AI initiatives.");
  }
  if (categoryAverages.infrastructure < 3) {
    recommendations.push("Invest in cloud infrastructure and modern data platforms to support AI workloads.");
  }
  if (categoryAverages.culture < 3) {
    recommendations.push("Build internal AI capabilities through training and hire data science talent.");
  }
  if (categoryAverages.strategy < 3) {
    recommendations.push("Define clear AI use cases aligned with business objectives and establish success metrics.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Your organization is well-positioned for AI adoption. Consider starting with a pilot project in your strongest area.");
    recommendations.push("Focus on scaling existing capabilities and building an AI center of excellence.");
  }

  return recommendations;
};

export const buildAssessmentSummary = (
  results: AssessmentResults,
  level: ReadinessLevelName
): Record<string, string | number> => ({
  "Overall readiness": `${Math.round(results.percentageScore)}% - ${level}`,
  [CATEGORY_LABELS.data]: `${results.categoryAverages.data.toFixed(1)} / 5.0`,
  [CATEGORY_LABELS.infrastructure]: `${results.categoryAverages.infrastructure.toFixed(1)} / 5.0`,
  [CATEGORY_LABELS.culture]: `${results.categoryAverages.culture.toFixed(1)} / 5.0`,
  [CATEGORY_LABELS.strategy]: `${results.categoryAverages.strategy.toFixed(1)} / 5.0`,
});
