import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import {
  ExperienceType,
  InterviewExperience,
  WorkExperience,
} from 'apis/experience';
import { RootState } from 'reducers';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import FetchBox from 'utils/fetchBox';

type Experience = WorkExperience | InterviewExperience;

// 列表 box 內的經驗以 state.experience 為準（source of truth），
// 讓編輯/刪除等操作後列表能顯示最新資料，而不必重抓列表
const useBoxWithLatestExperiences = <
  T extends ExperienceType,
  K extends string,
  R extends { [P in K]: Extract<Experience, { type: T }>[] }
>(
  box: FetchBox<R | null>,
  key: K,
  type: T,
): FetchBox<R | null> => {
  type E = Extract<Experience, { type: T }>;
  // experienceById 涵蓋所有經驗型別，用 type 判別後才能換成快取內的版本
  const isExperienceOfType = (e: Experience): e is E => e.type === type;

  const data = box.data;
  const experiences: E[] | null = data ? data[key] : null;

  // 逐筆比較參照，store 沒變就回傳同一個陣列內容，避免多餘 re-render
  const latest = useSelector(
    (state: RootState): E[] | null =>
      experiences
        ? experiences.map(e => {
            const cached = experienceBoxSelectorAtId(e.id)(state).data;
            return cached && isExperienceOfType(cached) ? cached : e;
          })
        : null,
    shallowEqual,
  );

  return useMemo(
    () => (data && latest ? { ...box, data: { ...data, [key]: latest } } : box),
    [box, data, latest, key],
  );
};

export default useBoxWithLatestExperiences;
