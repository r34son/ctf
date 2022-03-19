import { StatusCodes } from "@/consts/statusCodes";
import { Team } from "@/entity/Team";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenData } from "@/consts";
import { ADMIN_NAME, ADMIN_PASS, JWT_SECRET } from "@/consts/env";

class AuthController {
  private teamRepository = getRepository(Team);

  /** Login method. */
  login = async (request: Request<{}, any, Team>, response: Response) => {
    const { name, password } = request.body;
    const team = await this.teamRepository.findOne({
      where: { name },
      select: ["id", "name", "password"],
    });
    if (!team)
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ name: "Invalid name" });

    if (!team.auth(password))
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ password: "Invalid password" });

    const accessToken = jwt.sign({ id: team.id } as TokenData, JWT_SECRET, {
      expiresIn: "2d",
    });

    response.send({ accessToken, team: { id: team.id, name: team.name } });
  };

  /** Admin login method. */
  adminLogin = async (request: Request<{}, any, Team>, response: Response) => {
    const { name, password } = request.body;

    if (name === ADMIN_NAME && password === ADMIN_PASS) {
      return response.send(
        jwt.sign({} as TokenData, JWT_SECRET, { expiresIn: "1d" })
      );
    }
    response.sendStatus(StatusCodes.BAD_REQUEST);
  };

  /** Return team by jwt token. */
  getTeamByToken = async (_request: Request, response: Response) => {
    const team = await this.teamRepository.findOne(response.locals.id);
    if (!team) {
      return response.sendStatus(StatusCodes.BAD_REQUEST);
    }
    response.json(team);
  };
}

export default new AuthController();
