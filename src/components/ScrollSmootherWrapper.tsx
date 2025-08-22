"use client";

import type { ReactNode } from "react";
import { useScrollSmoother } from "@/hooks/use-scroll-smoother";

interface ScrollSmootherWrapperProps {
  children: ReactNode;
}

export default function ScrollSmootherWrapper({
  children,
}: ScrollSmootherWrapperProps) {
  useScrollSmoother();

  return (
    <div id="smooth-wrapper" className="overflow-hidden min-h-screen">
      <div id="smooth-content" className="flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
