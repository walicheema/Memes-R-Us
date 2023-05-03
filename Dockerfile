FROM node:lts-slim

WORKDIR usr/local/app

COPY . .

COPY ./src/views ./views

RUN npm install

EXPOSE 3000

CMD [ "node", "/usr/local/app/src/index.js"]