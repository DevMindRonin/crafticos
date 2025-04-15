import { Context } from "@/types";
export const currentUser = async (
  _: unknown,
  __: unknown,
  { user }: Context
) => {
  if (!user) throw new Error("Not authenticated");
  console.log("User in currentUser resolver:", user);
  return user;
};
