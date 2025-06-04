import express from "express";
const router = express.Router();
export default router;

// TODO: this file!

import {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

router.route("/").get(async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.route("/").post(async (req, res) => {
  if (!req.body) return res.status(400).send("Request body not provided");

  if (!req.body.name || !req.body.birthday || !req.body.salary)
    return res
      .status(400)
      .send("Request body must have name, birthday, and salary");

  const createdEmployee = await createEmployee(req.body);
  res.status(201).send(createdEmployee);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a postive integer");

  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found");

  req.employee = employee;
  next();
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.employee);
  })
  .put(async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body");
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res
        .status(400)
        .send("Request body must have: name, birthday, and salary");
    const employee = await updateEmployee({
      id: req.employee.id,
      name,
      birthday,
      salary,
    });
    res.send(employee);
  })
  .delete(async (req, res) => {
    await deleteEmployee(req.employee.id);
    res.sendStatus(204);
  });
