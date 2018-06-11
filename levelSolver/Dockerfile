FROM node:9.11.1-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git curl

WORKDIR /levelSolver
ADD . /levelSolver

EXPOSE 5000

CMD ["yarn", "start"]