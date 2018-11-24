FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${WEB_APP_PORT}

CMD [ "npm","run","start:prod"]