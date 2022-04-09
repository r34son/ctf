import { Task } from 'interfaces';
import { api } from 'services/api';

export const create = async (data: Task) => api.post<Task>('/task', data);
