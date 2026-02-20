"use client";

import { useState, useRef, useEffect, type RefObject } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Database,
  Server,
  Users,
  Target,
  AlertCircle,
  TrendingUp,
  Award
} from "lucide-react";

interface Question {
  id: string;
  category: "data" | "infrastructure" | "culture" | "strategy";
  question: string;
  options: {
    value: number;
    label: string;
  }[];
}

const questions: Question[] = [
  // Data Readiness (4 questions)
  {
    id: "data-1",
    category: "data",
    question: "How would you describe the quality and accessibility of your organization's data?",
    options: [
      { value: 1, label: "Data is siloed, inconsistent, or largely inaccessible" },
      { value: 2, label: "Some data available but requires significant cleanup" },
      { value: 3, label: "Most data is accessible with moderate quality" },
      { value: 4, label: "High-quality data, well-organized and easily accessible" },
      { value: 5, label: "Enterprise-grade data infrastructure with excellent governance" },
    ],
  },
  {
    id: "data-2",
    category: "data",
    question: "Does your organization have a data governance framework in place?",
    options: [
      { value: 1, label: "No formal data governance" },
      { value: 2, label: "Limited governance, mostly ad-hoc" },
      { value: 3, label: "Basic governance policies exist" },
      { value: 4, label: "Well-defined governance with clear ownership" },
      { value: 5, label: "Mature governance with automated compliance" },
    ],
  },
  {
    id: "data-3",
    category: "data",
    question: "How much historical data does your organization have available for analysis?",
    options: [
      { value: 1, label: "Less than 6 months" },
      { value: 2, label: "6 months to 1 year" },
      { value: 3, label: "1-2 years" },
      { value: 4, label: "2-5 years" },
      { value: 5, label: "5+ years of comprehensive data" },
    ],
  },
  {
    id: "data-4",
    category: "data",
    question: "Is your data properly labeled and annotated for machine learning purposes?",
    options: [
      { value: 1, label: "No labeling or annotation" },
      { value: 2, label: "Minimal labeling on small datasets" },
      { value: 3, label: "Partial labeling on key datasets" },
      { value: 4, label: "Most critical data is labeled" },
      { value: 5, label: "Comprehensive labeling with quality assurance" },
    ],
  },
  // Technical Infrastructure (4 questions)
  {
    id: "infra-1",
    category: "infrastructure",
    question: "What is your organization's cloud adoption level?",
    options: [
      { value: 1, label: "On-premises only, no cloud infrastructure" },
      { value: 2, label: "Limited cloud usage for basic services" },
      { value: 3, label: "Hybrid cloud with some workloads migrated" },
      { value: 4, label: "Cloud-first strategy with modern infrastructure" },
      { value: 5, label: "Cloud-native with advanced capabilities (containers, serverless)" },
    ],
  },
  {
    id: "infra-2",
    category: "infrastructure",
    question: "Does your organization have experience with machine learning or AI tools?",
    options: [
      { value: 1, label: "No experience with ML/AI tools" },
      { value: 2, label: "Limited experimentation with basic tools" },
      { value: 3, label: "Some ML projects completed or in progress" },
      { value: 4, label: "Regular use of ML platforms and frameworks" },
      { value: 5, label: "Advanced ML operations (MLOps) infrastructure in place" },
    ],
  },
  {
    id: "infra-3",
    category: "infrastructure",
    question: "How integrated are your current systems and data sources?",
    options: [
      { value: 1, label: "Highly siloed systems with minimal integration" },
      { value: 2, label: "Some integration via manual processes" },
      { value: 3, label: "Moderate integration with basic APIs" },
      { value: 4, label: "Well-integrated with modern APIs and data pipelines" },
      { value: 5, label: "Fully integrated enterprise architecture with real-time data flow" },
    ],
  },
  {
    id: "infra-4",
    category: "infrastructure",
    question: "What level of computing resources can your organization allocate for AI projects?",
    options: [
      { value: 1, label: "Limited resources, budget constraints" },
      { value: 2, label: "Small budget for proof-of-concept projects" },
      { value: 3, label: "Moderate resources for pilot projects" },
      { value: 4, label: "Dedicated budget for AI initiatives" },
      { value: 5, label: "Significant investment capacity for enterprise AI" },
    ],
  },
  // Organizational Culture (4 questions)
  {
    id: "culture-1",
    category: "culture",
    question: "How supportive is your leadership team of AI and digital transformation initiatives?",
    options: [
      { value: 1, label: "Skeptical or resistant to AI adoption" },
      { value: 2, label: "Aware but not actively supportive" },
      { value: 3, label: "Moderately supportive with some advocacy" },
      { value: 4, label: "Actively championing AI initiatives" },
      { value: 5, label: "AI is a core strategic priority with executive sponsorship" },
    ],
  },
  {
    id: "culture-2",
    category: "culture",
    question: "How comfortable are employees with data-driven decision making?",
    options: [
      { value: 1, label: "Primarily intuition-based decision making" },
      { value: 2, label: "Some data used but not consistently" },
      { value: 3, label: "Data-informed decisions in key areas" },
      { value: 4, label: "Strong data-driven culture in most departments" },
      { value: 5, label: "Pervasive data-driven culture with advanced analytics" },
    ],
  },
  {
    id: "culture-3",
    category: "culture",
    question: "Does your organization have in-house data science or AI expertise?",
    options: [
      { value: 1, label: "No data science capabilities" },
      { value: 2, label: "1-2 individuals with basic data skills" },
      { value: 3, label: "Small team with ML experience" },
      { value: 4, label: "Dedicated data science team" },
      { value: 5, label: "Large, mature AI/ML center of excellence" },
    ],
  },
  {
    id: "culture-4",
    category: "culture",
    question: "How open is your organization to change and innovation?",
    options: [
      { value: 1, label: "Highly resistant to change" },
      { value: 2, label: "Cautious with incremental improvements" },
      { value: 3, label: "Moderately innovative in some areas" },
      { value: 4, label: "Innovation-friendly culture with experimentation" },
      { value: 5, label: "Highly innovative with fail-fast mentality" },
    ],
  },
  // Strategic Alignment (4 questions)
  {
    id: "strategy-1",
    category: "strategy",
    question: "Has your organization identified specific AI use cases aligned with business goals?",
    options: [
      { value: 1, label: "No clear use cases identified" },
      { value: 2, label: "Vague ideas without business alignment" },
      { value: 3, label: "A few use cases identified" },
      { value: 4, label: "Multiple prioritized use cases with ROI estimates" },
      { value: 5, label: "Comprehensive AI roadmap with clear business value" },
    ],
  },
  {
    id: "strategy-2",
    category: "strategy",
    question: "Do you have defined metrics to measure AI project success?",
    options: [
      { value: 1, label: "No success metrics defined" },
      { value: 2, label: "Vague success criteria" },
      { value: 3, label: "Basic KPIs identified" },
      { value: 4, label: "Clear, measurable success metrics" },
      { value: 5, label: "Comprehensive measurement framework with continuous monitoring" },
    ],
  },
  {
    id: "strategy-3",
    category: "strategy",
    question: "What is your organization's AI maturity level?",
    options: [
      { value: 1, label: "Awareness - just learning about AI" },
      { value: 2, label: "Exploration - investigating possibilities" },
      { value: 3, label: "Experimentation - running pilot projects" },
      { value: 4, label: "Implementation - deploying AI solutions" },
      { value: 5, label: "Optimization - scaling AI across the enterprise" },
    ],
  },
  {
    id: "strategy-4",
    category: "strategy",
    question: "How well does your organization understand AI ethics and responsible AI practices?",
    options: [
      { value: 1, label: "Not considered" },
      { value: 2, label: "Aware but no formal approach" },
      { value: 3, label: "Basic guidelines in place" },
      { value: 4, label: "Formal ethics framework" },
      { value: 5, label: "Comprehensive responsible AI program with governance" },
    ],
  },
];

const categoryInfo = {
  data: { icon: Database, color: "blue", label: "Data Readiness" },
  infrastructure: { icon: Server, color: "green", label: "Technical Infrastructure" },
  culture: { icon: Users, color: "purple", label: "Organizational Culture" },
  strategy: { icon: Target, color: "orange", label: "Strategic Alignment" },
};

type Category = Question["category"];
type CategoryAverages = Record<Category, number>;

interface QuizAssessmentResults {
  categoryAverages: CategoryAverages;
  totalScore: number;
  percentageScore: number;
}

interface ReadinessLevel {
  level: string;
  color: "green" | "blue" | "yellow" | "orange";
  icon: typeof Award;
}

const EMPTY_CATEGORY_SCORES: CategoryAverages = {
  data: 0,
  infrastructure: 0,
  culture: 0,
  strategy: 0,
};

const questionCategories = new Map(questions.map((question) => [question.id, question.category]));

const calculateResults = (answers: Record<string, number>): QuizAssessmentResults => {
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

const getReadinessLevel = (percentage: number): ReadinessLevel => {
  if (percentage >= 80) {
    return { level: "Excellent", color: "green", icon: Award };
  }
  if (percentage >= 60) {
    return { level: "Good", color: "blue", icon: TrendingUp };
  }
  if (percentage >= 40) {
    return { level: "Moderate", color: "yellow", icon: CheckCircle2 };
  }
  return { level: "Beginning", color: "orange", icon: AlertCircle };
};

const getRecommendations = (categoryAverages: CategoryAverages): string[] => {
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

interface ReadinessSummaryProps {
  results: QuizAssessmentResults;
  readinessLevel: ReadinessLevel;
}

function ReadinessSummary({ results, readinessLevel }: ReadinessSummaryProps) {
  const ReadinessIcon = readinessLevel.icon;

  return (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4" aria-hidden="true">
          <div className={`rounded-full p-4 bg-${readinessLevel.color}-100 dark:bg-${readinessLevel.color}-900/20`}>
            <ReadinessIcon className={`h-12 w-12 text-${readinessLevel.color}-600`} />
          </div>
        </div>
        <CardTitle as="h2" className="text-3xl">Your AI Readiness Score</CardTitle>
        <CardDescription className="text-xl mt-2">
          <span aria-label={`Score: ${Math.round(results.percentageScore)} percent, Level: ${readinessLevel.level}`}>
            {Math.round(results.percentageScore)}% - {readinessLevel.level}
          </span>
        </CardDescription>
      </CardHeader>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium" id="overall-readiness-label">Overall Readiness</span>
          <span className="text-sm font-medium">{Math.round(results.percentageScore)}%</span>
        </div>
        <Progress
          value={results.percentageScore}
          className="h-3"
          aria-labelledby="overall-readiness-label"
          aria-valuenow={Math.round(results.percentageScore)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </>
  );
}

interface CategoryBreakdownProps {
  categoryAverages: CategoryAverages;
}

function CategoryBreakdown({ categoryAverages }: CategoryBreakdownProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-8" role="list" aria-label="Category breakdown">
      {(Object.entries(categoryAverages) as [Category, number][]).map(([category, score]) => {
        const info = categoryInfo[category];
        const CategoryIcon = info.icon;
        const percentage = (score / 5) * 100;
        const labelId = `category-${category}-label`;

        return (
          <Card key={category} role="listitem">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`rounded-full p-2 bg-${info.color}-100 dark:bg-${info.color}-900/20`} aria-hidden="true">
                  <CategoryIcon className={`h-4 w-4 text-${info.color}-600`} />
                </div>
                <span className="font-semibold" id={labelId}>{info.label}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">{score.toFixed(1)} / 5.0</span>
                <span className="text-sm">{Math.round(percentage)}%</span>
              </div>
              <Progress
                value={percentage}
                className="h-2"
                aria-labelledby={labelId}
                aria-valuenow={Math.round(percentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface RecommendationsProps {
  recommendations: string[];
}

function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Personalized Recommendations</h3>
      <ul className="space-y-3" role="list" aria-label="Personalized recommendations">
        {recommendations.map((recommendation) => (
          <li key={recommendation} className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm">{recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface QuizResultsPanelProps {
  results: QuizAssessmentResults;
  readinessLevel: ReadinessLevel;
  recommendations: string[];
  resultsRef: RefObject<HTMLDivElement | null>;
  onRetake: () => void;
}

function QuizResultsPanel({
  results,
  readinessLevel,
  recommendations,
  resultsRef,
  onRetake,
}: QuizResultsPanelProps) {
  return (
    <m.div
      ref={resultsRef}
      tabIndex={-1}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 outline-none"
      role="region"
      aria-label="Assessment results"
      aria-live="polite"
    >
      <Card>
        <ReadinessSummary results={results} readinessLevel={readinessLevel} />
        <CardContent>
          <div className="space-y-6">
            <CategoryBreakdown categoryAverages={results.categoryAverages} />
            <Recommendations recommendations={recommendations} />

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
              <h3 className="text-xl font-bold mb-3">Ready to Take the Next Step?</h3>
              <p className="mb-4">
                Our AI consultants can help you create a customized roadmap based on your assessment results.
              </p>
              <div className="flex gap-4">
                <Button asChild variant="secondary">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={onRetake}
                >
                  Retake Assessment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
}

interface QuizQuestionStepProps {
  currentQuestion: number;
  answers: Record<string, number>;
  questionRef: RefObject<HTMLDivElement | null>;
  onAnswer: (questionId: string, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

function QuizQuestionStep({
  currentQuestion,
  answers,
  questionRef,
  onAnswer,
  onNext,
  onPrevious,
}: QuizQuestionStepProps) {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const CategoryIcon = categoryInfo[currentQ.category].icon;
  const hasAnswer = answers[currentQ.id] !== undefined;

  return (
    <div className="space-y-6" role="region" aria-label="AI Readiness Assessment Quiz">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium" id="quiz-progress-label">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium" aria-hidden="true">{Math.round(progress)}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2"
          aria-labelledby="quiz-progress-label"
          aria-valuenow={currentQuestion + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
        />
        <p className="sr-only">
          Quiz progress: {Math.round(progress)} percent complete
        </p>
      </div>

      <AnimatePresence mode="wait">
        <m.div
          ref={questionRef}
          tabIndex={-1}
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="outline-none"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`rounded-full p-2 bg-${categoryInfo[currentQ.category].color}-100 dark:bg-${categoryInfo[currentQ.category].color}-900/20`} aria-hidden="true">
                  <CategoryIcon className={`h-5 w-5 text-${categoryInfo[currentQ.category].color}-600`} />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {categoryInfo[currentQ.category].label}
                </span>
              </div>
              <CardTitle as="h2" className="text-xl" id={`question-${currentQ.id}`}>{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <fieldset>
                <legend className="sr-only">{currentQ.question}</legend>
                <RadioGroup
                  value={answers[currentQ.id]?.toString()}
                  onValueChange={(value) => onAnswer(currentQ.id, parseInt(value, 10))}
                  aria-labelledby={`question-${currentQ.id}`}
                >
                  <div className="space-y-3" role="radiogroup">
                    {currentQ.options.map((option) => (
                      <div key={option.value} className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={option.value.toString()}
                          id={`${currentQ.id}-${option.value}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`${currentQ.id}-${option.value}`}
                          className="flex-1 cursor-pointer text-sm leading-relaxed hover:text-primary transition-colors"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </fieldset>
            </CardContent>
          </Card>
        </m.div>
      </AnimatePresence>

      <nav className="flex justify-between" aria-label="Quiz navigation">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          aria-label="Go to previous question"
        >
          <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasAnswer}
          className="bg-primary hover:bg-primary/90"
          aria-label={currentQuestion === questions.length - 1 ? "View your results" : "Go to next question"}
        >
          {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
          <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
}

export function AIReadinessQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [showResults]);

  useEffect(() => {
    if (!showResults && questionRef.current) {
      questionRef.current.focus();
    }
  }, [currentQuestion, showResults]);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((previousAnswers) => ({ ...previousAnswers, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);
      return;
    }
    setShowResults(true);
  };

  const handleRetake = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  if (showResults) {
    const results = calculateResults(answers);
    return (
      <QuizResultsPanel
        results={results}
        readinessLevel={getReadinessLevel(results.percentageScore)}
        recommendations={getRecommendations(results.categoryAverages)}
        resultsRef={resultsRef}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <QuizQuestionStep
      currentQuestion={currentQuestion}
      answers={answers}
      questionRef={questionRef}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={() => setCurrentQuestion((previousQuestion) => Math.max(0, previousQuestion - 1))}
    />
  );
}
