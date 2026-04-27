# GoodJobShare

GoodJobShare is the frontend of GoodJob's workplace transparency movement — an anonymous sharing platform for salary, working hours, and interview experience.

## Dev Commands

```bash
yarn install        # install dependencies
npm run start       # dev mode (localhost:3000)
npm run build       # production build
npm run test        # lint + stylelint + unit tests
npm run testonly    # unit tests only
```

## Tech Stack

- React (SSR via Razzle)
- TypeScript (some files still in JS, gradually migrating)
- GraphQL (via `graphqlClient` to call the backend)
- CSS Modules

## Convention

### API Layer

`src/apis/` contains all API calls to the backend. When writing or modifying API-related code, follow the TypeScript typing guidelines in [src/apis/README.md](src/apis/README.md).
