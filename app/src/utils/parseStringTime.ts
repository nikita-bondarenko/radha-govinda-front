type Result = {
  seconds: number;
  minuts: number;
  hours: number;
};

const isFormatValid = (string?: string | null) =>
  string?.split("").every((symbol) => symbol === ":" || /^\d+$/.test(symbol));

const emptyResult = { seconds: 0, minuts: 0, hours: 0 };
export const parseStringTime = (time?: string | null): Result => {
  if (!time) return emptyResult;
  if (!isFormatValid(time)) return emptyResult;

  const timeArr = time.split(":");

  const seconds = Number(timeArr[timeArr.length - 1]);

  const minuts = Number(timeArr[timeArr.length - 2]);

  const hours = Number(timeArr[timeArr.length - 3]);

  const totalSeconds =
    (Number.isNaN(hours) ? 0 : hours * 3600) +
    (Number.isNaN(minuts) ? 0 : minuts * 60) +
    (Number.isNaN(seconds) ? 0 : seconds);

  return {
    seconds: totalSeconds,
    minuts: Math.round(totalSeconds / 60),
    hours: Math.round(totalSeconds / 3600),
  };
};
