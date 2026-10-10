import React from 'react';
import { useSelector } from 'react-redux';
import { generatePath } from 'react-router';

import {
  TabType,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';
import {
  companyFamilyChildcareFamilyCareLeave,
  companyFamilyChildcareFlexibleHoursPath,
  companyFamilyChildcareParentalLeavePath,
  companyFamilyChildcareRemoteWorkPath,
} from 'constants/linkTo';
import { companyPolicyReviewStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

import {
  FAMILY_CARE_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  FAMILY_CARE_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
  FLEXIBLE_HOURS_AVAILABILITY_BULLET_BY_LABEL,
  PARENTAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  PARENTAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
  REMOTE_WORK_AVAILABILITY_BULLET_BY_LABEL,
  REMOTE_WORK_FREQUENCY_BULLET_BY_LABEL,
} from '../constants';
import familyCareLeaveIcon from '../familyCareLeaveIcon.svg';
import flexibleHoursIcon from '../flexibleHoursIcon.svg';
import { useCompanyName } from '../PageContextProvider';
import parentalLeaveIcon from '../parentalLeaveIcon.svg';
import { toFamilyChildcareData } from '../policyReviewStatistics';
import PolicySummaryCard from '../PolicySummaryCard';
import remoteWorkIcon from '../remoteWorkIcon.svg';
import SnippetBlock from '../SnippetBlock';
import styles from './PolicySnippetBlock.module.css';

const FamilyChildcareSnippetBlock: React.FC = () => {
  const companyName = useCompanyName();
  const box = useSelector(
    companyPolicyReviewStatisticsBoxSelectorByName(companyName),
  );
  if (!isFetched(box)) return null;

  const {
    parentalLeave,
    familyCareLeave,
    flexibleHours,
    remoteWork,
  } = toFamilyChildcareData(box.data);
  const flexibleHoursSection = {
    dataCount: flexibleHours.dataCount,
    availability: flexibleHours,
  };
  const isEmpty = [
    parentalLeave,
    familyCareLeave,
    flexibleHoursSection,
    remoteWork,
  ].every(section => section.dataCount === 0);

  return (
    <SnippetBlock
      title={TAB_TYPE_DETAIL_TRANSLATION[TabType.FAMILY_CHILDCARE]}
      isEmpty={isEmpty}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
    >
      <div className={styles.grid}>
        {parentalLeave.dataCount > 0 && (
          <PolicySummaryCard
            className={styles.card}
            title="育嬰假(育嬰留職停薪)"
            icon={parentalLeaveIcon}
            availabilityBulletByLabel={
              PARENTAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL
            }
            complianceBulletByLabel={PARENTAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL}
            section={parentalLeave}
            linkTo={generatePath(companyFamilyChildcareParentalLeavePath, {
              companyName,
            })}
          />
        )}
        {familyCareLeave.dataCount > 0 && (
          <PolicySummaryCard
            className={styles.card}
            title="家庭照顧假"
            icon={familyCareLeaveIcon}
            availabilityBulletByLabel={
              FAMILY_CARE_LEAVE_AVAILABILITY_BULLET_BY_LABEL
            }
            complianceBulletByLabel={
              FAMILY_CARE_LEAVE_COMPLIANCE_BULLET_BY_LABEL
            }
            section={familyCareLeave}
            linkTo={generatePath(companyFamilyChildcareFamilyCareLeave, {
              companyName,
            })}
          />
        )}
        {flexibleHoursSection.dataCount > 0 && (
          <PolicySummaryCard
            className={styles.card}
            title="彈性上下班時間制度"
            icon={flexibleHoursIcon}
            availabilityBulletByLabel={
              FLEXIBLE_HOURS_AVAILABILITY_BULLET_BY_LABEL
            }
            section={flexibleHoursSection}
            linkTo={generatePath(companyFamilyChildcareFlexibleHoursPath, {
              companyName,
            })}
          />
        )}
        {remoteWork.dataCount > 0 && (
          <PolicySummaryCard
            className={styles.card}
            title="遠端工作制度"
            icon={remoteWorkIcon}
            availabilityBulletByLabel={REMOTE_WORK_AVAILABILITY_BULLET_BY_LABEL}
            complianceBulletByLabel={REMOTE_WORK_FREQUENCY_BULLET_BY_LABEL}
            section={remoteWork}
            linkTo={generatePath(companyFamilyChildcareRemoteWorkPath, {
              companyName,
            })}
          />
        )}
      </div>
    </SnippetBlock>
  );
};

export default FamilyChildcareSnippetBlock;
