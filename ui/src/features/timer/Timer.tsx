import { api } from 'app/api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect, useRef, useState } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { setStatus, timerSelector } from './timerSlice';
import { TimerStatus } from './types';

export const Timer = () => {
  const timer = useAppSelector(timerSelector);
  const [date, setDate] = useState<number>();
  const countdownApiRef = useRef<CountdownApi>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sse = new EventSource(`${api.defaults.baseURL}/timer/events`);

    sse.addEventListener('init', (e) => {
      const { status, endDate } = JSON.parse((e as MessageEvent).data);
      setDate(+endDate);
      dispatch(setStatus(+status));
    });

    sse.addEventListener('start', (e) => {
      setDate(+(e as MessageEvent<string>).data);
      dispatch(setStatus(TimerStatus.RUNNING));
    });

    sse.addEventListener('stop', () =>
      dispatch(setStatus(TimerStatus.STOPPED)),
    );

    sse.addEventListener('pause', () =>
      dispatch(setStatus(TimerStatus.PAUSED)),
    );

    sse.addEventListener('resume', (e) => {
      setDate(+(e as MessageEvent<string>).data);
      dispatch(setStatus(TimerStatus.RUNNING));
    });

    return () => sse.close();
  }, [dispatch]);

  useEffect(() => {
    if (!date) return;
    if (timer.status === TimerStatus.RUNNING) countdownApiRef.current?.start();
    if (timer.status === TimerStatus.STOPPED) countdownApiRef.current?.stop();
    if (timer.status === TimerStatus.PAUSED) countdownApiRef.current?.pause();
  }, [date, timer.status]);

  if (!date) return null;

  return (
    <Countdown
      autoStart={false}
      date={date}
      ref={(countdown) => {
        countdownApiRef.current = countdown?.getApi();
      }}
    />
  );
};
