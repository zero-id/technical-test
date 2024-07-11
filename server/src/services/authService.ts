import db from "../db";
import { ILogin, IRegister } from "../types/app";
import * as bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validation/user";
import jwt from "jsonwebtoken";

export const register = async (payload: IRegister) => {
  const { error, value } = registerSchema.validate(payload);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const isExists = await db.user.findFirst({
    where: {
      OR: [
        {
          username: value.username,
        },
      ],
    },
  });

  if (isExists) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  value.password = hashedPassword;

  return await db.user.create({
    data: {
      ...value,
    },
  });
};

export const login = async (payload: ILogin) => {
  const { error, value } = loginSchema.validate(payload);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = await db.user.findFirst({
    where: {
      OR: [
        {
          username : value.username,
        },
      ],
    },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(value.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  return token;
};
