FROM node:18.12.0 as build
WORKDIR /usr/src/app
COPY package.json webpack.config.js webpack.base.js ./
ADD src/assets ./src/assets/

RUN npm i && npm run build

FROM nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template