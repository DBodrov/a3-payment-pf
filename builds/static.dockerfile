FROM registry.a-3.ru/frontend/base-images/node:16.13.0 AS builder
ARG BUILD_VERSION

WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

FROM registry.a-3.ru/frontend/base-images/nginx:16.1.0
EXPOSE 80

WORKDIR /app/dist
COPY --from=builder /app/dist/ ./
COPY builds/nginx.conf /etc/nginx/conf/nginx.conf

ENTRYPOINT ["nginx"]
