export const SQL = {
  ADD_NOTE: "INSERT INTO notes (text) VALUES ($1) RETURNING id, text",
} as const;
