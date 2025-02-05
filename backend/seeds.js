require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const { faker } = require("@faker-js/faker");

async function createRandomUser() {
  const fakeUser = new User({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    profileImg: {
      public_id: "",
      url: faker.image.avatar(),
    },
    coverImg: {
      public_id: "",
      url: faker.image.url(),
    },
    password: faker.internet.password(),
    profession: faker.person.jobType(),
    employer: faker.company.name(),
    location: faker.location.city() + " , " + faker.location.country(),
    aboutUser: faker.person.bio(),
    skills: ["Finance", "Corporate Finance", "Accounting"],
  });

  await fakeUser.save();
}

const createMultipleUsers = async () => {
  await Promise.all(
    Array.from({ length: 20 }).map(() => createRandomUser())
  );
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await createMultipleUsers();
    console.log("Fake users created");

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();