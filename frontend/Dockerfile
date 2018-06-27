FROM node:9.11.1-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git curl

WORKDIR /frontend
ADD . /frontend

EXPOSE 3000

CMD ["yarn", "dev"]