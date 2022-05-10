import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Button, Card, CardActions, Stack } from '@mui/material';
import { TimerStatus } from 'interfaces';
import { useEffect, useState } from 'react';
import { api } from 'services/api';
import { pause, resume, stop } from 'services/api/timer';
import { StartTimerForm } from '../forms/StartTimerForm';

export const TimerControl = () => {
  const [status, setStatus] = useState<TimerStatus>();

  useEffect(() => {
    const sse = new EventSource(`${api.defaults.baseURL}/timer/events`);

    sse.addEventListener('init', (e) => {
      const { status: initialStatus } = JSON.parse((e as MessageEvent).data);
      setStatus(initialStatus as TimerStatus);
    });

    sse.addEventListener('start', () => setStatus(TimerStatus.RUNNING));
    sse.addEventListener('stop', () => setStatus(TimerStatus.STOPPED));
    sse.addEventListener('pause', () => setStatus(TimerStatus.PAUSED));
    sse.addEventListener('resume', () => setStatus(TimerStatus.RUNNING));

    return () => sse.close();
  }, []);

  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;

  const onStopClick = () => stop();
  const onPauseClick = () => pause();
  const onResumeClick = () => resume();

  return (
    <Card>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={1}>
          <StartTimerForm />
          <Button
            disabled={!isRunning}
            onClick={onPauseClick}
            startIcon={<PauseIcon />}
          >
            Pause
          </Button>
          <Button
            disabled={!isPaused}
            onClick={onResumeClick}
            startIcon={<PlayArrowIcon />}
          >
            Resume
          </Button>
          <Button
            disabled={!isRunning}
            onClick={onStopClick}
            startIcon={<StopIcon />}
          >
            Stop
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
