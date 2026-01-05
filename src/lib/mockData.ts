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

export const categories: { value: IssueCategory; label: string; icon: string }[] = [
  { value: "roads", label: "Roads & Potholes", icon: "🛣️" },
  { value: "water", label: "Water Supply", icon: "💧" },
  { value: "electricity", label: "Electricity", icon: "⚡" },
  { value: "sanitation", label: "Sanitation", icon: "🗑️" },
  { value: "streetlights", label: "Street Lights", icon: "💡" },
  { value: "other", label: "Other", icon: "📋" },
];

export const mockIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "Large pothole on Main Street",
    description: "There is a dangerous pothole near the intersection of Main Street and Oak Avenue. It's causing damage to vehicles and poses a safety risk.",
    category: "roads",
    status: "in-progress",
    location: "Main Street & Oak Avenue",
    reportedBy: "John Citizen",
    reportedAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "ISS-002",
    title: "Water leakage from main pipe",
    description: "Major water leakage observed near the community center. Water is being wasted continuously for the past 2 days.",
    category: "water",
    status: "assigned",
    location: "Community Center, Sector 7",
    reportedBy: "Mary Johnson",
    reportedAt: "2024-01-14T08:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "ISS-003",
    title: "Street light not working",
    description: "The street light at the corner of Pine Street has been out for a week. The area is very dark at night.",
    category: "streetlights",
    status: "resolved",
    location: "Pine Street Corner",
    reportedBy: "Robert Smith",
    reportedAt: "2024-01-10T18:00:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
  },
  {
    id: "ISS-004",
    title: "Garbage overflow at public bin",
    description: "The garbage bin near the bus stop is overflowing. Waste is scattered on the road and causing hygiene issues.",
    category: "sanitation",
    status: "new",
    location: "Central Bus Stop",
    reportedBy: "Sarah Williams",
    reportedAt: "2024-01-16T07:00:00Z",
    updatedAt: "2024-01-16T07:00:00Z",
  },
  {
    id: "ISS-005",
    title: "Power outage in residential area",
    description: "Frequent power cuts in Sector 12 residential area. Sometimes lasting for 3-4 hours during peak evening time.",
    category: "electricity",
    status: "in-progress",
    location: "Sector 12, Block A-C",
    reportedBy: "Michael Brown",
    reportedAt: "2024-01-12T20:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export const dashboardStats = {
  totalIssues: 156,
  resolvedThisMonth: 89,
  pendingIssues: 42,
  avgResolutionDays: 3.2,
  categoryBreakdown: [
    { category: "Roads", count: 45, color: "hsl(215, 50%, 23%)" },
    { category: "Water", count: 32, color: "hsl(200, 80%, 50%)" },
    { category: "Electricity", count: 28, color: "hsl(45, 90%, 50%)" },
    { category: "Sanitation", count: 25, color: "hsl(142, 71%, 45%)" },
    { category: "Street Lights", count: 18, color: "hsl(280, 60%, 50%)" },
    { category: "Other", count: 8, color: "hsl(0, 0%, 50%)" },
  ],
  recentActivity: [
    { action: "Issue resolved", issue: "ISS-003", time: "2 hours ago" },
    { action: "Status updated", issue: "ISS-001", time: "4 hours ago" },
    { action: "New issue reported", issue: "ISS-004", time: "6 hours ago" },
    { action: "Assigned to team", issue: "ISS-002", time: "1 day ago" },
  ],
};
