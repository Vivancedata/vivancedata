"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import { ArrowMark, ListMark } from "@/components/common/Marks";
import { ctaPrimary, ctaSecondary, wallLabel } from "@/components/common/controls";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DemoFeature {
  title: string;
  description: string;
}

/**
 * The icons went with the tiles that held them. `Play`, `Sparkles`,
 * `MessageCircle` and `Users` had no relationship to the sentences beside them —
 * a sparkle standing for "an honest read on fit" is decoration pretending to be
 * meaning, and a 40px rounded tile around each one made four identical shapes
 * out of four different promises.
 */
const demoFeatures: DemoFeature[] = [
  {
    title: "I build something first",
    description:
      "Before the call I run one of your own documents, or a sample of your own call log, through the workflow — so you are looking at your business rather than at a slide.",
  },
  {
    title: "An honest read on fit",
    description:
      "Including when the answer is that the workflow is not worth automating yet. That is a cheaper thing to hear now than after a build.",
  },
  {
    title: "Straight to the builder",
    description:
      "No account manager in between. You are talking to the person who would do the work.",
  },
  {
    title: "A scope and a number",
    description:
      "If it is a fit you get a fixed price and a defined deliverable in writing before anything starts.",
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
    <div>
      <h2 id="booking-heading" className="font-display text-serif-lg text-foreground">
        See it run on your own paperwork
      </h2>

      <p className="mt-lg max-w-[52ch] text-body-lg text-muted-foreground">
        Book a call with the person who would build it, and find out how this
        would handle the job intake, documents or after-hours calls your
        operation runs on today.
      </p>

      <dl className="mt-2xl border-t border-rule">
        {demoFeatures.map((feature) => (
          <div key={feature.title} className="border-b border-rule py-lg">
            <dt className="text-body-sm font-medium text-foreground">{feature.title}</dt>
            <dd className="mt-1.5 max-w-[56ch] text-body-sm text-muted-foreground">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface DemoFormProps {
  state: DemoBookingState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

function DemoFormCard({ state, onChange, onSubmit }: DemoFormProps) {
  return (
    <div className="border border-rule bg-card">
      <div className="p-lg md:p-xl">
          {!state.isSubmitted ? (
            <>
              <div className="mb-xl">
                <h3 className="font-display text-serif-sm text-foreground">Book a call</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">
                  Tell me where to reach you and you will hear back within one working day.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="demo-name"
                    className="mb-2 block text-label uppercase text-mute"
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
                      "min-h-11 rounded-sm border-input bg-background",
                      state.errors.name && "border-destructive focus-visible:ring-destructive"
                    )}
                    aria-describedby={state.errors.name ? "name-error" : undefined}
                    aria-invalid={state.errors.name ? "true" : "false"}
                  />
                  {state.errors.name && (
                    <p id="name-error" className="mt-1.5 text-body-sm text-destructive">
                      {state.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="demo-email"
                    className="mb-2 block text-label uppercase text-mute"
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
                      "min-h-11 rounded-sm border-input bg-background",
                      state.errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                    aria-describedby={state.errors.email ? "email-error" : undefined}
                    aria-invalid={state.errors.email ? "true" : "false"}
                  />
                  {state.errors.email && (
                    <p id="email-error" className="mt-1.5 text-body-sm text-destructive">
                      {state.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="demo-company"
                    className="mb-2 block text-label uppercase text-mute"
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
                      "min-h-11 rounded-sm border-input bg-background",
                      state.errors.company && "border-destructive focus-visible:ring-destructive"
                    )}
                    aria-describedby={state.errors.company ? "company-error" : undefined}
                    aria-invalid={state.errors.company ? "true" : "false"}
                  />
                  {state.errors.company && (
                    <p id="company-error" className="mt-1.5 text-body-sm text-destructive">
                      {state.errors.company}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${ctaPrimary} mt-lg w-full disabled:cursor-not-allowed disabled:opacity-50`}
                  disabled={state.isSubmitting}
                  aria-disabled={state.isSubmitting}
                >
                  {state.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="-ml-1 mr-3 h-4 w-4 animate-spin"
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
                    <span className="flex items-center justify-center gap-2.5">
                      Book a call
                      <ArrowMark />
                    </span>
                  )}
                </button>

                {state.submitError && (
                  <p
                    className="mt-md text-body-sm text-destructive"
                    role="alert"
                    aria-live="polite"
                  >
                    {state.submitError}
                  </p>
                )}
              </form>

              <div className="mt-xl border-t border-rule pt-lg">
                <p className="text-body-sm text-muted-foreground">
                  Prefer to write it out?{" "}
                  <Link
                    href="/contact"
                    className="text-foreground underline decoration-rule underline-offset-4 transition-colors hover:decoration-current"
                  >
                    Use the contact form
                  </Link>
                  .
                </p>
              </div>
            </>
          ) : (
            /* The confirmation is written as a record, in the same grammar as
             * the night log at the top of the page: a mark, a value, and what
             * happens next. */
            <div className="py-lg">
              <p className="flex items-center gap-2.5">
                <ListMark label="" />
                <span className={wallLabel}>Received</span>
              </p>
              <h3 className="mt-md font-display text-serif-sm text-foreground">
                Call request received
              </h3>
              <p className="mt-md max-w-[46ch] text-body-sm text-muted-foreground">
                Thanks, {state.formData.name}. I will get back to you at{" "}
                <span className="font-mono text-data text-foreground">{state.formData.email}</span>{" "}
                within one working day to arrange a time.
              </p>
              <Link href="/services" className={`${ctaSecondary} mt-xl`}>
                <span>See what I build</span>
                <ArrowMark />
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}

/*
 * `DemoTrustIndicators` was here: three centred lines reading "No cost, no
 * obligation", "30-minute personalized session" and "Free consultation
 * included". The first and the third are the same sentence, and all three
 * restate the four promises directly above them in smaller type. A band with
 * one ask does not need a second row of reassurance under it.
 */

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
            "Call request submitted from the homepage booking form. Please follow up to arrange a time.",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit demo request.");
      }

      dispatch({ type: "submit_success" });
      toast.success("Call request received", {
        description: "You will hear back within one working day.",
      });
    } catch (error) {
      console.error("Demo booking submission error:", error);
      dispatch({
        type: "submit_failure",
        message:
          "I could not take your request just now. Please try again, or use the contact page.",
      });
      toast.error("Could not submit your request", {
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <section className="bleed border-t border-rule" aria-labelledby="booking-heading">
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        <div className="grid grid-cols-1 gap-2xl lg:grid-cols-12 lg:gap-xl">
          <div className="lg:col-span-6 lg:pr-2xl">
            <DemoFeatureColumn />
          </div>
          <div className="lg:col-span-6">
            <DemoFormCard state={state} onChange={handleInputChange} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoBooking;
