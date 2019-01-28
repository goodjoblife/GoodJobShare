import 'isomorphic-fetch';

import { getToken } from 'utils/tokenUtil';
import { HttpError } from 'utils/errors';

import { API_HOST } from '../config';

const headerBuilder = token =>
  token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };

const removeContentType = headers => {
  const {
    'Content-Type': contentType, // eslint-disable-line no-unused-vars
    ...rest
  } = headers;

  return rest;
};

const optionsBuilder = ({ body, method, token }) =>
  body
    ? {
        method: method.toUpperCase(),
        headers: headerBuilder(token),
        body: JSON.stringify(body),
      }
    : {
        method: method.toUpperCase(),
        headers: removeContentType(headerBuilder(token)),
      };

const checkStatus = response => {
  if (!response.ok) {
    return response.json().then(json => {
      throw new HttpError(json.message, {
        statusCode: response.status,
      });
    });
  }
  return response.json();
};

const defaultOptions = {
  apiHost: API_HOST,
  token: null,
};

const fetchUtil = (endpoint, options) => (method, body) => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
    // FIXME: workaround before get it from store
    token: getToken(),
  };

  const { token, apiHost } = finalOptions;

  return fetch(
    `${apiHost}${endpoint}`,
    optionsBuilder({
      token,
      body,
      method,
    }),
  ).then(checkStatus);
};

export default fetchUtil;
