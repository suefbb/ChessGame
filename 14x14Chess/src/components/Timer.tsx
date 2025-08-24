/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import type { Color, Time } from "../core/types";
import { addTimes, calculateElapsedTime } from "../core/time";

const EMPTY_TIME: Time = {
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
  tenthS: 0,
};

interface TimerProps {
  currentTurn: Color;
  turn: Color;
  hours?: number;
  mins: number;
  onTimeEnd(): void;
}

export function Timer({
  currentTurn,
  mins,
  turn,
  hours = 0,
  onTimeEnd,
}: TimerProps) {
  // const [time, setTime] = useState<Time>({
  //   hours: hours,
  //   mins: mins,
  //   secs: 0,
  //   ms: 0,
  //   days: 0,
  // });
  const [time, setTime] = useState<Time>(EMPTY_TIME);
  const elapsedTime = useRef(EMPTY_TIME);
  const [date, setDate] = useState<number>(0);
  const [isTimeOver, setIsTimeOver] = useState(false);
  useEffect(() => {
    setDate(Date.now());
  }, []);
  useEffect(() => {
    if (currentTurn == turn) {
      setDate(Date.now());
    }
  }, [currentTurn, turn]);
  useEffect(() => {
    if (turn != currentTurn) {
      elapsedTime.current = time;
      console.log(`${turn} time is: ${JSON.stringify(elapsedTime.current)}`);
      console.log(`${turn} date is: ${new Date(date).toISOString()}`);
      return;
    }
    const timerId = setInterval(() => {
      const newElapsedTime = addTimes(
        calculateElapsedTime(date, Date.now()),
        elapsedTime.current
      );
      if (newElapsedTime.mins == mins) {
        clearInterval(timerId);
        setIsTimeOver(true);
        setTime(EMPTY_TIME);
        onTimeEnd();
        return;
      }
      setTime(newElapsedTime);
    }, 100);
    return () => {
      clearInterval(timerId);
    };
  }, [currentTurn, date, mins, onTimeEnd, time, turn]);
  if (isTimeOver) {
    return <div>00:00:00</div>;
  }
  return (
    <>
      <div
        style={{
          padding: "5px",
          border: "1px solid black",
          borderRadius: "5px",
          width: "fit-content",
        }}
      >
        {(mins - time?.mins - 1).toString().padStart(2, "0")}:
        {(59 - time.secs).toString().padStart(2, "0")}
        {time.mins == mins - 1 &&
          time.secs > 40 - 1 &&
          "." + time.tenthS.toString().padStart(2, "0")}
      </div>
    </>
  );
}
