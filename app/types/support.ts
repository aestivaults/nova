export interface SupportFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SupportSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "secondary";
  faqs: SupportFAQ[];
}
