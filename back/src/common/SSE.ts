import { getSSEBody } from "@/utils";
import EventEmitter from "events";
import { OutgoingHttpHeaders } from "http";

/** Класс реализующий SSE технологию */
export abstract class SSE {
  private eventEmitter = new EventEmitter();
  readonly httpHeaders: OutgoingHttpHeaders = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  emit = (event: string, data?: any) => this.eventEmitter.emit(event, data);

  addEventListener = (event: string, callback: (SSEBody: string) => void) =>
    this.eventEmitter.on(event, (data) => callback(getSSEBody(event, data)));
}
