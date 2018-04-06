import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const appContainer = document.getElementById('app');

ReactDOM.render(<App />, appContainer);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(<NextApp />, appContainer);
  });
}
