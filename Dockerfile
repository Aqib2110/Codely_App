FROM node:20-alpine

WORKDIR /app

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install
COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["sh", "-c", "npx prisma migrate dev && npm run start"]



