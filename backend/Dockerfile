FROM node:9.11.1-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git curl

WORKDIR /backend
ADD . /backend

EXPOSE 4000

CMD ["yarn", "start"]