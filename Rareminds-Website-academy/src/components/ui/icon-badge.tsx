import * as React from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  color?: "blue" | "green" | "red";
}

export function IconBadge({ 
  icon, 
  color = "blue",
  className,
  ...props 
}: IconBadgeProps) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500", 
    red: "bg-red-500/10 text-red-500"
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg",
        colorClasses[color],
        className ?? ""
      )}
      {...props}
    >
      {icon}
    </div>
  )
}
