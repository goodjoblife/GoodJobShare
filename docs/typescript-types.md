# TypeScript Type Definition Conventions

## `type` vs `interface`

Use `type` by default for object shapes. Use `interface` only when the type is explicitly designed to be extended or implemented:

```ts
// ✓ object shapes
type State = { ... };
export type CompanyOverview = { ... };

// ✓ interface when extension is the intent
export interface ServerSideRender<Params> { fetchData: ... }
export interface Thunk<A extends Action> { ... }
```

## Where types live

Listed by priority — prefer the first location that fits:

1. **`src/apis/<domain>.ts`** — shared types extracted from GraphQL fragments
2. **`src/reducers/<slice>.ts`** — exported types that represent what is stored in Redux after the reducer flattens/transforms the API response; consumed by selectors and components. `type State` itself is always file-private; the whole state shape is exposed via `RootState` in `reducers/index.ts`. If the stored type can be imported directly from `src/apis/`, prefer importing over redefining.
3. **`src/constants/`** — enums and their associated lookup maps
4. **`src/types/`** — cross-cutting types (e.g. `ServerSideRender`)

For API-specific rules see [src/apis/README.md](../src/apis/README.md).

## Enums

Use for discrete string-valued constant groups that need to be used as both values and types:

```ts
export enum Aspect {
  GENDER = '性別友善度',
  WORK_LIFE_BALANCE = '工作與生活平衡',
  ...
}
```

## Nullable fields

Use `T | null`, not `?: T`. GraphQL nullable fields are always present in the response, never absent:

```ts
// ✓
salary: { amount: number; type: string } | null;

// ✗
salary?: { amount: number; type: string };
```

## `unknown` placeholders

Unresolved types are temporarily typed as `unknown` with a TODO. Replace them as the data shape becomes clear:

```ts
// TODO: replace with proper CompanyInIndex type
export type CompanyInIndex = unknown;
```
