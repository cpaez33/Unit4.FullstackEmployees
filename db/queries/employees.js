import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const sql = `INSERT INTO employees(name, birthday, salary)
  VALUES($1, $2, $3)
  RETURNING *
  `;
  const { rows } = await db.query(sql, [name, birthday, salary]);
  return rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `
 SELECT * FROM employees
 `;
  const { rows: employees } = await db.query(sql);
  console.log("getting all", employees);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const { rows } = await db.query("SELECT * FROM employees where id =$1", [id]);
  const employee = rows[0];
  console.log("employee check", employee);
  if (!employee) return undefined;
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const result = await db.query(
    `UPDATE employees SET name = $1, birthday = $2, salary =$3 WHERE id = $4 RETURNING *`,
    [name, birthday, salary, id]
  );
  if (!result) return undefined;
  return result.rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const result = await db.query(
    `DELETE from employees WHERE id = $1 RETURNING *`,
    [id]
  );
  if (!result) return undefined;
  return result.rows[0];
  // TODO
}
