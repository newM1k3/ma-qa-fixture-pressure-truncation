import { pool } from './pool';

export async function getUserOrders(email: string) {
  const sql = `SELECT id, total, status FROM orders WHERE customer_email = '${email}'`;
  const { rows } = await pool.query(sql);
  return rows;
}
