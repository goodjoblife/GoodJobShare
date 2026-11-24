import 'isomorphic-fetch';
import { GraphqlError, HttpError } from 'utils/errors';
import getServerApiHost from 'utils/serverApiHost';

// 瀏覽器用同網域相對路徑（免 CORS preflight）；SSR 的 fetch 不接受相對路徑，直接打後端。
const getGraphqlUrl = (): string =>
  process.env.BUILD_TARGET === 'server'
    ? `${getServerApiHost()}/graphql`
    : '/graphql';

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

  const response = await fetch(getGraphqlUrl(), {
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
