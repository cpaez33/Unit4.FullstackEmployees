import { faker } from "@faker-js/faker";

import db from "#db/client";

import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.firstName(),
      birthday: faker.date.past({ years: 50 }),
      salary: faker.number.int({ min: 40000, max: 125000 }),
    };
    // console.log(employee);
    await createEmployee(employee);
  }
  // TODO
}
