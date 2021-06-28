FROM node:14-alpine

WORKDIR /app

COPY ./data ./data

COPY ./package*.json .

COPY ./mock-backend.js .

RUN npm install

CMD ["node", "mock-backend.js"]