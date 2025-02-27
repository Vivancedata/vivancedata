import React from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
}

interface AboutTeamProps {
  title: string;
  description: string;
  members: TeamMember[];
}

export function AboutTeam({ title, description, members }: AboutTeamProps): React.ReactElement {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
