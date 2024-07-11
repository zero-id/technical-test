import { Request, Response } from "express";
import * as userService from "../services/userService";
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user;

    const user = await userService.getUser(id);

    return res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
