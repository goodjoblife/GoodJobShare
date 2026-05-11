# SSR `fetchData` Convention

Pages that need SSR data fetching attach a static `fetchData` method to the component.

## Key files

- `src/types/serverSideRender.ts` — `ServerSideRender<Params>` interface

## Conventions

### 1. Typing the component

Define a `Params` type for the URL params, then intersect `React.FC` with `ServerSideRender<Params>`:

```tsx
import { ServerSideRender } from 'types/serverSideRender';

type Params = {
  companyName: string;
  aspect: string;
};

const MyProvider: React.FC & ServerSideRender<Params> = () => {
  // render
};
```

### 2. Writing `fetchData`

Destructure `store: { dispatch }` and spread the rest as `props`. Use routing selectors on `props` to extract URL params and query string. Return `Promise<unknown>`.

```tsx
MyProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const query = querySelector(props);
  // derive values from params/query, then dispatch
  return dispatch(someAction(...));
};
```

### 3. Routing selectors

Selectors from `common/routing/selectors` (`paramsSelector`, `querySelector`, etc.) must **only** be called inside `fetchData`. They depend on `match` and `location` injected by the SSR framework, which are not available during client-side rendering.

In components, use React Router hooks instead:

| Selector | Hook equivalent |
|---|---|
| `paramsSelector` | `useParams()` |
| `pathnameSelector` / `searchSelector` | `useLocation()` |
| `querySelector` | `useLocation()` + `qs.parse()` |
| `pathSelector` | `useRouteMatch()` |
