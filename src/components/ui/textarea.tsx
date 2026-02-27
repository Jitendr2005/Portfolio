import * as React from "react";
import { cn } from "@/lib/utils";
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm",
          "placeholder:text-gray-400",
          "focus:border-black focus:outline-none focus:ring-1 focus:ring-black",
          "dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-500",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };