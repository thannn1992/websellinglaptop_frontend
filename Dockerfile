# syntax=docker/dockerfile:1

#Docker images can be inherited from other images
FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /app

#Copy from Host to Image
COPY ["package.json","package-lock.json", "./"]

#Run command in the image
RUN npm install

#copy source
COPY . .

EXPOSE 3000

#run inside a container
CMD ["npm","run", "start"]