# Gravnic Level Creator [![CircleCI](https://circleci.com/gh/christopherpole/gravnic-level-creator/tree/master.svg?style=shield&circle-token=d519026a32dd609284eaa21668cc5a7beb34819f)](https://circleci.com/gh/christopherpole/gravnic-level-creator/tree/master)

A React/Redux web app that lets you create, manage, preview and automatically solve "Gravnic" levels.

## TODO

* Use the Web Animation API to animate the level preview entities instead of CSS animations & sagas in order to simplify and improve the formance of the previewer
* Performance optimisations to the level solver
* Have the level solver find all possible solutions for a level instead of just finding the quickest solution each time
* Add server-side rendering to the React frontend
* Add missing tests
* Stop using dev servers for production builds...