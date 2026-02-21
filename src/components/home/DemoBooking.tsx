"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DemoFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const demoFeatures: DemoFeature[] = [
  {
    icon: <Play className="h-5 w-5" />,
    title: "See AI in Action",
    description:
      "Watch our AI solutions solve real business challenges in real-time demonstrations.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Get Custom Recommendations",
    description:
      "Receive personalized insights tailored to your industry and specific use cases.",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "Q&A with Our Experts",
    description:
      "Ask questions and get answers from our experienced AI consultants.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Meet Your Team",
    description:
      "Connect with the specialists who will guide your AI transformation journey.",
  },
];

interface FormData {
  name: string;
  email: string;
  company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

interface DemoBookingState {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

type DemoBookingAction =
  | { type: "update_field"; field: keyof FormData; value: string }
  | { type: "set_errors"; errors: FormErrors }
  | { type: "submit_start" }
  | { type: "submit_success" }
  | { type: "submit_failure"; message: string };

const initialState: DemoBookingState = {
  formData: {
    name: "",
    email: "",
    company: "",
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  submitError: null,
};

function reducer(state: DemoBookingState, action: DemoBookingAction): DemoBookingState {
  switch (action.type) {
    case "update_field": {
      const nextErrors = { ...state.errors };
      if (nextErrors[action.field]) {
        nextErrors[action.field] = undefined;
      }
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: nextErrors,
      };
    }
    case "set_errors":
      return {
        ...state,
        errors: action.errors,
      };
    case "submit_start":
      return {
        ...state,
        isSubmitting: true,
        submitError: null,
      };
    case "submit_success":
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
      };
    case "submit_failure":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.message,
      };
    default:
      return state;
  }
}

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.company.trim()) {
    errors.company = "Company name is required";
  }

  return errors;
}

function DemoFeatureColumn() {
  return (
    <AnimateOnScroll variant="fadeInLeft">
      <div>
        <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          Book a Demo
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
          Experience the Future of{" "}
          <span className="text-primary">AI-Powered Business</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          Schedule a personalized demo with our AI experts and discover how our solutions
          can transform your operations, increase efficiency, and drive measurable results.
        </p>

        <StaggerContainer className="space-y-4" staggerDelay={0.1} direction="up">
          {demoFeatures.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </AnimateOnScroll>
  );
}

interface DemoFormProps {
  state: DemoBookingState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

function DemoFormCard({ state, onChange, onSubmit }: DemoFormProps) {
  return (
    <AnimateOnScroll variant="fadeInRight" delay={0.2}>
      <Card className="border-0 shadow-xl bg-card dark:bg-card/95 backdrop-blur-sm">
        <CardContent className="p-8">
          {!state.isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Request Your Demo</h3>
                <p className="text-muted-foreground">
                  Fill out the form below and we will contact you within 24 hours.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="demo-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name
                  </label>
                  <Input
                    id="demo-name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    autoComplete="name"
                    value={state.formData.name}
                    onChange={onChange}
                    className={cn(
                      "bg-background",
                      state.errors.name && "border-destructive focus-visible:ring-destructive"
                    )}
                    aria-describedby={state.errors.name ? "name-error" : undefined}
                    aria-invalid={state.errors.name ? "true" : "false"}
                  />
                  {state.errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-destructive">
                      {state.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="demo-email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Work Email
                  </label>
                  <Input
                    id="demo-email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    value={state.formData.email}
                    onChange={onChange}
                    className={cn(
                      "bg-background",
                      state.errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                    aria-describedby={state.errors.email ? "email-error" : undefined}
                    aria-invalid={state.errors.email ? "true" : "false"}
                  />
                  {state.errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-destructive">
                      {state.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="demo-company"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Company Name
                  </label>
                  <Input
                    id="demo-company"
                    name="company"
                    type="text"
                    placeholder="Acme Inc."
                    autoComplete="organization"
                    value={state.formData.company}
                    onChange={onChange}
                    className={cn(
                      "bg-background",
                      state.errors.company && "border-destructive focus-visible:ring-destructive"
                    )}
                    aria-describedby={state.errors.company ? "company-error" : undefined}
                    aria-invalid={state.errors.company ? "true" : "false"}
                  />
                  {state.errors.company && (
                    <p id="company-error" className="mt-1 text-sm text-destructive">
                      {state.errors.company}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  disabled={state.isSubmitting}
                  aria-disabled={state.isSubmitting}
                >
                  {state.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {"Submitting\u2026"}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Book My Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>

                {state.submitError && (
                  <p
                    className="text-sm text-destructive text-center"
                    role="alert"
                    aria-live="polite"
                  >
                    {state.submitError}
                  </p>
                )}
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Prefer to talk directly?{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors"
                  >
                    Contact us
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Demo Request Received</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Thank you, {state.formData.name}! Our team will reach out to you at{" "}
                <span className="font-medium text-foreground">{state.formData.email}</span>{" "}
                within 24 hours to schedule your personalized demo.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Learn More About Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimateOnScroll>
  );
}

function DemoTrustIndicators() {
  return (
    <AnimateOnScroll variant="fadeInUp" delay={0.4}>
      <div className="mt-16 pt-8 border-t border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>30-minute personalized session</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Free consultation included</span>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export function DemoBooking(): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch({
      type: "update_field",
      field: name as keyof FormData,
      value,
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const nextErrors = validateForm(state.formData);
    dispatch({ type: "set_errors", errors: nextErrors });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    dispatch({ type: "submit_start" });

    try {
      const fullNameParts = state.formData.name.trim().split(/\s+/);
      const firstName = fullNameParts[0] || "Guest";
      const lastName = fullNameParts.slice(1).join(" ") || "N/A";

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: state.formData.email.trim(),
          company: state.formData.company.trim(),
          serviceInterest: "consulting",
          message:
            "Demo request submitted from homepage. Please follow up to schedule a 30-minute demo.",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit demo request.");
      }

      dispatch({ type: "submit_success" });
      toast.success("Demo request received", {
        description: "Our team will reach out within 24 hours.",
      });
    } catch (error) {
      console.error("Demo booking submission error:", error);
      dispatch({
        type: "submit_failure",
        message:
          "We could not submit your request right now. Please try again or use the contact page.",
      });
      toast.error("Could not submit demo request", {
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <DemoFeatureColumn />
          <DemoFormCard state={state} onChange={handleInputChange} onSubmit={handleSubmit} />
        </div>
        <DemoTrustIndicators />
      </div>
    </section>
  );
}

export default DemoBooking;
