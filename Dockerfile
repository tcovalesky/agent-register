FROM node:lts-alpine AS base

RUN npm config set cache /home/node/app/.npm-cache --global
RUN npm i -g @nestjs/cli

ENV PORT=3000
WORKDIR /home/node/app
COPY package*.json ./
ENV PATH /home/node/app/node_modules/.bin:$PATH

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]