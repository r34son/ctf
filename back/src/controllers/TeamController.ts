import { StatusCodes } from "@/consts/statusCodes";
import { dataSource } from "@/dataSource";
import { Team } from "@/entity/Team";
import { validationErrorsToMessages } from "@/utils";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";

class TeamController {
  private teamRepository = dataSource.getRepository(Team);

  /** Team creation method. */
  create = async (request: Request<{}, any, Team>, response: Response) => {
    try {
      const { password, ...team } = await this.teamRepository.save(
        this.teamRepository.create(request.body)
      );
      response.json(team);
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

  async all() {
    return this.teamRepository.find();
  }

  async one(request: Request<{ id: number }>) {
    const { id } = request.params;
    return this.teamRepository.findOneBy({ id });
  }

  async save(request: Request) {
    return this.teamRepository.save(request.body);
  }

  async remove(request: Request<{ id: number }>) {
    const { id } = request.params;
    const teamToRemove = await this.teamRepository.findOneBy({ id });
    await this.teamRepository.remove(teamToRemove);
  }
}

export default new TeamController();
