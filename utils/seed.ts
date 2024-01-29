import { db } from "@/server/connection";
import { faker } from "@faker-js/faker";
import { lectures, questions, users } from "@/drizzle/schema";
import * as bs from "bcryptjs";

export const SeedLecturer = async () => {
  let dataToInsert = [];

  for (let i = 0; i < 100; i++) {
    let newData = {
      fullname: faker.person.fullName(),
      subjects: faker.person.jobTitle(),
      image: faker.image.people(),
      nip: faker.phone.number(),
      grade: faker.helpers.arrayElement([
        "Baik",
        "Sangat Baik",
        "Buruk",
        "Sangat Buruk",
      ]),
      point: faker.helpers.arrayElement(["70", "80", "90", "60"]),
      faculty: faker.helpers.arrayElement(["Fakultas Teknik"]),
      major: faker.helpers.arrayElement(["Informatika", "Industri", "Elektro"]),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataToInsert.push(newData);
  }
  console.log("Seeding Lecturer... 🚀");
  dataToInsert.forEach(async (data) => {
    console.log("Inserting lecturer", data.fullname);
    await db.insert(lectures).values(data).returning();
  });
  console.log("Seeding Lecturer! 🎊");
};

export const SeedQuestion = async () => {
  let dataToInsert = [];

  for (let i = 0; i < 100; i++) {
    let newData = {
      question: faker.lorem.sentence(),
      dimension: faker.helpers.arrayElement([
        "Kognitif",
        "Sosial",
        "Keterampilan",
      ]),
      indicator: faker.helpers.arrayElement([
        "Sangat Baik",
        "Baik",
        "Cukup Baik",
        "Kurang Baik",
        "Sangat Kurang",
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataToInsert.push(newData);
  }
  console.log("Seeding Question... 🚀");
  dataToInsert.forEach(async (data) => {
    console.log("Inserting Question", data.question);
    await db.insert(questions).values(data).returning();
  });
  console.log("Seeding Question! 🎊");
};

export const SeedUsers = async () => {
  let dataToInsert = [];

  const password = await bs.hash("admin123", 12);

  for (let i = 0; i < 100; i++) {
    let newData = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      permissions: ["Read Dosen", "Dashboard"],
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataToInsert.push(newData);
  }
  console.log("Seeding Users... 🚀");
  dataToInsert.forEach(async (data) => {
    console.log("Inserting Users", data.fullname);
    await db.insert(users).values(data).returning();
  });
  console.log("Seeding Users! 🎊");
};

SeedLecturer();
SeedUsers();
