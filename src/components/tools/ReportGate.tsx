"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Lock } from "lucide-react";

export type ReportGateTool = "roi-calculator" | "ai-readiness";

export interface ReportGateProps {
  tool: ReportGateTool;
  title: string;
  description: string;
  summary: Record<string, string | number>;
  recommendations?: string[];
  children: ReactNode;
}

type GateStatus = "idle" | "submitting" | "unlocked" | "error";

const GENERIC_ERROR =
  "We could not send your report. Please check the address and try again, or email info@vivancedata.com.";

export function ReportGate({
  tool,
  title,
  description,
  summary,
  recommendations,
  children,
}: ReportGateProps) {
  const emailFieldId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<GateStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/tool-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tool, summary, recommendations }),
      });

      const data: { error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || GENERIC_ERROR);
      }

      setStatus("unlocked");
    } catch (error) {
      console.error("Tool report request failed:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : GENERIC_ERROR);
    }
  };

  if (status === "unlocked") {
    return (
      <div className="space-y-4">
        <div
          className="flex items-start gap-3 rounded-lg border border-success/40 bg-success/10 p-4"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" aria-hidden="true" />
          <p className="text-sm">
            Your full report is unlocked below, and a copy is on its way to{" "}
            <span className="font-medium">{email}</span>.
          </p>
        </div>
        {children}
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <Card className="border-brand/30 dark:border-brand/40">
      <CardHeader>
        <CardTitle as="h3" className="flex items-center gap-2 text-xl">
          <Lock className="h-5 w-5 text-brand" aria-hidden="true" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3" aria-label={title}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor={emailFieldId} className="sr-only">
                Work email address
              </label>
              <Input
                id={emailFieldId}
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
                aria-describedby={`${emailFieldId}-status`}
              />
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              ) : (
                "Show my full report"
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your results appear here straight away and we email you a copy to keep. No newsletter,
            and we never share your address.
          </p>
          <p
            id={`${emailFieldId}-status`}
            role="status"
            aria-live="polite"
            className="text-sm text-destructive empty:hidden"
          >
            {status === "error" ? errorMessage : ""}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
