import db from "../db";

export const getUser = async (id: number) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};
