export function completedTime(start: number, end: number) {
  const startTime: Date = new Date(start);
  const endTime: Date = new Date(end);
  const timeDiff: number = endTime.getTime() - startTime.getTime();
  const minutes: number = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds: number = Math.floor((timeDiff / 1000) % 60);
  return { minutes, seconds };
}

export function formatTimeString(time: number) {
  return String(time).padStart(2, "0");
}

export function remainingTimeForward(sessionTime: number) {
  const currentTime: number = new Date().getTime();
  const timeDiff: number = currentTime - sessionTime;
  const minutes: number = Math.floor((timeDiff / 1000 / 60) % 60);
  const seconds: number = Math.floor((timeDiff / 1000) % 60);
  return { minutes, seconds };
}

export function calculateAccuracy(time: number, score: number, timeWeight: number = 0.3, scoreWeight: number = 0.7) {
  if (score <= 0) {
    return 0;
  }
  const normalizedScore: number = (score / 100) * scoreWeight;
  const normalizedTime: number = ((10 - time) / 10) * timeWeight;
  return Number(((normalizedScore + normalizedTime) * 100).toFixed(2));
}
