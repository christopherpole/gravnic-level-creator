import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import Layout from './components/layout';

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout />
  </ThemeProvider>
);

export default App;
