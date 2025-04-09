export const SQL = {
  ADD_NOTE: "INSERT INTO notes (text) VALUES ($1) RETURNING id, text",
  DELETE_NOTE: "DELETE FROM notes WHERE id = $1 RETURNING id",
} as const;
