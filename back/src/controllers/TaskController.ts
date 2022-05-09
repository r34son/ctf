import { StatusCodes } from "@/consts/statusCodes";
import { dataSource } from "@/dataSource";
import { Task } from "@/entity/Task";
import { SocketServer } from "@/interfaces/socket";
import { validationErrorsToMessages } from "@/utils";
import { ValidationError } from "class-validator";
import { Request, RequestHandler, Response } from "express";

type Params = { id: string };

class TaskController {
  private taskRepository = dataSource.getRepository(Task);

  /** Task creation method. */
  create = async (request: Request<{}, any, Task>, response: Response) => {
    try {
      const { flag, enabled, ...task } = await this.taskRepository.save(
        this.taskRepository.create(request.body)
      );
      response.json(task);
    } catch (errors) {
      // TODO: вынести в мидлу
      if (
        Array.isArray(errors) &&
        errors.every((err) => err instanceof ValidationError)
      ) {
        return response
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ error: validationErrorsToMessages(errors) });
      }
      response.status(StatusCodes.BAD_REQUEST).json({ error: errors.message });
    }
  };

  all = async (_request: Request, response: Response) => {
    if (!response.locals.id) {
      return response.json(
        await dataSource.manager
          .createQueryBuilder(Task, "task")
          .addSelect("task.enabled")
          .getMany()
      );
    } else
      return response.json(
        await this.taskRepository.find({ where: { enabled: true } })
      );
  };

  remove: RequestHandler<Params> = async (request, response) => {
    const id = +request.params.id;
    const taskToRemove = await this.taskRepository.findOneBy({ id });
    await this.taskRepository.remove(taskToRemove);
    (request.app.get("io") as SocketServer).emit("task:remove", id);
    response.sendStatus(StatusCodes.OK);
  };

  update: RequestHandler<Params, any, Task> = async (request, response) => {
    try {
      const task = await dataSource.manager
        .createQueryBuilder(Task, "task")
        .addSelect("task.flag")
        .addSelect("task.enabled")
        .where("task.id = :id", request.params)
        .getOne();
      const wasEnabled = task.enabled;
      this.taskRepository.merge(task, request.body);
      const { flag, enabled, ...result } = await this.taskRepository.save(task);
      if (!wasEnabled && enabled) {
        (request.app.get("io") as SocketServer).emit(
          "task:add",
          result as Task
        );
      } else if (wasEnabled && !enabled) {
        (request.app.get("io") as SocketServer).emit("task:remove", result.id);
      } else {
        (request.app.get("io") as SocketServer).emit(
          "task:update",
          result as Task
        );
      }
      response.json(result);
    } catch (errors) {
      if (
        Array.isArray(errors) &&
        errors.every((err) => err instanceof ValidationError)
      ) {
        return response
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ error: validationErrorsToMessages(errors) });
      }
      response.status(StatusCodes.BAD_REQUEST).json({ error: errors.message });
    }
  };
}

export default new TaskController();
