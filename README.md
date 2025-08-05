## Initial Setup Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/giankyle989/bpims.git

2. **Copy environment variables:**

- Navigate to bpims-client/src/configs/ and copy the .env.example to the root of the client:
  ```bash
      cd bpims-client
      cp src/configs/.env.example .env
      cd ..

3. **Do the same for the server:**
    ```bash
      cd bpims-server
      cp src/config/.env.example .env
      cd ..

4. **Modify the .env files based on your own configuration:**

 - Client runs on port 4000 by default

 - Server runs on port 5000 by default

5. **Run the initialization script:**

From the root of the project, run:

`sh init.sh`

 - This script will:

 - Install dependencies

 - Generate Prisma client

 - Run database migrations

 - Seed the database for account login

 ---IF USING POWERSHELL---

      cd ../bpims-client
      npm install

      cd bpims-server
      npm install

      npx prisma generate
      npx prisma migrate dev --name init

      npx tsx prisma/seed.ts

      cd ..

Once the script is finished, you can now run client and server using `npm run dev`

**Login Info:**

 - Username: admin
 - Password: 1234


## Techstack
- React
- Shadcn
- Tailwind
- Node
- Express
- Prisma
- Mysql
- AWS S3 and Cloudfront for image storage
