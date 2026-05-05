import { match } from 'react-router-dom';
import { Location } from 'history';
import qs from 'qs';

// RouteProps is the parameter injected from server.js fetchData
// It is used in SSR with static fetchData method
type RouteProps<
  Params extends Record<string, string> = Record<string, string>
> = {
  match?: match<Params>;
  location?: Location;
};

export const pathSelector = ({ match }: RouteProps): string | undefined =>
  match && match.path;

export const paramsSelector = <Params extends Record<string, string>>({
  match,
}: RouteProps<Params>): Params | undefined => match && match.params;

export const pathnameSelector = ({
  location,
}: RouteProps): string | undefined => location && location.pathname;

export const searchSelector = ({ location }: RouteProps): string | undefined =>
  location && location.search;

// props --> query object
export const querySelector = (props: RouteProps): qs.ParsedQs =>
  qs.parse(searchSelector(props) || '', { ignoreQueryPrefix: true });
