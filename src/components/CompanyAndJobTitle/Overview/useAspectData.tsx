import { useSelector } from 'react-redux';
import { Aspect, aspectTranslation } from 'constants/companyJobTitle';
import { companyWorkExperiencesAspectStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import FetchBox, { isFetched } from 'utils/fetchBox';

interface CompanyAspectRatingStatistic {
  aspect: string;
  averageRating: number;
  ratingCount: number;
}

interface AspectStatisticsData {
  companyAspectRatingStatistics: CompanyAspectRatingStatistic[];
}

const useAspectData = ({
  companyName,
  aspect,
}: {
  companyName: string;
  aspect: Aspect;
}) => {
  const box = useSelector(
    companyWorkExperiencesAspectStatisticsBoxSelectorByName(companyName),
  ) as FetchBox<AspectStatisticsData>;

  if (!isFetched(box) || !box.data) return null;

  const stat = box.data.companyAspectRatingStatistics.find(
    item => item.aspect === aspectTranslation[aspect],
  );
  return stat;
};

export default useAspectData;
