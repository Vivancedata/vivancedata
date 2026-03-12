import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";
import { teamMembers } from "@/constants/team";

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
} as const;

const teamCardClass =
  "overflow-hidden rounded-[calc(var(--radius)+0.25rem)] border border-border/70 bg-card shadow-elevation-1 transition-transform transition-shadow duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1 hover:shadow-elevation-2";

const Team = () => {
  return (
    <section
      className="w-full bg-muted/50 py-16 md:py-24 dark:bg-muted/20"
      style={{ contentVisibility: "auto", containIntrinsicSize: "840px" }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
            Our Experts
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Meet Our Team</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our team of AI experts brings together decades of experience across research, industry, and academia to deliver cutting-edge solutions.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <li
              key={member.name}
              className={teamCardClass}
            >
              <article>
                <div className="h-24 bg-primary" aria-hidden="true" />
                <div className="relative p-6 pt-16 text-center">
                  <div className="absolute top-0 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-background bg-primary shadow-lg">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-semibold text-primary-foreground">
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="mb-4 font-medium text-primary dark:text-emerald-300">{member.role}</p>
                  <p className="mb-6 text-sm text-muted-foreground md:text-base">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {Object.entries(member.socialLinks).map(([network, href]) => {
                      if (!href) {
                        return null;
                      }

                      const Icon = socialIconMap[network as keyof typeof socialIconMap];
                      const hoverColor = network === "github" ? "hover:text-foreground" : "hover:text-primary";

                      return (
                        <a
                          key={`${member.name}-${network}`}
                          href={href}
                          className={`text-muted-foreground transition-colors ${hoverColor}`}
                          aria-label={`${member.name}'s ${network.charAt(0).toUpperCase()}${network.slice(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;
