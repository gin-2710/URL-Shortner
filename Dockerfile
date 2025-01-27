FROM node:23-alpine3.20

RUN npm install -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./server .

RUN npm install

EXPOSE 3000

CMD [ "nodemon", "-L", "server.js" ]

# to run use command: docker run -e PORT=4000 -p 4000:4000 your_image_name