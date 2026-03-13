import Link from "next/link";

export function DemoBookingPlaceholder() {
  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24"
      aria-labelledby="demo-booking-heading"
      style={{ contentVisibility: "auto", containIntrinsicSize: "720px" }}
    >
      <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-lg md:p-12">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Book a Demo
          </p>
          <h2
            id="demo-booking-heading"
            className="text-3xl font-bold text-foreground md:text-4xl"
          >
            See how a tailored AI workflow could fit your business.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Share your use case and we will walk you through the right next step with a live
            consultation.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elevation-1 transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
