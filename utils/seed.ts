import { db } from "@/server/connection";
import { faker } from "@faker-js/faker";
import { lectures, questions } from "@/drizzle/schema";

export const SeedLecturer = async () => {
  let dataToInsert = [];

  for (let i = 0; i < 100; i++) {
    let newData = {
      fullname: faker.person.fullName(),
      subjects: faker.person.jobTitle(),
      nip: faker.phone.number(),
      grade: faker.helpers.arrayElement(["X", "XI", "XII"]),
      point: faker.helpers.arrayElement(["A", "B", "C"]),
      faculty: faker.helpers.arrayElement([
        "Fakultas Ilmu Komputer",
        "Fakultas Teknik",
        "Fakultas Hukum",
        "Fakultas Teknik Elektro",
      ]),
      major: faker.helpers.arrayElement(["S1", "S2", "S3"]),
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
      questions: faker.lorem.sentence(),
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
    console.log("Inserting Question", data.questions);
    await db.insert(questions).values(data).returning();
  });
  console.log("Seeding Question! 🎊");
};

SeedLecturer();
SeedQuestion();
