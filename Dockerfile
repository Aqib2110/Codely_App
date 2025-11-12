FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install -D ts-node typescript

COPY . .

RUN npx prisma generate
RUN npm run build

# compile using tsconfig.json
RUN npx tsc -p tsconfig.json

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server/ws-server.js & npm start"]




