# src/apis/ TypeScript Typing Guidelines

## 1. File Structure: One File per API

Each API function lives in its own `.ts` file, named after the function:

```
src/apis/queryCompanyOverview.ts
src/apis/queryCompanyRatingStatistics.ts
src/apis/queryCompanyOverviewStatistics.ts
```

Each file contains three parts (in order):

1. GraphQL query string (not exported — file-private)
2. Response data type (optionally exported depending on external use)
3. API function (default export)

## 2. GraphQL String Naming

Use the `/* GraphQL */` template tag. Name the variable `const <functionName>Gql`, and do not export it:

```ts
const queryCompanyOverviewGql = /* GraphQL */ `
  query(...) { ... }
`;
```

## 3. Response Data Type Naming

Name it `type Query<FunctionName>Data`, **do not export** it. The structure should match the full GraphQL response (including top-level keys such as `company`):

```ts
type QueryCompanyOverviewData = {
  company: (Company & {
    salaryWorkTimesResult: { ... };
  }) | null;
};
```

## 4. `graphqlClient` Generic Annotation

Pass the full response type as the generic argument, then use `.then` to extract the desired field:

```ts
graphqlClient<QueryCompanyOverviewData>({
  query: queryCompanyOverviewGql,
  variables: { ... },
}).then(R.prop('company'));
```

## 5. Function Type Annotations

Annotate parameters with an inline object type. Write the return type as `Promise<QueryXxxData['company']>`:

```ts
const queryCompanyOverview = ({
  companyName,
  interviewExperiencesLimit,
}: {
  companyName: string;
  interviewExperiencesLimit: number;
}): Promise<QueryCompanyOverviewData['company']> => ...
```

## 6. Nullable Fields

Fields that may be null should use `T | null` (not `?:`, because GraphQL nullable fields are always present in the response). When the top-level entity does not exist, the whole object is `null`:

```ts
type QueryCompanyRatingStatisticsData = {
  company: (Company & {
    companyRatingStatistics: RatingStatistics | null;
  }) | null;
};
```

## 7. Shared Types and Fragments

If multiple APIs share the same GraphQL fragment and corresponding type, extract them into a domain-named file (e.g. `overview.ts`, `salaryWorkTime.ts`).

The fragment string and its corresponding type must be **defined in the same file** to make them easy to compare. Add a `// Must be the same as fragment` comment:

```ts
export const fragmentWorkExperienceFields = /* GraphQL */ `
  fragment workExperienceFields on WorkExperience { ... }
`;

// Must be the same as fragment
export type WorkExperienceInOverview = { ... };
```

## 8. Export Rules

| Item | Export Strategy |
|---|---|
| API function | `export default` |
| Response data type (`QueryXxxData`) | **do not export** |
| GQL string | **do not export** |
| Shared types (e.g. `SalaryWorkTime`) | named export |
| Fragment string | named export |
| Base entity type (e.g. `Company`) | named export |
