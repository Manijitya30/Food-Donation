import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  const exists = await prisma.user.findUnique({
    where: { email: "admin@nourish.com" }
  });

  if (exists) {
    console.log("Admin already exists");
    return;
  }

  const hashed = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@nourish.com",
      password: hashed,
      role: "ADMIN"
    }
  });

  console.log("Admin created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
