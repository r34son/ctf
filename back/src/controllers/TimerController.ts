import { SSE } from "@/common/SSE";
import { StatusCodes } from "@/consts/statusCodes";
import { getSSEBody } from "@/utils";
import { Request, Response } from "express";

export enum TimerStatus {
  RUNNING = "running",
  PAUSED = "paused",
  STOPPED = "stopped",
}

class TimerController extends SSE {
  private endDate?: number;
  private remainingTime?: number;
  private status: TimerStatus = TimerStatus.STOPPED;

  timerEvents = async (_request: Request, response: Response) => {
    response.writeHead(StatusCodes.OK, this.httpHeaders);
    if (this.status === TimerStatus.RUNNING)
      response.write(
        getSSEBody("init", { status: this.status, endDate: this.endDate })
      );

    if (this.status === TimerStatus.PAUSED)
      response.write(
        getSSEBody("init", {
          status: this.status,
          endDate: Date.now() + this.remainingTime,
        })
      );

    this.addEventListener("start", (data) => response.write(data));
    this.addEventListener("stop", (data) => response.write(data));
    this.addEventListener("pause", (data) => response.write(data));
    this.addEventListener("resume", (data) => response.write(data));

    response.on("close", response.end);
  };

  start = (
    request: Request<{}, any, { duration: number }>,
    response: Response
  ) => {
    this.endDate = Date.now() + request.body.duration;
    this.status = TimerStatus.RUNNING;
    this.emit("start", this.endDate);
    response.sendStatus(StatusCodes.OK);
  };

  stop = (_request: Request, response: Response) => {
    this.endDate = undefined;
    this.status = TimerStatus.STOPPED;
    this.emit("stop");
    response.sendStatus(StatusCodes.OK);
  };

  pause = (_request: Request, response: Response) => {
    this.remainingTime = this.endDate - Date.now();
    this.status = TimerStatus.PAUSED;
    this.emit("pause");
    response.sendStatus(StatusCodes.OK);
  };

  resume = (_request: Request, response: Response) => {
    if (this.status !== TimerStatus.PAUSED)
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message:
            "Вы можете продолжить таймер только если он находится на паузе",
        });
    this.endDate = Date.now() + this.remainingTime;
    this.status = TimerStatus.RUNNING;
    this.emit("resume", this.endDate);
    response.sendStatus(StatusCodes.OK);
  };
}

export default new TimerController();
