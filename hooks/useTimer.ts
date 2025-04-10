import React from 'react';

interface UseTimerOptions {
  autoStart?: boolean;
  initialTime?: number;
  interval?: number;
  onTimeChange?: (timeLeft: number) => void;
  onTimerEnd?: () => void;
}

export function useTimer({
  initialTime = 3600,
  interval = 1000,
  autoStart = false,
  onTimerEnd,
  onTimeChange
}: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = React.useState(initialTime);
  const [isRunning, setIsRunning] = React.useState(autoStart);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const hoursLeft = Math.floor(timeLeft / 3600)
    .toString()
    .padStart(2, '0');
  const minutesLeft = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const secondsLeft = (timeLeft % 60).toString().padStart(2, '0');

  React.useEffect(() => {
    if (onTimerEnd && timeLeft === 0) onTimerEnd();
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        onTimeChange?.(timeLeft);
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, interval, timeLeft]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    timeLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
    leftFullTime: formatTime
  };
}
