FROM node:18-alpine AS builder
WORKDIR /usr/src/flexio

# Define build-time arguments for environment variables
ARG NEXT_PUBLIC_VERSION
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_AES_SECRET_KEY
ARG NEXT_PUBLIC_LOCAL_STORAGE_KEY

# Pass build-time arguments to the environment variables during the build process
ENV NEXT_PUBLIC_VERSION=$NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AES_SECRET_KEY=$NEXT_PUBLIC_AES_SECRET_KEY
ENV NEXT_PUBLIC_LOCAL_STORAGE_KEY=$NEXT_PUBLIC_LOCAL_STORAGE_KEY

COPY package-lock.json package.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/src/flexio

# ENV NEXT_PUBLIC_VERSION=$NEXT_PUBLIC_VERSION
# ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
# ENV NEXT_PUBLIC_AES_SECRET_KEY=$NEXT_PUBLIC_AES_SECRET_KEY
# ENV NEXT_PUBLIC_LOCAL_STORAGE_KEY=$NEXT_PUBLIC_LOCAL_STORAGE_KEY

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