FROM node

WORKDIR /app

COPY test/package*.json ./

RUN npm install

COPY test/ .

CMD [ "node","index.js"]