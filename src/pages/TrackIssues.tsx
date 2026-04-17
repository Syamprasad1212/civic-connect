import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, type IssueStatus } from "@/lib/mockData";
import { Search, MapPin, Calendar, User, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const statusLabels: Record<IssueStatus, string> = {
  new: "New",
  assigned: "Assigned",
  "in-progress": "In Progress",
  resolved: "Resolved",
};

interface IssueRow {
  id: string;
  title: string;
  description: string;
  category: string;
  status: IssueStatus;
  location: string;
  image_url: string | null;
  reporter_name: string | null;
  created_at: string;
}

const TrackIssues = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [issues, setIssues] = useState<IssueRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("issues")
        .select("id, title, description, category, status, location, image_url, reporter_name, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load issues");
        console.error(error);
      } else {
        setIssues((data ?? []) as IssueRow[]);
      }
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("issues-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "issues" }, () => load())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl mb-2">
            Track Your Issues
          </h1>
          <p className="text-muted-foreground">
            Monitor the status of reported issues in real-time.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, title, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing {filteredIssues.length} of {issues.length} issues
        </p>

        <div className="space-y-4">
          {loading ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              </CardContent>
            </Card>
          ) : filteredIssues.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No issues found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues.map((issue, i) => (
              <Card
                key={issue.id}
                className="shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {categories.find((c) => c.value === issue.category)?.icon ?? "📋"}
                      </span>
                      <div>
                        <CardTitle className="text-lg">{issue.title}</CardTitle>
                        <p className="text-sm text-muted-foreground font-mono">
                          {issue.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={issue.status}>{statusLabels[issue.status]}</StatusBadge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{issue.description}</p>
                  {issue.image_url && (
                    <img
                      src={issue.image_url}
                      alt={issue.title}
                      className="w-full max-h-48 object-cover rounded-md mb-4 border border-border"
                    />
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {issue.location}
                    </span>
                    {issue.reporter_name && (
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {issue.reporter_name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(issue.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackIssues;
