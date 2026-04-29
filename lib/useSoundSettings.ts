"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tumbuh-sunnah-sound";

export function useSoundSettings() {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setEnabled(JSON.parse(saved));
      }
    } catch {
      // silent
    }
  }, []);

  // Save to localStorage
  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // silent
      }
      return next;
    });
  }, []);

  return { enabled: mounted ? enabled : true, toggle, mounted };
}