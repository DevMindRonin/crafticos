export const getNoteById = async (
  _: unknown,
  { id }: { id: string },
  { db, user }: any
) => {
  if (!user) throw new Error("Not authenticated");
  try {
    return await db.oneOrNone("SELECT * FROM notes WHERE id = $1", [id]);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving note");
  }
};
