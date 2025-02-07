import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { usePageName } from 'pages/Company/usePageName';

const useYear = () => useMemo(() => new Date().getFullYear(), []);

const usePreviewedYearByCopmanyName = () =>
  useLocalStorage('esgPreviewedYearByCopmanyName', {}, false);

const usePreviewed = () => {
  const companyName = usePageName();
  const year = useYear();

  const [
    previewedYearByCompanyName,
    setPreviewedYearByCompanyName,
  ] = usePreviewedYearByCopmanyName();

  const hasPreviewed = useMemo(
    () => previewedYearByCompanyName[companyName] === year,
    [previewedYearByCompanyName, companyName, year],
  );

  const setPreviewed = useCallback(
    previewed => {
      const copy = {
        ...previewedYearByCompanyName,
      };
      if (previewed) {
        copy[companyName] = year;
      } else {
        delete copy[companyName];
      }
      setPreviewedYearByCompanyName(copy);
    },
    [
      companyName,
      previewedYearByCompanyName,
      setPreviewedYearByCompanyName,
      year,
    ],
  );

  return [hasPreviewed, setPreviewed];
};

export default usePreviewed;
