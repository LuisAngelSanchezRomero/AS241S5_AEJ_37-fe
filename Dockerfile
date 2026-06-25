# Stage 1: Build Angular
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve con Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/visionai/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# CONSTRUIR LA IMAGEN (no depende de carpeta dist local)
# docker build -t 50luisangelsanchezromero/luis-sanchez-37-fe:1.0 .

# EJECUTAR LA IMAGEN
# docker run -d --name luis-sanchez-37-fe -p 4200:80 50luisangelsanchezromero/luis-sanchez-37-fe:1.0

# SUBIR IMAGEN A DOCKERHUB
# docker push 50luisangelsanchezromero/luis-sanchez-37-fe:1.0
