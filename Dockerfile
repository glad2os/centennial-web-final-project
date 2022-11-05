FROM node:18.12.0-alpine AS node

WORKDIR /usr/src/app
COPY package.json ./
COPY .babelrc ./
RUN npm install

COPY --from=node /usr/src/app/ ./

CMD npm start