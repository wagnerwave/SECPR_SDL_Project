FROM node:16.9.1

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install -g npm@7.24.2 npm-check-updates
RUN ncu -u
RUN npm install

RUN npm outdated


EXPOSE 3000

CMD [ "node", "server.js" ]