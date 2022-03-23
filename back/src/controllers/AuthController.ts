import { StatusCodes } from "@/consts/statusCodes";
import { Team } from "@/entity/Team";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { TokenService } from "@/services/jwt";

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

    const teamPayload = { id: team.id, name: team.name };
    const accessToken = TokenService.getAccessToken(teamPayload);

    response.send({ accessToken, team: teamPayload });
  };

  /** Admin login method. */
  adminLogin = async (request: Request<{}, any, Team>, response: Response) => {
    const { name, password } = request.body;

    if (
      name === process.env.ADMIN_NAME &&
      password === process.env.ADMIN_PASS
    ) {
      return response.send(TokenService.getAccessToken({}));
    }
    response.sendStatus(StatusCodes.BAD_REQUEST);
  };
}

export default new AuthController();
