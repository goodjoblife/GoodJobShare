import { Dispatch, GetState } from 'reducers';
import { match } from 'react-router-dom';
import { Location } from 'history';

interface Store {
  dispatch: Dispatch;
  getState: GetState;
}

export interface ServerSideRender<
  Params extends { [K in keyof Params]?: string } = {}
> {
  fetchData: ({
    store,
    match,
    location,
  }: {
    store: Store;
    match: match<Params>;
    location: Location;
  }) => Promise<unknown>;
}
