import { Location } from 'history';
import { match } from 'react-router-dom';

import { Dispatch, GetState } from 'reducers';

interface Store {
  dispatch: Dispatch;
  getState: GetState;
}

export interface ServerSideRender<
  Params extends { [K in keyof Params]?: string } = Record<string, never>
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
