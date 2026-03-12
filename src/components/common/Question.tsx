import { questions } from "@/constants/faq";

export default function FAQ() {
  return (
    <div className="space-y-4">
      {questions.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm"
        >
          <summary className="cursor-pointer list-none pr-8 text-left font-semibold text-foreground marker:hidden">
            <span className="inline-flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span>{item.question}</span>
            </span>
          </summary>
          <div className="pt-4 text-muted-foreground">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
