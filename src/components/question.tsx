"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const questions = [
  {
    question: "What services do you offer?",
    answer: "We offer a range of AI consulting services including data analysis, machine learning model development, and AI strategy consulting."
  },
  {
    question: "How can AI benefit my business?",
    answer: "AI can help automate processes, provide insights through data analysis, and improve decision-making with predictive analytics."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in various industries including healthcare, finance, retail, and manufacturing."
  },
  {
    question: "How do I get started with your services?",
    answer: "You can get started by contacting us through our website or by calling our office. We will schedule an initial consultation to understand your needs."
  }
];

export default function FAQ() {
  return (
    <Accordion type="single" collapsible>
      {questions.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}