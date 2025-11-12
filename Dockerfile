# ----------------------------
# Builder Stage
# ----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci
RUN npm install -D typescript ts-node

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Compile WebSocket server TS to JS
RUN npx tsc -p tsconfig.server.json

# ----------------------------
# Runner Stage
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache docker-cli
# Copy dependencies and built assets
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist  

# Set environment variable for database
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Expose ports
EXPOSE 3000 8080 9000 3001

# Start Prisma migrations, WebSocket server, and Next.js app
CMD sh -c "npx prisma migrate deploy && node dist/server/ws-server.js & npm start"






