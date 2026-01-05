import { Camera, MapPin, Bell, BarChart3, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Photo Evidence",
    description: "Attach images to your complaints for clear documentation and faster resolution.",
  },
  {
    icon: MapPin,
    title: "Location Tagging",
    description: "Automatic GPS detection or manual location selection for precise issue reporting.",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Receive notifications when your complaint status changes or gets resolved.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Authorities get powerful insights with area-wise monitoring and performance tracking.",
  },
  {
    icon: Users,
    title: "Role-based Access",
    description: "Secure login for citizens, department staff, and administrators with appropriate permissions.",
  },
  {
    icon: Zap,
    title: "Fast Resolution",
    description: "Streamlined workflow ensures issues are assigned and resolved quickly.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl mb-4">
            Everything You Need for{" "}
            <span className="text-gradient">Smart Governance</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform provides comprehensive tools for efficient civic issue management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
