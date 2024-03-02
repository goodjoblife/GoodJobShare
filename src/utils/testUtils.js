/**
 * 把 global 的 providers 引進來，讓 React-Testing-Library 在 render
 * component 時，可以正常運作
 * 這些 providers 由 src/client.js 取得
 *
 * Note:
 *  1. 之所以不直接把 client.js 裡面的 providers 都取出來，是因為目前測試套件沒
 *     有實作 window 的 scroll 功能，引入會導致測試跳大量警告訊息
 */

import React from 'react';
import { createMemoryHistory as createHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { render } from '@testing-library/react';
import configureStore from '../store/configureStore';

const history = createHistory();
const store = configureStore({}, history);
const persistor = persistStore(store);

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>{children}</Router>
      </PersistGate>
    </Provider>
  );
};

export const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });
