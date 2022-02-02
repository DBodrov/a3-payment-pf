FROM registry.a-3.ru/frontend/base-images/node:16.13.0 AS builder
ARG BUILD_VERSION

WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine
EXPOSE 80

WORKDIR /app/dist
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY builds/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
