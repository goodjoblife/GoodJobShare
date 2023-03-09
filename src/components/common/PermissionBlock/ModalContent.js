import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import P from 'common/base/P';
import { Heading } from 'common/base';
import {
  experienceCountSelector,
  timeAndSalaryCountSelector,
} from 'selectors/countSelector';
import { queryExperienceCountIfUnfetched } from 'actions/experiences';
import { queryTimeAndSalaryCountIfUnfetched } from 'actions/timeAndSalary';
import styles from './PermissionBlock.module.css';

const ModalContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceCountIfUnfetched());
    dispatch(queryTimeAndSalaryCountIfUnfetched());
  }, [dispatch]);

  const experienceCount = useSelector(experienceCountSelector);
  const timeAndSalaryCount = useSelector(timeAndSalaryCountSelector);

  return (
    <React.Fragment>
      <div className={styles.headingContainer}>
        <FontAwesomeIcon icon={faLock} className={styles.headingIcon} />
        <Heading size="sl" Tag="h3">
          留下一筆資料，馬上解鎖全站資料
        </Heading>
      </div>
      <P size="l" className={styles.ctaText}>
        解鎖全站共{' '}
        <strong>{timeAndSalaryCount + experienceCount} 筆薪資、面試資料</strong>
        。若你已經留過資料，登入即可查看全文！
      </P>
    </React.Fragment>
  );
};

export default ModalContent;
