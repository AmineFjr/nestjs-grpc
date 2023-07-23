docker compose up -d
cd api-product && npx prisma migrate dev 
cd api-authentication && npx prisma migrate dev