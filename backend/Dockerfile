FROM node:9-alpine

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

COPY . /backend
WORKDIR /backend

EXPOSE 4000