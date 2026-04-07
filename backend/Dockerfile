FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace manifests for layer caching
COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install all deps (workspaces need all manifests present)
RUN npm ci

# Copy backend source and build TypeScript
COPY backend/src ./backend/src
COPY backend/tsconfig.json ./backend/tsconfig.json

WORKDIR /app/backend
RUN npm run build

# ---- Production runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy manifests and install only production deps
COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

RUN npm ci --omit=dev

# Copy compiled output
COPY --from=builder /app/backend/dist ./backend/dist

WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "dist/server.js"]
