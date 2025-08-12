import * as React from "react";

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="date"
        ref={ref}
        className={
          "px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700 focus:outline-none " +
          (className || "")
        }
        {...props}
      />
    );
  }
);
DateInput.displayName = "DateInput";
