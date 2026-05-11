import { match } from 'react-router-dom';
import { Location } from 'history';
import qs from 'qs';

// RouteProps is the parameter injected from server.js fetchData.
// It is used in SSR with the static fetchData method.
//
// IMPORTANT: Selectors in this file must ONLY be called inside fetchData.
// They depend on `match` and `location` being injected by the SSR framework,
// which only happens in that context.
// In components, use React Router hooks instead:
//   - useParams()    instead of paramsSelector
//   - useLocation()  instead of pathnameSelector / searchSelector / querySelector
//   - useRouteMatch() instead of pathSelector
type RouteProps<
  Params extends Record<string, string> = Record<string, string>
> = {
  match: match<Params>;
  location: Location;
};

export const pathSelector = ({ match }: RouteProps): string | undefined =>
  match && match.path;

export const paramsSelector = <Params extends Record<string, string>>({
  match,
}: RouteProps<Params>): Params => match && match.params;

export const pathnameSelector = ({
  location,
}: RouteProps): string | undefined => location && location.pathname;

export const searchSelector = ({ location }: RouteProps): string | undefined =>
  location && location.search;

// props --> query object
export const querySelector = (props: RouteProps): qs.ParsedQs =>
  qs.parse(searchSelector(props) || '', { ignoreQueryPrefix: true });
