import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import ThemeProvider from './providers/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
