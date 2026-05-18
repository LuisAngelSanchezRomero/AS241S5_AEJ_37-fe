# Stage 1: Build Angular
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/visionai/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# CONSTRUIR UNA IMÁGEN MEDIANTE UN Dockerfile EN LA RAÍZ
# docker build -t 50luisangelsanchezromero/as241s5_aej_37-fe:latest .

# EJECUTAR LA IMÁGEN GENERADA
# docker run -d --name as241s5-aej-37-fe -p 4200:80 50luisangelsanchezromero/as241s5_aej_37-fe:latest

# SUBIR IMÁGEN GENERADA A DOCKERHUB
# docker push 50luisangelsanchezromero/as241s5_aej_37-fe:latest
