# Stage 1
FROM node:alpine as node


WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

#stage 2

FROM nginx:alpine

COPY --from=node /usr/src/app/dist/App /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
