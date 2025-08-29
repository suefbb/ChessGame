import type { Time } from "./types";

/**
 * This function get the time difference between its two parameters and returns a **Time** Object.
 * @param initialDate The time in which the timer started
 * @param currentDate Current Time to substract form the initial time
 * @returns a **Time** object
 */
export function calculateElapsedTime(
  initialDate: number,
  currentDate: number
): Time {
  const time: Time = { hours: 0, mins: 0, secs: 0, tenthS: 0, days: 0 };
  const timeDifference = Math.abs(initialDate - currentDate);
  time.hours = Math.abs(Math.floor((timeDifference / (1000 * 60 * 60)) % 24));
  time.mins = Math.abs(Math.floor((timeDifference / (1000 * 60)) % 60));
  time.secs = Math.abs(Math.floor((timeDifference / 1000) % 60));
  time.tenthS = Math.abs(Math.floor(timeDifference % 100));
  return time;
}

export function addTimes(a: Time, b: Time) {
  const result: Time = {
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    tenthS: 0,
  };
  a.days = (a.days + b.days) % 356; // NOTE: This is probably unsafe and I don't know what it'll do in case of leap years...
  result.hours = (a.hours + b.hours) % 60;
  result.mins = (a.mins + b.mins) % 60;
  result.secs = (a.secs + b.secs) % 60;
  result.tenthS = (a.tenthS + b.tenthS) % 100;
  return result;
}
