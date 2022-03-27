import { api } from 'services/api';

export const start = async (duration: number) =>
  api.post('/timer/start', { duration });
export const stop = async () => api.post('/timer/stop');
export const pause = async () => api.post('/timer/pause');
export const resume = async () => api.post('/timer/resume');
