import qs from 'qs';
import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { P } from 'common/base';
import ArrowLeft from 'common/icons/ArrowLeft';
import { useQuery } from 'hooks/routing';
import useSectionY from 'hooks/useSectionY';

import {
  getCurrentCount,
  getFromCount,
  getToCount,
  getTotalPage,
  isNextDisabled,
  isPreviousDisabled,
} from './helpers';
import styles from './Pagination.module.css';

export const useCreatePageLinkTo = (): readonly [
  (
    p: number,
  ) => { pathname: string; search: string; state: { y: number | null } },
  React.RefObject<HTMLElement | null>,
  number | null,
] => {
  const location = useLocation();
  const queryParams = useQuery();
  const [y, handleSectionRef] = useSectionY();

  const createPageLinkTo = useCallback(
    (p: number) => {
      const pathname = location.pathname;
      const search = qs.stringify(
        { ...queryParams, p },
        { addQueryPrefix: true },
      );
      return {
        pathname,
        search,
        state: { y },
      };
    },
    [y, queryParams, location.pathname],
  );

  return [createPageLinkTo, handleSectionRef, y] as const;
};

type Props = {
  createPageLinkTo: (p: number) => object;
  currentPage?: number;
  totalCount?: number;
  unit?: number;
};

const Pagination = ({
  totalCount,
  unit,
  currentPage,
  createPageLinkTo,
}: Props): React.ReactElement | null => {
  const totalPage = getTotalPage(totalCount, unit);
  const currentCount = getCurrentCount(totalCount, unit, currentPage);

  if (totalCount === 0) return null;
  return (
    <div className={styles.pagination}>
      <P size="m" className={styles.info}>
        {`${getFromCount(currentPage, unit)}-${getToCount(
          currentPage,
          unit,
          currentCount,
        )} 篇 (共 ${totalCount} 篇)`}
      </P>
      <div className={styles.buttons}>
        <Link className="buttonFirstPage" to={createPageLinkTo(1)}>
          最前頁
        </Link>
        {isPreviousDisabled(currentPage) ? (
          <div className="buttonPage" aria-disabled>
            <ArrowLeft />
            前一頁
          </div>
        ) : (
          <Link
            className="buttonPage"
            to={createPageLinkTo((currentPage || 1) - 1)}
          >
            <ArrowLeft />
            前一頁
          </Link>
        )}
        {isNextDisabled(currentPage, totalPage) ? (
          <div className="buttonPage" aria-disabled>
            下一頁
            <ArrowLeft style={{ transform: 'scaleX(-1)' }} />
          </div>
        ) : (
          <Link
            className="buttonPage"
            to={createPageLinkTo((currentPage || 1) + 1)}
          >
            下一頁
            <ArrowLeft style={{ transform: 'scaleX(-1)' }} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
