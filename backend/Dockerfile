FROM node:9-alpine

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

COPY . /backend
WORKDIR /backend

EXPOSE 4000