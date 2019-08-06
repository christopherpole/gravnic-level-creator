# Gravnic Level Creator

[![CircleCI](https://circleci.com/gh/christopherpole/gravnic-level-creator/tree/master.svg?style=shield&circle-token=d519026a32dd609284eaa21668cc5a7beb34819f)](https://circleci.com/gh/christopherpole/gravnic-level-creator/tree/master) [![Coverage Status](https://coveralls.io/repos/github/christopherpole/gravnic-level-creator/badge.svg?branch=master)](https://coveralls.io/github/christopherpole/gravnic-level-creator?branch=master)

A React/Redux web app that allows users to create, manage, export, play and automatically solve "Gravnic" levels.

![Gravnic Level Creator](https://chrispole.ams3.digitaloceanspaces.com/gravnic-level-creator.jpg)

## Motivation

Despite being a minor side-project of mine, I wanted to put the effort into making the code the same quality I would typically produce in my day job, as my Github is a bit bare right now and it would be nice to be able to demonstrate the way I work; most of the code I produce is closed-source, and is therefore not demoable.

## Usage

TODO

## Demo

A live demo is available [here](http://gravnic.chrispole.com). Level saving/solving might not work as using the free Heroku plan which means the services will take about 30 seconds to "wake up". Open the failed network requests in a seperate tab if you want to see these working.

## Roadmap

* Implement the remaining gameplay elements
* Replace the placeholder graphics with the live ones
* Finish writing the documentation
* Have the level solver able to solve problems concurrently
* Optimisations the performance of the level solver
* Add missing tests

## Improvements

No codebase is perfect, and with experience of having built something, there's always things we would we do differently a second time round. If I were to build this project out again from scratch, I would:

* Use the Web Animation API to animate the level preview entities instead of CSS animations & sagas in order to simplify and improve the performance of the level preview tool
* Have the level solver find all possible solutions for a level instead of just finding the quickest solution each time
* Look into ways of reducing the amount of boilerplate from Redux and Redux-saga
* Use the frontend server for development instead of CRA's dev server to make working with env variables a bit easier
* Use Cypress as the end-to-end testing framework
