import 'isomorphic-fetch';

import { getToken } from 'utils/tokenUtil';

import { API_HOST } from '../config';

const headerBuilder = token => (
  token ?
  {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  } :
  {}
);

const removeContentType = headers => {
  const {
    'Content-Type': contentType, // eslint-disable-line no-unused-vars
    ...rest
  } = headers;

  return rest;
};

const optionsBuilder = body => method => (
  body ?
  {
    method: method.toUpperCase(),
    headers: headerBuilder(getToken()),
    body: JSON.stringify(body),
  } :
  {
    method: method.toUpperCase(),
    headers: removeContentType(headerBuilder(getToken())),
  }
);

const checkStatus = handle401 => response => {
  if (response.status === 401) {
    return handle401();
  }

  if (String(response.status)[0] !== 2) {
    return response.json()
      .then(json => Promise.reject(json));
  }

  return response.json();
};

const fetchUtil = endpoint => (method, body) =>
  fetch(
    `${API_HOST}${endpoint}`,
    optionsBuilder(body)(method)
  )
    .then(checkStatus());

export default fetchUtil;
