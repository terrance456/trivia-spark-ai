import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { ReactNode } from "react";

const bannerVariants = cva("rounded dark:bg-slate-300 bg-slate-200 p-3 text-sm dark:text-slate-800 text-slate-600", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-slate-600 dark:text-slate-400 dark:bg-slate-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BannerProps extends VariantProps<typeof bannerVariants> {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ variant, className, children }: BannerProps) => {
  return (
    <p role="alert" className={cn(bannerVariants({ variant, className }))}>
      {children}
    </p>
  );
};

export default Banner;
