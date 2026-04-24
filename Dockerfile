# Multi-stage Docker build for the Nuxt 4 app.
# Target arch: linux/arm64 (Hetzner CAX11)

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ---- Dependencies ----
FROM base AS deps
WORKDIR /app
# better-sqlite3 needs python+make on arm64-alpine if no prebuild is available
RUN apk add --no-cache python3 make g++ libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# ---- Build ----
FROM deps AS builder
WORKDIR /app
COPY . .
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- Runtime ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000

# Runtime deps for better-sqlite3 (just the shared libs)
RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxt

COPY --from=builder --chown=nuxt:nodejs /app/.output ./.output

USER nuxt
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
