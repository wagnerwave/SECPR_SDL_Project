FROM node:16.9.1

WORKDIR /usr/src/app/ 

COPY package*.json ./

COPY . .

RUN npm install -g npm@8.0.0 npm-check-updates
RUN ncu -u
RUN npm install

RUN npm outdated

EXPOSE 8080

CMD ["npm", "start"]