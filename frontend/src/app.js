import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import Layout from 'common/layout';
import store from './store';
import theme from './theme';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </Provider>
);

export default App;
