import { Task } from "@/entity/Task";
import { TeamSolvedTasks } from "@/entity/TeamSolvedTasks";
import { TokenData } from "@/services/jwt";
import { Server, Socket } from "socket.io";

// https://socket.io/docs/v4/typescript/#types-for-the-server
export interface ServerToClientEvents {
  ["task:add"]: (task: Task) => void;
  ["task:remove"]: (id: Task["id"]) => void;
  ["task:update"]: (task: Task) => void;
  ["task:solve"]: (solvedTask: TeamSolvedTasks) => void;
}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData extends TokenData {}

export type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
