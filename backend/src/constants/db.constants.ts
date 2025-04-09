export const SQL = {
  ADD_NOTE: "INSERT INTO notes (text) VALUES ($1) RETURNING id, text",
  DELETE_NOTE: "DELETE FROM notes WHERE id = $1 RETURNING id",
  GET_NOTE_BY_ID: "SELECT * FROM notes WHERE id = $1",
  GET_NOTES: "SELECT * FROM notes",
  UPDATE_NOTE: "UPDATE notes SET text = $2 WHERE id = $1 RETURNING *",
} as const;
