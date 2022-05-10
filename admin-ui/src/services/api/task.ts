import { Task } from 'interfaces';
import { api } from 'services/api';

export const create = async (data: Task) => api.post<Task>('/task', data);

export const edit = async (id: Task['id'], data: Partial<Task>) =>
  api.put<Task>(`/task/${id}`, data);

export const remove = async (id: Task['id']) => api.delete(`/task/${id}`);

export const getAll = async () => api.get<Task[]>('/task');
