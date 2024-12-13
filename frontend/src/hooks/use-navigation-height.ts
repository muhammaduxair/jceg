"use client";

import { useState, useEffect } from "react";

export function useNavigationHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const navElement = document.getElementById("main-navigation");
      if (navElement) {
        setHeight(navElement.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return height;
}
