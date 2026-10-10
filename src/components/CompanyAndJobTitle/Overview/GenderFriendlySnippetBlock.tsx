import React from 'react';
import { useSelector } from 'react-redux';
import { generatePath } from 'react-router';

import { generateSharePolicyForm } from 'common/ShareExpSection/shareLinkTo';
import {
  Aspect,
  TabType,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';
import { companyGenderFriendlyMenstrualLeavePath } from 'constants/linkTo';
import { companyPolicyReviewStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

import AspectScoreCard from '../AspectScoreCard';
import {
  MENSTRUAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  MENSTRUAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
} from '../constants';
import toGenderFriendlyData from '../GenderFriendly/toGenderFriendlyData';
import useFemaleManagerStatisticsItem from '../GenderFriendly/useFemaleManagerStatisticsItem';
import menstrualLeaveIcon from '../menstrualLeaveIcon.svg';
import { useCompanyName } from '../PageContextProvider';
import PolicySummaryCard from '../PolicySummaryCard';
import styles from './PolicySnippetBlock.module.css';
import { EsgItemBlock } from '../SalaryWorkTime/EsgBlock/EsgBlock';
import SnippetBlock from '../SnippetBlock';

const GenderFriendlySnippetBlock: React.FC = () => {
  const companyName = useCompanyName();
  const femaleManagerStatisticsItem = useFemaleManagerStatisticsItem(
    companyName,
  );
  const box = useSelector(
    companyPolicyReviewStatisticsBoxSelectorByName(companyName),
  );
  const { menstrualLeave } = toGenderFriendlyData(
    isFetched(box) ? box.data : null,
  );

  return (
    <SnippetBlock
      title={TAB_TYPE_DETAIL_TRANSLATION[TabType.GENDER_FRIENDLY]}
      pageName={companyName}
    >
      <div className={styles.row}>
        <AspectScoreCard
          aspect={Aspect.GENDER}
          emptyShareLinkTo={generateSharePolicyForm()}
        />
        {femaleManagerStatisticsItem && (
          <EsgItemBlock
            className={styles.fixedCard}
            title="管理職女性主管佔比"
            year={femaleManagerStatisticsItem.year}
            value={femaleManagerStatisticsItem.percentage * 100}
            unit="%"
          />
        )}
        {menstrualLeave.dataCount > 0 && (
          <PolicySummaryCard
            title="生理假"
            icon={menstrualLeaveIcon}
            availabilityBulletByLabel={
              MENSTRUAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL
            }
            complianceBulletByLabel={MENSTRUAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL}
            section={menstrualLeave}
            linkTo={generatePath(companyGenderFriendlyMenstrualLeavePath, {
              companyName,
            })}
          />
        )}
      </div>
    </SnippetBlock>
  );
};

export default GenderFriendlySnippetBlock;
