import { useEffect, useRef } from "react";
import { convertHistoryToPgn } from "../core/pgn";
import type { Move } from "../core/types";

interface PgnProps {
  history: Move[];
}
export function Pgn({ history }: PgnProps) {
  const pgn = convertHistoryToPgn(history);
  const lastItemRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });
  return (
    <div className="pgn-display">
      {pgn.map((item, index) => (
        <h1 ref={index == pgn.length - 1 ? lastItemRef : null}>
          {index % 2 == 0 && `${index / 2 + 1}.`}
          {item}
        </h1>
      ))}
    </div>
  );
}
