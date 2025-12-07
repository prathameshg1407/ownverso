import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
} as const;

type SpinnerSize = keyof typeof sizeClasses;

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: SpinnerSize;
};

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", sizeClasses[size], className)}
      {...props}
    />
  );
}

type SpinnerContainerProps = {
  fullScreen?: boolean;
  spinnerSize?: SpinnerSize;
  label?: string;
  className?: string;
};

function SpinnerContainer({
  fullScreen,
  spinnerSize = "md",
  label,
  className,
}: SpinnerContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <Spinner size={spinnerSize} />
      {label && (
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {label}
        </span>
      )}
    </div>
  );
}

export { Spinner, SpinnerContainer };