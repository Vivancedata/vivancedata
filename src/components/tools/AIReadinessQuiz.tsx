"use client";

import { useState, useRef, useEffect, type RefObject } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ReportGate } from "@/components/tools/ReportGate";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CATEGORY_LABELS, questions, type ReadinessCategory } from "@/constants/aiReadiness";
import {
  buildAssessmentSummary,
  classifyReadiness,
  recommendationsFor,
  scoreAssessment,
  type AssessmentResults,
  type CategoryAverages,
  type ReadinessLevelName,
} from "@/lib/aiReadinessScoring";
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

// Presentation for what the model returns. The scoring module deals in level
// names and category keys; the icons and Tailwind colours live here so that
// src/lib stays free of React and the thresholds stay testable without one.
const LEVEL_PRESENTATION: Record<ReadinessLevelName, { color: string; icon: typeof Award }> = {
  Excellent: { color: "green", icon: Award },
  Good: { color: "blue", icon: TrendingUp },
  Moderate: { color: "yellow", icon: CheckCircle2 },
  Beginning: { color: "orange", icon: AlertCircle },
};

const categoryInfo: Record<ReadinessCategory, { icon: typeof Database; color: string; label: string }> = {
  data: { icon: Database, color: "blue", label: CATEGORY_LABELS.data },
  infrastructure: { icon: Server, color: "green", label: CATEGORY_LABELS.infrastructure },
  culture: { icon: Users, color: "purple", label: CATEGORY_LABELS.culture },
  strategy: { icon: Target, color: "orange", label: CATEGORY_LABELS.strategy },
};



interface ReadinessSummaryProps {
  results: AssessmentResults;
  readinessLevel: ReadinessLevelName;
}

function ReadinessSummary({ results, readinessLevel }: ReadinessSummaryProps) {
  const { color, icon: ReadinessIcon } = LEVEL_PRESENTATION[readinessLevel];

  return (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4" aria-hidden="true">
          <div className={`rounded-full p-4 bg-${color}-100 dark:bg-${color}-900/20`}>
            <ReadinessIcon className={`h-12 w-12 text-${color}-600`} />
          </div>
        </div>
        <CardTitle as="h2" className="text-3xl">Your AI Readiness Score</CardTitle>
        <CardDescription className="text-xl mt-2">
          <span aria-label={`Score: ${Math.round(results.percentageScore)} percent, Level: ${readinessLevel}`}>
            {Math.round(results.percentageScore)}% - {readinessLevel}
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
      {(Object.entries(categoryAverages) as [ReadinessCategory, number][]).map(([category, score]) => {
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
      <h3 className="text-heading-3 mb-4">Personalized Recommendations</h3>
      <ul className="space-y-3" role="list" aria-label="Personalized recommendations">
        {recommendations.map((recommendation) => (
          <li key={recommendation} className="flex gap-3 p-4 bg-muted rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm">{recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface QuizResultsPanelProps {
  results: AssessmentResults;
  readinessLevel: ReadinessLevelName;
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
            <ReportGate
              tool="ai-readiness"
              title="See what to fix first"
              description="Your score is above. Enter your email to reveal the recommendations for your weakest areas and get the full assessment sent to you."
              summary={buildAssessmentSummary(results, readinessLevel)}
              recommendations={recommendations}
            >
              <Recommendations recommendations={recommendations} />
            </ReportGate>

            <div className="mt-8 p-6 bg-primary text-primary-foreground rounded-xl">
              <h3 className="text-heading-3 mb-3">Ready to Take the Next Step?</h3>
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
                <span className="text-sm font-medium text-muted-foreground">
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
                          className="flex-1 cursor-pointer text-sm leading-relaxed hover:text-brand transition-colors"
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
    const results = scoreAssessment(answers);
    return (
      <QuizResultsPanel
        results={results}
        readinessLevel={classifyReadiness(results.percentageScore)}
        recommendations={recommendationsFor(results.categoryAverages)}
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
