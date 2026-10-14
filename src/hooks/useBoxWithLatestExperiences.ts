import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import FetchBox from 'utils/fetchBox';

// 列表 box 內的經驗以 state.experience 為準（source of truth），
// 讓編輯/刪除等操作後列表能顯示最新資料，而不必重抓列表
const useBoxWithLatestExperiences = <
  K extends string,
  E extends { id: string },
  T extends { [P in K]: E[] }
>(
  box: FetchBox<T | null>,
  key: K,
): FetchBox<T | null> => {
  const data = box.data;
  const experiences: E[] | null = data ? data[key] : null;

  // 逐筆比較參照，store 沒變時回傳同一個陣列內容，避免多餘 re-render
  const latest = useSelector(
    (state: RootState): E[] | null =>
      experiences
        ? experiences.map(
            e =>
              ((experienceBoxSelectorAtId(e.id)(state).data as unknown) as E) ||
              e,
          )
        : null,
    shallowEqual,
  );

  return useMemo(
    () => (data && latest ? { ...box, data: { ...data, [key]: latest } } : box),
    [box, data, latest, key],
  );
};

export default useBoxWithLatestExperiences;
