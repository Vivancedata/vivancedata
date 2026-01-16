"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  serviceInterest: z.string({
    required_error: "Please select a service you're interested in.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  // Focus on success message heading when form is submitted successfully
  useEffect(() => {
    if (isSubmitted && successHeadingRef.current) {
      successHeadingRef.current.focus()
    }
  }, [isSubmitted])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      serviceInterest: "",
      message: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.'
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form', {
        description: 'Please try again or contact us directly at info@vivancedata.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-lg" role="status" aria-live="polite">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="rounded-full bg-green-100 p-3 mb-4" aria-hidden="true">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-2xl font-bold mb-2 outline-none"
            >
              Thank You!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Your message has been received. One of our AI consultants will contact you shortly to discuss how we can help your business.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle as="h2" className="text-primary">Contact Us</CardTitle>
        <CardDescription>Fill out the form below to get started</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            aria-label="Contact form"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="serviceInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service you're interested in" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="generative-ai">Generative AI Solutions</SelectItem>
                      <SelectItem value="consulting">AI Strategy Consulting</SelectItem>
                      <SelectItem value="solutions">Pre-built AI Solutions</SelectItem>
                      <SelectItem value="training">AI Training & Workshops</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your project or questions you have..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Submitting...</span>
                  <span className="sr-only">Please wait while your form is being submitted</span>
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800 rounded-b-lg text-sm text-gray-500 dark:text-gray-400 text-center">
        <p className="w-full">We respect your privacy and will never share your information.</p>
      </CardFooter>
    </Card>
  )
}
