export const addNote = async (
  _: unknown,
  { text }: { text: string },
  { db, user }: any
) => {
  if (!user) throw new Error("Not authenticated");
  try {
    return await db.one(
      "INSERT INTO notes (text) VALUES ($1) RETURNING id, text",
      [text]
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error adding note");
  }
};
