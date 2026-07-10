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
- **`src/apis/`** contains all API calls to the backend. When writing or modifying API-related code, follow the TypeScript typing guidelines in [docs/apis.md](docs/apis.md).

- **`src/pages/Company/`**, **`src/pages/JobTitle/`** and **`src/components/CompanyAndJobTitle/`** 
See [docs/company-and-job-title.md](docs/company-and-job-title.md) for the full architecture convention of these three directories.

### React Components

For component naming, file naming, and `index.ts` usage conventions, see [docs/component-conventions.md](docs/component-conventions.md).

### TypeScript Types

For type definition conventions (`type` vs `interface`, where types live, nullable fields, enums, `unknown` placeholders), see [docs/typescript-types.md](docs/typescript-types.md).

### TypeForm 與 Question

體驗分享彈窗表單（薪資、評價、面試、制度…）的架構、question creator 寫法、QUESTION_TYPE 對照，以及兩種複合清單題型的 data shape 與 option config，見 [docs/typeform-questions.md](docs/typeform-questions.md)。

### Server-Side Rendering (SSR) with `fetchData`

Pages that need SSR data fetching attach a static `fetchData` method to the component. See [docs/ssr-fetch-data.md](docs/ssr-fetch-data.md).
