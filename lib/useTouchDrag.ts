"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface DragItem {
  id: string;
  element: HTMLElement;
  startPos: Position;
  currentPos: Position;
}

interface UseTouchDragOptions {
  onDrop: (dragId: string, dropZoneId: string | null) => void;
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
}

export function useTouchDrag(options: UseTouchDragOptions) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<Position | null>(null);
  const dragItem = useRef<DragItem | null>(null);
  const dropZones = useRef<Map<string, DOMRect>>(new Map());
  const scrollLocked = useRef(false);

  // ── Lock scroll saat drag ──
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (scrollLocked.current) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  // ── Register drop zone ──
  const registerDropZone = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        dropZones.current.set(id, element.getBoundingClientRect());
      } else {
        dropZones.current.delete(id);
      }
    },
    []
  );

  // ── Update semua posisi drop zone ──
  const updateDropZones = useCallback(() => {
    dropZones.current.forEach((_, id) => {
      const el = document.querySelector(
        `[data-dropzone="${id}"]`
      ) as HTMLElement;
      if (el) {
        dropZones.current.set(id, el.getBoundingClientRect());
      }
    });
  }, []);

  // ── Cari drop zone di bawah jari ──
  const findDropZone = useCallback(
    (x: number, y: number): string | null => {
      for (const [id, rect] of dropZones.current) {
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          return id;
        }
      }
      return null;
    },
    []
  );

  // ── Touch Start ──
  const handleTouchStart = useCallback(
    (id: string, e: React.TouchEvent) => {
      const touch = e.touches[0];
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      scrollLocked.current = true;

      dragItem.current = {
        id,
        element,
        startPos: { x: rect.left, y: rect.top },
        currentPos: { x: touch.clientX, y: touch.clientY },
      };

      setDragId(id);
      setDragPos({ x: touch.clientX, y: touch.clientY });
      updateDropZones();
      options.onDragStart?.(id);
    },
    [options, updateDropZones]
  );

  // ── Touch Move ──
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragItem.current) return;

      const touch = e.touches[0];
      dragItem.current.currentPos = {
        x: touch.clientX,
        y: touch.clientY,
      };
      setDragPos({ x: touch.clientX, y: touch.clientY });
    },
    []
  );

  // ── Touch End ──
  const handleTouchEnd = useCallback(() => {
    if (!dragItem.current) return;

    scrollLocked.current = false;

    const { id, currentPos } = dragItem.current;
    const dropZoneId = findDropZone(currentPos.x, currentPos.y);

    options.onDrop(id, dropZoneId);

    dragItem.current = null;
    setDragId(null);
    setDragPos(null);
    options.onDragEnd?.();
  }, [findDropZone, options]);

  return {
    dragId,
    dragPos,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    registerDropZone,
  };
}