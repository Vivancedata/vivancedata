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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className={`grid gap-8 ${members.length === 1 ? "grid-cols-1 max-w-lg mx-auto" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
          {members.map((member) => (
            <div key={member.id} className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                {member.imageSrc ? (
                  <Image
                    src={member.imageSrc}
                    alt={`${member.name}, ${member.role} at VivanceData`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center ring-4 ring-primary/20">
                      <span className="text-3xl font-bold text-primary">
                        {member.initials ?? member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
