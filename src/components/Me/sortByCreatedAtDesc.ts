type WithCreatedAt = {
  createdAt: string;
};

// 每一種資料後端各自已經是新的在前，但混在同一串列裡就得重排一次。
// Array#sort 是穩定的，所以同一個時間的資料會維持傳進來的先後順序。
export const sortByCreatedAtDesc = <T extends WithCreatedAt>(items: T[]): T[] =>
  [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
