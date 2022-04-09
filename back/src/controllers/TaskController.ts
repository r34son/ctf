import { StatusCodes } from "@/consts/statusCodes";
import { Task } from "@/entity/Task";
import { validationErrorsToMessages } from "@/utils";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class TaskController {
  private taskRepository = getRepository(Task);

  /** Task creation method. */
  create = async (request: Request<{}, any, Task>, response: Response) => {
    try {
      const { flag, ...task } = await this.taskRepository.save(
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

  all = async () => this.taskRepository.find();

  async one(request: Request) {
    return this.taskRepository.findOne(request.params.id);
  }

  async save(request: Request) {
    return this.taskRepository.save(request.body);
  }

  async remove(request: Request<{ id: number }>) {
    let teamToRemove = await this.taskRepository.findOne(request.params.id);
    await this.taskRepository.remove(teamToRemove);
  }
}

export default new TaskController();
