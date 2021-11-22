FROM node:16

WORKDIR /usr/src/app

COPY package*.json index.js handler/ ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]