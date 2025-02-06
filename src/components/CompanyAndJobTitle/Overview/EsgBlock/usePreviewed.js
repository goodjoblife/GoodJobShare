import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePageName } from 'pages/Company/usePageName';

const usePreviewedYearByCopmanyName = () => {
  const key = 'esgPreviewedYearByCopmanyName';

  const getPersistedYearByCompanyName = useCallback(() => {
    try {
      let rawValue = localStorage.getItem(key);
      const yearByCompanyName = JSON.parse(rawValue);
      if (!yearByCompanyName) return {};
      return yearByCompanyName;
    } catch (error) {
      return {};
    }
  }, []);

  const setPersistedYearByCompanyName = useCallback(yearByCompanyName => {
    const rawValue = JSON.stringify(yearByCompanyName);
    localStorage.setItem(key, rawValue);
  }, []);

  const [yearByCompanyName, setYearByCompanyName] = useState(
    getPersistedYearByCompanyName(),
  );
  useEffect(() => {
    setPersistedYearByCompanyName(yearByCompanyName);
  }, [yearByCompanyName, setPersistedYearByCompanyName]);
  return [yearByCompanyName, setYearByCompanyName];
};

const useYear = () => useMemo(() => new Date().getFullYear(), []);

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
