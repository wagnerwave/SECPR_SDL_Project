FROM node:16.9.1

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install -g npm@7.24.0
RUN npm fund --save
RUN npm i --package-lock-only
RUN npm audit fix --force

EXPOSE 3000

CMD [ "node", "server.js" ]