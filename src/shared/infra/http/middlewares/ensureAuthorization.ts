import { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError";
import Logger from "@config/logger";
import UsersRepository from "@modules/users/repositories/UsersRepository";

export function isAdmin() {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.find(id);
    const roleExists = ["admin"].includes(user.role.name);

    if (!roleExists) {
      const error = "Forbidden Access!";
      Logger.error(error);
      throw new AppError("Invalid login", "Forbidden Access!", 403);
    }

    return next();
  };
}
