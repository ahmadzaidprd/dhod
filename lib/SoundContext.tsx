"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSoundSettings } from "./useSoundSettings";
import * as S from "./sounds";

interface SoundAPI {
  enabled: boolean;
  toggle: () => void;
  play: {
    click: () => void;
    correct: () => void;
    wrong: () => void;
    levelComplete: () => void;
    allComplete: () => void;
    dragStart: () => void;
    dropSuccess: () => void;
    dropFail: () => void;
    stroke: () => void;
  };
}

const Ctx = createContext<SoundAPI | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const { enabled, toggle } = useSoundSettings();

  const w = (fn: () => void) => () => { if (enabled) fn(); };

  const play = {
    click:         w(S.playClick),
    correct:       w(S.playCorrect),
    wrong:         w(S.playWrong),
    levelComplete: w(S.playLevelComplete),
    allComplete:   w(S.playAllComplete),
    dragStart:     w(S.playDragStart),
    dropSuccess:   w(S.playDropSuccess),
    dropFail:      w(S.playDropFail),
    stroke:        w(S.playStroke),
  };

  return <Ctx.Provider value={{ enabled, toggle, play }}>{children}</Ctx.Provider>;
}

export function useSound(): SoundAPI {
  const ctx = useContext(Ctx);
  if (!ctx) {
    const noop = () => {};
    return {
      enabled: false,
      toggle: noop,
      play: {
        click: noop, correct: noop, wrong: noop,
        levelComplete: noop, allComplete: noop,
        dragStart: noop, dropSuccess: noop, dropFail: noop, stroke: noop,
      },
    };
  }
  return ctx;
}