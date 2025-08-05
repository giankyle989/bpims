import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("done");
}

main()
  .catch((e) => {
    console.error("error seeder:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
