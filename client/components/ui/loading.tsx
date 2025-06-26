import { ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function Loading({
  className,
  text = "Loading...",
  size = "md",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        className,
      )}
    >
      <ChefHat
        className={cn("text-primary animate-pulse", sizeClasses[size])}
      />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}

export function LoadingPage({ text }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading size="lg" text={text} />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-48 bg-muted rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}
