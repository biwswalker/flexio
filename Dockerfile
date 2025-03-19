FROM node:18-alpine AS builder
WORKDIR /usr/src/flexio

COPY package-lock.json package.json .env ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/src/flexio
COPY --from=builder /usr/src/flexio/package.json .
COPY --from=builder /usr/src/flexio/package-lock.json .
COPY --from=builder /usr/src/flexio/next.config.mjs .
COPY --from=builder /usr/src/flexio/public ./public
COPY --from=builder /usr/src/flexio/.next/standalone ./
COPY --from=builder /usr/src/flexio/.next/static ./.next/static
# COPY --from=builder /usr/src/flexio/node_modules ./node_modules
# COPY --from=builder /usr/src/flexio/.next ./.next

CMD ["node", "server.js"]
EXPOSE 3000