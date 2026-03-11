# Stage 1: build frontend
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
ARG BASE_PATH=/bookmark-manager/
ARG VITE_API_BASE=/bookmark-manager/api
ENV BASE_PATH=${BASE_PATH}
ENV VITE_API_BASE=${VITE_API_BASE}
RUN npm run build

# Stage 2: nginx serves static at /bookmark-manager/
FROM nginx:alpine

ARG BASE_PATH=/bookmark-manager
ENV BASE_PATH=${BASE_PATH}

RUN mkdir -p /usr/share/nginx/html${BASE_PATH}
COPY --from=builder /app/dist/. /usr/share/nginx/html${BASE_PATH}/

COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
