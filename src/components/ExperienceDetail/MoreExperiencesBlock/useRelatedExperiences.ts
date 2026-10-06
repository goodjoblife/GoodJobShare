import { useCallback, useEffect } from 'react';

import queryExperienceRecommendation, {
  AlgoId,
  InterviewExperienceInRelatedExperiences,
  WorkExperienceInRelatedExperiences,
} from 'apis/queryExperienceRecommendation';
import useAsyncBoxFn from 'hooks/useAsyncBoxFn';
import FetchBox, { isFetching } from 'utils/fetchBox';

const PAGE_SIZE = 5;

type RelatedExperience =
  | WorkExperienceInRelatedExperiences
  | InterviewExperienceInRelatedExperiences;

type RelatedExperiences = {
  experiences: RelatedExperience[];
  page: number;
  hasMore: boolean;
};

const useRelatedExperiences = (
  experienceId: string,
): readonly [FetchBox<RelatedExperiences>, () => void] => {
  const [box, fetchPage] = useAsyncBoxFn(
    async (
      page: number,
      prev: RelatedExperience[],
    ): Promise<RelatedExperiences> => {
      const experiences = await queryExperienceRecommendation({
        id: experienceId,
        start: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        algoId: AlgoId.LATEST_EXPERIENCE_OF_SAME_COMPANY_OR_JOB_TITLE,
      });

      return {
        experiences: [...prev, ...experiences],
        page,
        hasMore: experiences.length >= PAGE_SIZE,
      };
    },
    [experienceId],
  );

  useEffect(() => {
    fetchPage(0, []);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (isFetching(box) || !box.data) {
      return;
    }
    fetchPage(box.data.page + 1, box.data.experiences);
  }, [box, fetchPage]);

  return [box, loadMore] as const;
};

export default useRelatedExperiences;
