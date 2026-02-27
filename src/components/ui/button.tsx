import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-white font-medium shadow transition hover:bg-gray-800 focus:outline-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button };
