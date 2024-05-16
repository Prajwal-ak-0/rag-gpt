import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex items-center justify-center mx-auto  h-20 my-2 md:px-8 px-6 w-full text-white  rounded-full focus:outline-none  py-2 text-lg bg-gradient-to-br from-[#1e2023] to-[#23272b]  file:bg-transparent file:text-md file:font-medium placeholder:text-muted-foreground placeholder:pl-6 placeholder:font-medium placeholder:text-lg disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute md:right-5  right-3 top-0 h-full flex items-center pr-2">
          {children}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
