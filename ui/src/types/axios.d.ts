/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosResponse<T = unknown> extends Promise<T> {}
}
