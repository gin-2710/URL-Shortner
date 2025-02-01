FROM node:23-alpine3.20

RUN npm install -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./server .

RUN npm install

EXPOSE 3000

CMD [ "nodemon", "-L", "server.js" ]
