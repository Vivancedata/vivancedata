import React from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  initials?: string;
}

interface AboutTeamProps {
  title: string;
  description: string;
  members: TeamMember[];
}

export function AboutTeam({ title, description, members }: AboutTeamProps): React.ReactElement {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-4 font-display text-serif-lg">{title}</h2>
          <p className="max-w-[62ch] text-body-lg text-muted-foreground">
            {description}
          </p>
        </div>
        
        {/* Left-set at one member too. `max-w-lg mx-auto` put the single card in
          the middle of a page whose every other band starts at the gutter. */}
        <div className={`grid gap-8 ${members.length === 1 ? "grid-cols-1 max-w-lg" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
          {members.map((member) => (
            <div key={member.id} className="bg-card rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                {member.imageSrc ? (
                  <Image
                    src={member.imageSrc}
                    alt={`${member.name}, ${member.role} at Vivancedata`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="field-dots flex h-full w-full items-center justify-center border-b border-rule">
                    <div className="flex h-24 w-24 items-center justify-center border border-rule bg-background">
                      <span className="font-display text-serif-md text-foreground">
                        {member.initials ?? member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-heading-3 mb-2">{member.name}</h3>
                <p className="mb-4 text-body-sm text-muted-foreground">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
