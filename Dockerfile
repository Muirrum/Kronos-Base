FROM node:10.16.0-alpine
RUN mkdir -p /usr/src/bot
RUN mkdir -p /usr/src/bot/db
COPY . /usr/src/bot
WORKDIR /usr/src/bot
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp

CMD ["node", "index.js"]
