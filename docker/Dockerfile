FROM node:7

COPY . /app

WORKDIR /app

RUN yarn install && yarn run build && yarn cache clean

ENV NODE_ENV=production PORT=3001

EXPOSE 3001

CMD ["npm", "run", "start-production"]
