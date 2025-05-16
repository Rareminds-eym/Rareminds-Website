import * as React from "react";
import { cn } from "@/lib/utils";

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "py-24 sm:py-12",
      className
    )}
    {...props}
  />
));
Section.displayName = "Section";

export { Section };
