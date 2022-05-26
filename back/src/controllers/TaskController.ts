import { StatusCodes } from "@/consts/statusCodes";
import { dataSource } from "@/dataSource";
import { Task } from "@/entity/Task";
import { TeamSolvedTasks } from "@/entity/TeamSolvedTasks";
import { SocketServer } from "@/interfaces/socket";
import { validationErrorsToMessages } from "@/utils";
import bcrypt from "bcrypt";
import { ValidationError } from "class-validator";
import { Request, RequestHandler, Response } from "express";

type Params = { id: string };
type SolveBody = { taskId: string; flag: string };

class TaskController {
  private taskRepository = dataSource.getRepository(Task);
  private solvedTasksRepository = dataSource.getRepository(TeamSolvedTasks);

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
    } else {
      const tasks = await this.taskRepository.find({
        where: { enabled: true },
        relations: ["solved"],
      });

      return response.json(
        tasks.map(({ solved, ...task }) => ({
          ...task,
          solved: Boolean(solved.find((s) => s.teamId === response.locals.id)),
        }))
      );
    }
  };

  remove: RequestHandler<Params> = async (request, response) => {
    const id = +request.params.id;
    const taskToRemove = await this.taskRepository.findOneBy({ id });
    if (taskToRemove) await this.taskRepository.remove(taskToRemove);
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

  solve: RequestHandler<any, any, SolveBody> = async (request, response) => {
    const { taskId, flag } = request.body;
    const task = await dataSource.manager
      .createQueryBuilder(Task, "task")
      .addSelect("task.flag")
      .where({ id: Number(taskId) })
      .getOne();

    if (!task) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Задание не найдено." });
    }

    const solved = await this.solvedTasksRepository.findOne({
      where: {
        taskId: Number(taskId),
        teamId: Number(response.locals.id),
      },
    });

    if (solved) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Задание уже решено." });
    }

    const isCorrect = await bcrypt.compare(flag, task.flag);

    if (!isCorrect) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Неверный флаг." });
    }

    const solvedTask = await this.solvedTasksRepository.save(
      this.solvedTasksRepository.create({
        teamId: response.locals.id,
        taskId: Number(taskId),
      })
    );

    (request.app.get("io") as SocketServer).emit("task:solve", solvedTask);

    return response.sendStatus(StatusCodes.OK);
  };

  stats: RequestHandler<any, any, any> = async (_, response) => {
    const solvedTasks = await this.solvedTasksRepository.find({
      relations: ["team", "task"],
    });

    const stats = {};

    for (const solvedTask of solvedTasks) {
      const {
        task: { title, points },
        team: { id, name },
        createdAt,
      } = solvedTask;

      if (!stats[name]) stats[name] = { id, totalPoints: 0, graph: [] };

      stats[name].totalPoints += points;
      stats[name].graph.push({
        title,
        points,
        value: stats[name].totalPoints,
        time: createdAt.valueOf(),
      });
    }

    return response
      .status(StatusCodes.OK)
      .json(Object.keys(stats).map((name) => ({ name, ...stats[name] })));
  };
}

export default new TaskController();
