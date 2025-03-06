export const getNotes = async (_: unknown, __: unknown, { db, user }: any) => {
  if (!user) throw new Error("Not authenticated");
  try {
    return await db.any("SELECT * FROM notes");
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving notes");
  }
};
