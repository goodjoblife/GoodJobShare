import 'whatwg-fetch';

import { getToken } from 'utils/tokenUtil';

const API_BASE_URL = process.env.APIHOST || 'http://127.0.0.1:12000';

const headerBuilder = token => (
  token ?
  {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  } :
  {}
);

const optionsBuilder = body => method => (
  body ?
  {
    method: method.toUpperCase(),
    headers: headerBuilder(getToken()),
    body: JSON.stringify(body),
  } :
  {
    method: method.toUpperCase(),
    headers: headerBuilder(getToken()),
  }
);

const checkStatus = handle401 => response => {
  if (response.status === 401) {
    return handle401();
  }

  return response.json();
};

const fetchUtil = endpoint => (method, body) =>
  fetch(
    `${API_BASE_URL}${endpoint}`,
    optionsBuilder(body)(method)
  )
    .then(checkStatus());

export default fetchUtil;
