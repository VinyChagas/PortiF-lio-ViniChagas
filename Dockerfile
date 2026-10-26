# syntax=docker/dockerfile:1
# static-spa — build Vite + nginx na porta interna 3000

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.js ./
COPY public ./public
COPY content ./content
COPY src ./src
ARG VITE_STUDIO_PUBLIC_API=https://control.vinichagas.cloud/api/portfolio/public
ARG VITE_HML_STATIC_PREVIEW=false
ENV VITE_STUDIO_PUBLIC_API=$VITE_STUDIO_PUBLIC_API
ENV VITE_HML_STATIC_PREVIEW=$VITE_HML_STATIC_PREVIEW
RUN npm run build

FROM nginx:1.27-alpine AS runner
RUN apk add --no-cache wget \
  && rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
