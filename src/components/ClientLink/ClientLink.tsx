"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type ClientLink = JSX.IntrinsicElements["div"] & {
  href: string;
  enableRefresh?: boolean;
};

const ClientLink: React.FC<ClientLink> = ({ children, onClick, href, enableRefresh = false, className, ...props }) => {
  const router = useRouter();
  const onClickLink = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(event);
    router.push(href);
    enableRefresh && router.refresh();
  };

  return (
    <div {...props} onClick={onClickLink} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );
};

export default ClientLink;
