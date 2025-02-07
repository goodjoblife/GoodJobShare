import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { usePageName } from 'pages/Company/usePageName';

const useYear = () => useMemo(() => new Date().getFullYear(), []);

const usePreviewedYearByPageName = () =>
  useLocalStorage('esgPreviewedYearByPageName', {}, false);

const usePreviewed = () => {
  const pageName = usePageName();
  const year = useYear();

  const [
    previewedYearByPageName,
    setPreviewedYearByPageName,
  ] = usePreviewedYearByPageName();

  const hasPreviewed = useMemo(
    () => previewedYearByPageName[pageName] === year,
    [previewedYearByPageName, pageName, year],
  );

  const setPreviewed = useCallback(
    previewed => {
      const copy = {
        ...previewedYearByPageName,
      };
      if (previewed) {
        copy[pageName] = year;
      } else {
        delete copy[pageName];
      }
      setPreviewedYearByPageName(copy);
    },
    [pageName, previewedYearByPageName, setPreviewedYearByPageName, year],
  );

  return [hasPreviewed, setPreviewed];
};

export default usePreviewed;
