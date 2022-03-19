import { StatusCodes } from "@/consts/statusCodes";
import { ValidationError } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Team } from "@/entity/Team";
import { validationErrorsToMessages } from "@/utils";

class TeamController {
  private teamRepository = getRepository(Team);

  /** Team creation method. */
  create = async (request: Request<{}, any, Team>, response: Response) => {
    try {
      const team = await this.teamRepository.save(
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

  async one(request: Request) {
    return this.teamRepository.findOne(request.params.id);
  }

  async save(request: Request) {
    return this.teamRepository.save(request.body);
  }

  async remove(request: Request) {
    let teamToRemove = await this.teamRepository.findOne(request.params.id);
    await this.teamRepository.remove(teamToRemove);
  }
}

export default new TeamController();
