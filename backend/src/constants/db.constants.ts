export const SQL = {
  ADD_NOTE: `INSERT INTO notes (text) VALUES ($1) RETURNING id, text, created_at`,
  DELETE_NOTE: `DELETE FROM notes WHERE id = $1 RETURNING id`,
  GET_NOTE_BY_ID: `SELECT * FROM notes WHERE id = $1`,
  GET_NOTES: `SELECT * FROM notes`,
  UPDATE_NOTE: `UPDATE notes SET text = $2 WHERE id = $1 RETURNING *`,
  GET_USER_BY_EMAIL: `SELECT id, email, name, role FROM "users" WHERE email = $1`,

  REGISTER_USER: `INSERT INTO "users" (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role`,
  LOGIN_USER: `SELECT id, email, password, name, role FROM "users" WHERE email = $1`,
  DELETE_USER: 'DELETE FROM "users" WHERE id = $1',
} as const;
