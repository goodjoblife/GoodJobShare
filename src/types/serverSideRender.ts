import { Dispatch, GetState } from 'reducers';
import { match } from 'react-router-dom';

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
  }: {
    store: Store;
    match: match<Params>;
  }) => Promise<unknown>;
}
