import 'isomorphic-fetch';
import { API_HOST } from 'config';
import { GraphqlError, HttpError } from 'utils/errors';

type GraphqlClientArgs = {
  query: string;
  variables?: unknown;
  token?: string;
};

const graphqlClient = async <T>({
  variables,
  query,
  token,
}: GraphqlClientArgs): Promise<T> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_HOST}/graphql`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const apiResponse = await response.json();
    throw new HttpError(apiResponse.message, {
      statusCode: response.status,
    });
  }

  const apiResponse = await response.json();

  if (apiResponse.errors) {
    throw new GraphqlError(apiResponse.errors);
  }
  return apiResponse.data;
};

export default graphqlClient;
