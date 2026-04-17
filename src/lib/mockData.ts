export type IssueStatus = "new" | "assigned" | "in-progress" | "resolved";
export type IssueCategory = "roads" | "water" | "electricity" | "sanitation" | "streetlights" | "other";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: string;
  reportedBy: string;
  reportedAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export const categories: { value: IssueCategory; label: string; icon: string; color: string }[] = [
  { value: "roads", label: "Roads & Potholes", icon: "🛣️", color: "hsl(215, 50%, 23%)" },
  { value: "water", label: "Water Supply", icon: "💧", color: "hsl(200, 80%, 50%)" },
  { value: "electricity", label: "Electricity", icon: "⚡", color: "hsl(45, 90%, 50%)" },
  { value: "sanitation", label: "Sanitation", icon: "🗑️", color: "hsl(142, 71%, 45%)" },
  { value: "streetlights", label: "Street Lights", icon: "💡", color: "hsl(280, 60%, 50%)" },
  { value: "other", label: "Other", icon: "📋", color: "hsl(0, 0%, 50%)" },
];
