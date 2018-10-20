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
    : {};

const removeContentType = headers => {
  const {
    'Content-Type': contentType, // eslint-disable-line no-unused-vars
    ...rest
  } = headers;

  return rest;
};

const optionsBuilder = body => method =>
  body
    ? {
        method: method.toUpperCase(),
        headers: headerBuilder(getToken()),
        body: JSON.stringify(body),
      }
    : {
        method: method.toUpperCase(),
        headers: removeContentType(headerBuilder(getToken())),
      };

const checkStatus = response => {
  if (!response.ok) {
    return response.json().then(json => {
      throw new HttpError({
        message: json.message,
        statusCode: response.status,
      });
    });
  }
  return response.json();
};

const fetchUtil = (endpoint, apiHost = API_HOST) => (method, body) =>
  fetch(`${apiHost}${endpoint}`, optionsBuilder(body)(method)).then(
    checkStatus
  );

export default fetchUtil;
