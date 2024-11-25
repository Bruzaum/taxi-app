FROM node:20.18.0

EXPOSE 8080

WORKDIR /backend

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]