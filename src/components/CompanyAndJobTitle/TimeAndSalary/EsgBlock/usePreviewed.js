import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import useCompanyName from 'pages/Company/useCompanyName';

const useYear = () => useMemo(() => new Date().getFullYear(), []);

const usePreviewedYearByPageName = () =>
  useLocalStorage('esgPreviewedYearByPageName', {}, false);

const usePreviewed = () => {
  const companyName = useCompanyName();
  const year = useYear();

  const [
    previewedYearByPageName,
    setPreviewedYearByPageName,
  ] = usePreviewedYearByPageName();

  const hasPreviewed = useMemo(
    () => previewedYearByPageName[companyName] === year,
    [previewedYearByPageName, companyName, year],
  );

  const setPreviewed = useCallback(
    previewed => {
      const copy = {
        ...previewedYearByPageName,
      };
      if (previewed) {
        copy[companyName] = year;
      } else {
        delete copy[companyName];
      }
      setPreviewedYearByPageName(copy);
    },
    [companyName, previewedYearByPageName, setPreviewedYearByPageName, year],
  );

  return [hasPreviewed, setPreviewed];
};

export default usePreviewed;
