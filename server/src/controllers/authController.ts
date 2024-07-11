import { Request, Response } from "express";
import * as authService from "../services/authService";
import { ILogin, IRegister } from "../types/app";

export const register = async (req: Request, res: Response) => {
  try {
    const data: IRegister = req.body;
    const user = await authService.register(data);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data: ILogin = req.body;
    const user = await authService.login(data);

    res.status(200).json({
      message: "User logged in successfully",
      token: user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
