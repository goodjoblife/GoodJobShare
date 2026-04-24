# src/apis/ TypeScript 類型 Coding 準則

## 1. 檔案結構：每隻 API 獨立一個檔案

每支 API function 獨立成一個 `.ts` 檔，檔名與 function 名稱一致：

```
src/apis/queryCompanyOverview.ts
src/apis/queryCompanyRatingStatistics.ts
src/apis/queryCompanyOverviewStatistics.ts
```

每個檔案包含三個部分（依序）：

1. GraphQL query 字串（不 export，為 file-private）
2. Response data type（export optional，根據外部是否需要決定）
3. API function（default export）

## 2. GraphQL 字串命名

使用 `/* GraphQL */` template tag，命名為 `const <functionName>Gql`，不 export：

```ts
const queryCompanyOverviewGql = /* GraphQL */ `
  query(...) { ... }
`;
```

## 3. Response Data Type 命名

命名為 `type Query<FunctionName>Data`，**不 export**，結構對應完整 GraphQL response（包含最外層的 key，如 `company`）：

```ts
type QueryCompanyOverviewData = {
  company: (Company & {
    salaryWorkTimesResult: { ... };
  }) | null;
};
```

## 4. `graphqlClient` 泛型標注

呼叫時帶入完整 response type，再用 `.then` 取出所需欄位：

```ts
graphqlClient<QueryCompanyOverviewData>({
  query: queryCompanyOverviewGql,
  variables: { ... },
}).then(R.prop('company'));
```

## 5. Function 的型別標注

參數以 inline object type 標注，回傳型別寫 `Promise<QueryXxxData['company']>`：

```ts
const queryCompanyOverview = ({
  companyName,
  interviewExperiencesLimit,
}: {
  companyName: string;
  interviewExperiencesLimit: number;
}): Promise<QueryCompanyOverviewData['company']> => ...
```

## 6. Nullable 欄位

可能為 null 的欄位用 `T | null` 標注（因為 graphql，所以不是 `?:`），頂層 entity 不存在時，整個物件為 `null`：

```ts
type QueryCompanyRatingStatisticsData = {
  company: (Company & {
    companyRatingStatistics: RatingStatistics | null;
  }) | null;
};
```

## 7. 共用 Type 與 Fragment 的規則

若多支 API 共用同一 GraphQL fragment 與對應 type，獨立放到 domain 命名的檔案（如 `overview.ts`、`salaryWorkTime.ts`）。

Fragment 字串與對應 type 必須**同檔定義**，確保兩者容易比對，並加上 `// Must be the same as fragment` 註解：

```ts
export const fragmentWorkExperienceFields = /* GraphQL */ `
  fragment workExperienceFields on WorkExperience { ... }
`;

// Must be the same as fragment
export type WorkExperienceInOverview = { ... };
```

## 8. Export 規則

| 項目 | Export 策略 |
|---|---|
| API function | `export default` |
| Response data type（`QueryXxxData`）| **不 export** |
| GQL 字串 | **不 export** |
| 共用 type（`SalaryWorkTime` 等）| named export |
| Fragment 字串 | named export |
| Base entity type（如 `Company`）| named export |
