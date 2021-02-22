FROM node:14.5-slim

WORKDIR www/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]