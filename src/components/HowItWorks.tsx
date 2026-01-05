import { FileEdit, Send, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    title: "Submit Report",
    description: "Fill out the issue form with details, category, location, and photos.",
  },
  {
    icon: Send,
    title: "Auto-Assignment",
    description: "Your complaint is automatically routed to the relevant department.",
  },
  {
    icon: Search,
    title: "Track Progress",
    description: "Monitor your complaint status in real-time with regular updates.",
  },
  {
    icon: CheckCircle,
    title: "Resolution",
    description: "Receive notification when your issue is resolved with proof of action.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple four-step process to get your civic issues resolved.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Step Number */}
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero shadow-lg">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground shadow-md lg:left-1/2 lg:-translate-x-1/2 lg:top-0 lg:right-auto">
                  {i + 1}
                </div>

                <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
