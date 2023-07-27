FROM node:alpine

# RUN npm i knex -g

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm run migrate:latest

CMD ["npm", "run", "dev"]