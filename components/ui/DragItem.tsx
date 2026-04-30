"use client";

import { ReactNode } from "react";

interface DragItemProps {
  id: string;
  dragId: string | null;
  dragPos: { x: number; y: number } | null;
  onTouchStart: (id: string, e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  children: ReactNode;
  className?: string;
}

export default function DragItem({
  id,
  dragId,
  dragPos,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  children,
  className = "",
}: DragItemProps) {
  const isDragging = dragId === id;

  return (
    <>
      {/* Item asli */}
      <div
        onTouchStart={(e) => onTouchStart(id, e)}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`touch-none select-none ${className} ${
          isDragging ? "opacity-30 scale-90" : ""
        }`}
        style={{ touchAction: "none" }}
      >
        {children}
      </div>

      {/* Ghost yang mengikuti jari */}
      {isDragging && dragPos && (
        <div
          className={`fixed pointer-events-none z-50 ${className}`}
          style={{
            left: dragPos.x - 32,
            top: dragPos.y - 32,
            width: 64,
            height: 64,
            transform: "scale(1.15)",
            opacity: 0.9,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}