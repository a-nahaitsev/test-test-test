"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
}

export const useScrollSmoother = () => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, // Smoothness level (0-3)
      effects: true, // Enable data-speed and data-lag effects
      smoothTouch: 0.1, // Smooth scrolling on touch devices (0-1)
      normalizeScroll: true, // Normalize scroll behavior across browsers
    });

    // Cleanup function
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return smootherRef.current;
};
