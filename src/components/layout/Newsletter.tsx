"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsSubmitting(true);

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
      toast.success('Successfully subscribed!', {
        description: 'You\'ll receive our latest AI insights and updates.'
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError("Failed to subscribe. Please try again later.");
      toast.error('Subscription failed', {
        description: 'Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="border-t border-gray-200 pt-8 mb-8">
        <div className="max-w-md mx-auto text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Thank you for subscribing!</h3>
              <p className="text-gray-600 text-sm">
                You&apos;ll receive our latest AI insights and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-8 mb-8">
      <div className="max-w-md mx-auto text-center">
        <h3 className="font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
        <p className="text-gray-600 mb-4">
          Stay updated with the latest in AI and receive our insights directly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
