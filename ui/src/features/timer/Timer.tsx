import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect, useRef } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import {
  subscribeEvents,
  timerSelector,
  unsubscribeEvents,
} from './timerSlice';
import { TimerStatus } from './types';

export const Timer = () => {
  const { date, status } = useAppSelector(timerSelector);
  const countdownApiRef = useRef<CountdownApi>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(subscribeEvents());
    return () => {
      dispatch(unsubscribeEvents());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!date) return;
    if (status === TimerStatus.RUNNING) countdownApiRef.current?.start();
    if (status === TimerStatus.STOPPED) countdownApiRef.current?.stop();
    if (status === TimerStatus.PAUSED) countdownApiRef.current?.pause();
  }, [date, status]);

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
