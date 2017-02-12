FROM node:7.5.0

RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV=production PORT=3001

COPY docker/server.js docker/package.json /app/
COPY dist /app/dist

RUN npm install && npm cache clean

CMD ["npm", "start"]

