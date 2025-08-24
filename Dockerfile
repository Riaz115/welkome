## Stage 1 - Build React app
#FROM node:18 AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install --legacy-peer-deps
#COPY . .
#RUN npm run build
#
## Stage 2 - Serve with nginx
#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
#


# Dockerfile for frontend (production build)
# frontend/Dockerfile (development version)
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
