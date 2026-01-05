import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm animate-fade-in">
            <Shield className="h-4 w-4" />
            Trusted by 50+ municipalities
          </div>

          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl animate-slide-up">
            Report Public Issues.{" "}
            <span className="opacity-80">Get Results.</span>
          </h1>

          <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            A smart civic complaint management system that bridges the gap between citizens and authorities. Report issues, track progress, and see real change in your community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/report">
              <Button size="xl" variant="hero" className="group">
                Report an Issue
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/track">
              <Button size="xl" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
                Track Your Complaints
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {[
            { icon: Clock, stat: "24 hrs", label: "Average Response Time" },
            { icon: MapPin, stat: "10,000+", label: "Issues Resolved" },
            { icon: Shield, stat: "98%", label: "Satisfaction Rate" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl bg-primary-foreground/10 p-6 backdrop-blur-sm"
            >
              <item.icon className="mb-2 h-6 w-6 text-primary-foreground/80" />
              <span className="font-heading text-3xl font-bold text-primary-foreground">
                {item.stat}
              </span>
              <span className="text-sm text-primary-foreground/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
