export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface AboutSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "secondary";
  content: string;
}
