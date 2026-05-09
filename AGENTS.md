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

### Directory Structure

- **`src/pages/`** — route-level (page) components. If a component is directly mounted by a route in `src/routes.js`, it belongs here, not inside `src/components/`.
- **`src/components/`** — reusable UI components, organized by domain (e.g. `CompanyAndJobTitle/`, `SalaryWorkTime/`). A component's location and name should reflect its actual domain, not where it was first created. Rename and move when reuse expands beyond the original context.
`src/apis/` contains all API calls to the backend. When writing or modifying API-related code, follow the TypeScript typing guidelines in [src/apis/README.md](src/apis/README.md).
