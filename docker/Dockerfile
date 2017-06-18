FROM node:7

COPY . /app

WORKDIR /app

ARG API_HOST=https://api-stage-v4.goodjob.life
ARG CONTENTFUL_API_HOST=https://content-stage.goodjob.life
ARG FACEBOOK_APP_ID=1750608541889151

ENV API_HOST="${API_HOST}" CONTENTFUL_API_HOST="${CONTENTFUL_API_HOST}" FACEBOOK_APP_ID="${FACEBOOK_APP_ID}"

RUN yarn install && yarn run build && yarn cache clean

ENV NODE_ENV=production PORT=3001

EXPOSE 3001

CMD ["npm", "run", "start-production"]
