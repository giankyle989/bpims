#!/bin/bash

echo "Initializing bpims project"

# Exit on error
set -e

# Step 1: Install dependencies
echo "Installing dependencies"
cd bpims-server
npm install
cd ../bpims-client
npm install
cd ..

# Step 2: Prisma setup
echo "Setting up Prisma"
cd bpims-server
npx prisma generate
npx prisma migrate dev --name init

# Step 3: Seed database using npx tsx
echo "Seeding database"
npx tsx prisma/seed.ts

# Step 4: Done
cd ..
echo "Initialization complete!"
