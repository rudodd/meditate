export const time = {
  seconds: (sec:number) => {
    return sec * 1000;
  },
  minutes: (min: number) => {
    return (min * 60) * 1000;
  },
  minToSec: (min: number) => {
    return min * 60;
  }
}