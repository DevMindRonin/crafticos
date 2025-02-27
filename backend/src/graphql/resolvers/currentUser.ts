export const currentUser = async (_: unknown, __: unknown, { user }: any) => {
  if (!user) throw new Error("Not authenticated");
  return user;
};
