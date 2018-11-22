FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN awk '{ sub ("\r$", ""); print }' generate.sh > generate_copy.sh

RUN mv generate_copy.sh generate.sh

CMD [ "node","index.js"]