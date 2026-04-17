import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, CheckCircle, Clock, TrendingUp, Activity, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { categories, type IssueStatus } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface IssueRow {
  id: string;
  title: string;
  category: string;
  status: IssueStatus;
  location: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [issues, setIssues] = useState<IssueRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("issues")
        .select("id, title, category, status, location, created_at, updated_at")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Failed to load dashboard");
        console.error(error);
      } else {
        setIssues((data ?? []) as IssueRow[]);
      }
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("dashboard-issues")
      .on("postgres_changes", { event: "*", schema: "public", table: "issues" }, () => load())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = useMemo(() => {
    const total = issues.length;
    const resolved = issues.filter((i) => i.status === "resolved").length;
    const pending = issues.filter((i) => i.status !== "resolved").length;

    const resolutionDays = issues
      .filter((i) => i.status === "resolved")
      .map(
        (i) =>
          (new Date(i.updated_at).getTime() - new Date(i.created_at).getTime()) /
          (1000 * 60 * 60 * 24)
      );
    const avgDays =
      resolutionDays.length > 0
        ? (resolutionDays.reduce((a, b) => a + b, 0) / resolutionDays.length).toFixed(1)
        : "0";

    const breakdown = categories.map((c) => ({
      category: c.label.split(" ")[0],
      count: issues.filter((i) => i.category === c.value).length,
      color: c.color,
    }));

    return { total, resolved, pending, avgDays, breakdown };
  }, [issues]);

  const statCards = [
    { title: "Total Issues", value: stats.total, icon: FileText, color: "text-primary", bgColor: "bg-primary/10" },
    { title: "Resolved", value: stats.resolved, icon: CheckCircle, color: "text-success", bgColor: "bg-success/10" },
    { title: "Pending Issues", value: stats.pending, icon: Clock, color: "text-warning", bgColor: "bg-warning/10" },
    { title: "Avg. Resolution (Days)", value: stats.avgDays, icon: TrendingUp, color: "text-accent", bgColor: "bg-accent/10" },
  ];

  const recentIssues = issues.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage civic issues across all departments.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {statCards.map((stat, i) => (
                <Card
                  key={i}
                  className="shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="font-heading text-3xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-8">
              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle>Issues by Category</CardTitle>
                  <CardDescription>Distribution of reported issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.breakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Percentage breakdown of issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.breakdown.filter((b) => b.count > 0)}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="count"
                        >
                          {stats.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {stats.breakdown.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest updates on issues</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentIssues.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No activity yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {recentIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <div className="min-w-0 mr-4">
                            <p className="font-medium text-foreground truncate">
                              New issue: {issue.title}
                            </p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {issue.id.slice(0, 8).toUpperCase()}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <CardHeader>
                  <CardTitle>Latest Reported Issues</CardTitle>
                  <CardDescription>Most recent complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentIssues.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No issues reported yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {recentIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <p className="font-medium text-foreground truncate">{issue.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{issue.location}</p>
                          </div>
                          <StatusBadge status={issue.status}>
                            {issue.status.replace("-", " ")}
                          </StatusBadge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
