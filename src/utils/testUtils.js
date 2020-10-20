/**
 * 提供 React-Testing-Library 一個盡可能與實際環境相同的環境
 * 這些 Wrapper 由 src/client.js 取得
 *
 * Note:
 *  1. 之所以不直接把 client.js 裡面的 providers 都取出來，是因為目前測試套件沒
 *     有實作 window 的 scroll 功能，會導致測試跳大量警告訊息
 */

import React from 'react';
import { createBrowserHistory as createHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { render } from '@testing-library/react';
import configureStore from '../store/configureStore';

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>{children}</Router>
      </PersistGate>
    </Provider>
  );
};

const history = createHistory();
const store = configureStore({}, history);
const persistor = persistStore(store);

export const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });
