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

interface blackProps {
  blackMin: number;
  blackTenSec: number;
  blackSec: number;
  blackMlSec: number;
}
export function BLtimer(timer: blackProps) {
  const [BT, setBT] = useState<number[]>(JSON.parse(localStorage.Btm));
  useEffect(() => {
    const Btime = setTimeout(() => {
      if (localStorage.currentTurn == "b") {
        if (BT[3] !== 0) {
          setBT([BT[0], BT[1], BT[2], BT[3] - 1]);
        } else if (BT[3] == 0 && BT[2] !== 0) {
          setBT([BT[0], BT[1], BT[2] - 1, 9]);
        } else if (BT[3] == 0 && BT[2] == 0 && BT[1] !== 0) {
          setBT([BT[0], BT[1] - 1, 9, 9]);
        } else if (BT[3] == 0 && BT[2] == 0 && BT[1] == 0 && BT[0] !== 0) {
          setBT([BT[0] - 1, 5, 9, 9]);
        } else if (BT[3] == 0 && BT[2] == 0 && BT[1] == 0 && BT[0] == 0) {
          clearTimeout(Btime);
        }
      }
    }, 100);
    localStorage.setItem("Btm", JSON.stringify(BT));
  });
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "40px",
          width: "80px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1.5px solid black",
          fontSize: "x-large",
        }}
      >
        {BT[0]}:{BT[1]}
        {BT[2]}.{BT[3]}
      </div>
    </>
  );
}
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

// export function Timer({
//   currentTurn,
//   turn,
//   mins,
// }: TimerProps) {
//   const startTimeRef = useRef<Date>(null);
//   useEffect(() => {
//     if (startTimeRef.current == null) {
//       const savedStartTime = localStorage.getItem(`${turn}StartTime`);
//       if (!savedStartTime) {
//         startTimeRef.current = new Date();
//         return;
//       }
//       startTimeRef.current = new Date(
//         localStorage.getItem(`${turn}StartTime`)!
//       );
//     }
//   }, [turn]);
//   const [elapsed, setElapsed] = useState<Time>({
//     days: 0,
//     hours: 0,
//     mins: 0,
//     secs: 0,
//     ms: 0,
//   });
//   const savedElapsed = useRef<number>(0);
//   const intervalRef = useRef<number | null>(0);
//   useEffect(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     if (currentTurn == turn) {
//       const start = Date.now() - savedElapsed.current;
//       const intervalId = setInterval(() => {
//         const diff = Date.now() - start;
//         savedElapsed.current = diff;
//         if (startTimeRef.current) {
//           setElapsed(
//             calculateElapsedTime(
//               startTimeRef.current,
//               new Date(startTimeRef.current.getTime() + diff)
//             )
//           );
//         }
//       }, 100);
//       intervalRef.current = intervalId;
//     }
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//         localStorage.setItem(
//           `${turn}StartTime`,
//           startTimeRef.current?.toISOString() || "{}"
//         );
//       }
//     };
//   }, [currentTurn, turn]);
//   return (
//     <div
//       style={{
//         padding: "5px",
//         border: "1px solid black",
//         // backgroundColor: "gray",
//         width: "fit-content",
//       }}
//     >
//       {String(mins - elapsed.mins).padStart(2, "0")}:
//       {String(60 - elapsed.secs).padStart(2, "0")}
//     </div>
//   );
// }
