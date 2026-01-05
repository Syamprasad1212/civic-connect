import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        new: "bg-destructive/10 text-destructive",
        "in-progress": "bg-warning/10 text-warning",
        resolved: "bg-success/10 text-success",
        assigned: "bg-accent/10 text-accent",
      },
    },
    defaultVariants: {
      status: "new",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
  children: React.ReactNode;
}

const StatusBadge = ({ status, className, children }: StatusBadgeProps) => {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-soft" />
      {children}
    </span>
  );
};

export default StatusBadge;
