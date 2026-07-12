"use client";

import { Lenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

function ScrollRestorer() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Lenis
      root
      options={{
        duration: 2.5,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.7,
        touchMultiplier: 1.5,
      }}
    >
      <ScrollRestorer />
      {children}
    </Lenis>
  );
}
