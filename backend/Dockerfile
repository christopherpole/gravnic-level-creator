FROM node:9-alpine

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

COPY . /backend
WORKDIR /backend

EXPOSE 4000

CMD [ "yarn", "start" ]