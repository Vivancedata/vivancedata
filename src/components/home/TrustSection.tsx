import { CheckCircle, Shield } from "lucide-react";
import {
  certifications,
  securityFeatures,
  trustSectionContent,
  type TrustCertification,
} from "@/constants/trust";

interface CertificationCardProps {
  certification: TrustCertification;
}

const certificationCardClass =
  "h-full rounded-[calc(var(--radius)+0.25rem)] border border-border/70 bg-card/80 p-6 text-center shadow-elevation-1 backdrop-blur-sm transition-transform transition-shadow duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-2 dark:bg-card/50 dark:hover:shadow-primary/5";

function CertificationCard({ certification }: CertificationCardProps) {
  const Icon = certification.icon;

  return (
    <li className={certificationCardClass}>
      <article className="flex h-full flex-col items-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
          <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{certification.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{certification.description}</p>
      </article>
    </li>
  );
}

export function TrustSection() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-16 md:py-24"
      aria-labelledby="trust-section-title"
      style={{ contentVisibility: "auto", containIntrinsicSize: "960px" }}
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute top-0 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
        <div className="absolute right-1/4 bottom-0 -z-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />

        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
            {trustSectionContent.badge}
          </div>
          <h2 id="trust-section-title" className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {trustSectionContent.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {trustSectionContent.description}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {certifications.map((certification) => (
            <CertificationCard key={certification.id} certification={certification} />
          ))}
        </ul>

        <div className="mt-12 rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm dark:bg-card/50 md:mt-16 md:p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <Shield className="h-6 w-6 text-green-700 dark:text-green-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {trustSectionContent.secureByDesign.title}
                </h3>
                <p className="text-muted-foreground">
                  {trustSectionContent.secureByDesign.description}
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center gap-4" aria-label="Security practices">
              {securityFeatures.map((feature) => (
                <li
                  key={feature.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
