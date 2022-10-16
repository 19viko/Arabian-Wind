export function getUserByEmail(email: string) {
  return `SELECT * FROM get_user_by_email('${email}')`;
}
