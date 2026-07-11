"use client";

import { Lenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Lenis
      root
      options={{
        duration: 2.2,
        easing: (t) => 1 - Math.pow(1 - t, 5),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </Lenis>
  );
}
