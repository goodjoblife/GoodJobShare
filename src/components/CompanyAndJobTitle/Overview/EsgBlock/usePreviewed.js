import { useCallback, useMemo } from 'react';
import { usePageName } from 'pages/Company/usePageName';
import { useLocalStorage } from 'react-use';

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
    () => (previewedYearByCompanyName[companyName] || false) === year,
    [previewedYearByCompanyName, companyName, year],
  );

  const setPreviewed = useCallback(
    Previewed => {
      const copy = {
        ...previewedYearByCompanyName,
      };
      if (Previewed) {
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
