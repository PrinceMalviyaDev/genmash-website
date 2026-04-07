FROM node:20-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* vars are baked at build time in Next.js
ARG NEXT_PUBLIC_API_URL=http://localhost:5000

# Copy workspace manifests for layer caching
COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install all deps
RUN npm ci

# Copy frontend source
COPY frontend/ ./frontend/

# Ensure public dir exists (Next.js build may warn if missing)
RUN mkdir -p ./frontend/public

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app/frontend
RUN npm run build

# ---- Production runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy manifests and install only production deps
COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

RUN npm ci --omit=dev

# Copy Next.js build output and static assets
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public

# Add workspace root bin to PATH so `next` binary is found
ENV PATH="/app/node_modules/.bin:${PATH}"

WORKDIR /app/frontend
EXPOSE 3000
CMD ["next", "start"]
