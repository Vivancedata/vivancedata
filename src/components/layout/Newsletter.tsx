"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ListMark } from "@/components/common/Marks";
import { ctaSecondary } from "@/components/common/controls";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, startSubmit] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const subscribe = async () => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setIsSubscribed(true);
      setEmail("");
      toast.success('Subscribed', {
        description: 'You will hear from me when there is something worth sending.'
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError("That did not go through. Try again in a minute, or write to info@vivancedata.com.");
      toast.error('Subscription failed', {
        description: 'Please try again, or write to info@vivancedata.com.'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !EMAIL_PATTERN.test(email)) {
      setError("Enter a full email address, like you@company.com.");
      // The error sits under the field; put the cursor back where the fix is.
      inputRef.current?.focus();
      return;
    }

    setError("");
    startSubmit(subscribe);
  };

  if (isSubscribed) {
    return (
      <div className="border-t border-rule pt-xl">
        <p className="flex items-center gap-2.5">
          <ListMark label="" />
          <span className="text-label uppercase text-mute">Subscribed</span>
        </p>
        <h3 className="mt-md font-display text-serif-sm text-foreground">
          Thank you for subscribing
        </h3>
        <p className="mt-2 max-w-[46ch] text-body-sm text-muted-foreground">
          You will hear from me when there is something worth sending. Not often.
        </p>
      </div>
    );
  }

  return (
    /* Left-set, like every other block on this sheet. It was a centred column
     * in the middle of a left-aligned footer, which read as a widget dropped in
     * from another site. */
    <div className="grid grid-cols-1 gap-x-xl gap-y-lg border-t border-rule pt-xl md:grid-cols-12">
      <div className="md:col-span-5">
        <h3 className="font-display text-serif-sm text-foreground">
          Subscribe to the newsletter
        </h3>
        <p className="mt-2 max-w-[42ch] text-body-sm text-muted-foreground">
          What I am learning about automating this kind of work, when there is
          something worth sending.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="md:col-span-6 md:col-start-7">
        <div className="flex flex-col gap-md sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            ref={inputRef}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby="newsletter-email-error"
            placeholder="you@company.com…"
            className="min-h-11 rounded-sm border-input bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`${ctaSecondary} shrink-0 disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing\u2026" : "Subscribe"}
          </button>
        </div>
        {/* Always mounted so the live region exists before the message does. */}
        <p
          id="newsletter-email-error"
          className="mt-2 text-body-sm text-destructive empty:hidden"
          aria-live="polite"
        >
          {error}
        </p>
      </form>
    </div>
  );
}
