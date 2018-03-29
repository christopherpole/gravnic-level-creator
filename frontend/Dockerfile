FROM node:9-alpine

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

COPY . /frontend
WORKDIR /frontend

EXPOSE 3000