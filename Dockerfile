FROM node:18.12.0-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install

CMD npm start