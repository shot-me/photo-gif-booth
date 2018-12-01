FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN awk '{ sub ("\r$", ""); print }' generate_gif.sh > generate_gif_copy.sh

RUN mv generate_gif_copy.sh generate_gif.sh

RUN awk '{ sub ("\r$", ""); print }' generate_photo.sh > generate_photo_copy.sh

RUN mv generate_photo_copy.sh generate_photo.sh

CMD [ "node","index.js"]