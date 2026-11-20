import React, { useState } from 'react';

import { Heading } from 'common/base';
import Button from 'common/button/Button';
import Card from 'common/Card';
import GradientMask from 'common/GradientMask';
import InfoBlock, {
  InfoBlocks,
} from 'components/ExperienceDetail/Article/InfoBlock';
import SectionBlock from 'components/ExperienceDetail/Article/SectionBlock';
import { MAX_WORDS_IF_HIDDEN } from 'constants/hideContent';

import { LeavePolicyRecord } from './index';
import styles from './PolicyReviewCard.module.css';

const SUBTITLE = '經驗分享';

// 與評價／面試列表（ExperienceDetail/Article 的 Sections）相同：小標＋內文超過字數上限就截斷
const toCollapsedContent = (content: string): string | null => {
  const maxContentLength = MAX_WORDS_IF_HIDDEN - SUBTITLE.length;
  return content.length > maxContentLength
    ? `${content.substring(0, maxContentLength)}...`
    : null;
};

type ExperienceSectionProps = {
  content: string;
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ content }) => {
  const [isExpanded, setExpanded] = useState(false);
  const collapsedContent = toCollapsedContent(content);

  if (isExpanded || collapsedContent === null) {
    return (
      <SectionBlock
        subtitle={SUBTITLE}
        content={content}
        rating={undefined}
        subTitleTag="h3"
      />
    );
  }

  return (
    <GradientMask
      maskClassName={undefined}
      childrenOnMaskBottom={
        <Button
          circleSize="md"
          btnStyle="black"
          onClick={(): void => setExpanded(true)}
        >
          查看詳細
        </Button>
      }
    >
      <SectionBlock
        subtitle={SUBTITLE}
        content={collapsedContent}
        rating={undefined}
        subTitleTag="h3"
      />
    </GradientMask>
  );
};

type Props = {
  record: LeavePolicyRecord;
  availabilityTitle: string;
  complianceTitle?: string;
};

const PolicyReviewCard: React.FC<Props> = ({
  record: { jobTitle, region, availability, compliance, experience, sharedAt },
  availabilityTitle,
  complianceTitle,
}) => (
  <div className={styles.container}>
    <Heading size="m" Tag="h2" bold className={styles.title}>
      {jobTitle} <span className={styles.timestamp}>{sharedAt}</span>
    </Heading>
    <Card className={styles.card}>
      <div className={styles.info}>
        <InfoBlocks>
          <InfoBlock className={undefined} label="廠區/分公司/部門/團隊">
            {region}
          </InfoBlock>
          <InfoBlock className={undefined} label={availabilityTitle}>
            {availability}
          </InfoBlock>
          {complianceTitle && (
            <InfoBlock className={undefined} label={complianceTitle}>
              {compliance}
            </InfoBlock>
          )}
        </InfoBlocks>
      </div>
      {experience && (
        <div className={styles.article}>
          <ExperienceSection content={experience} />
        </div>
      )}
    </Card>
  </div>
);

export default PolicyReviewCard;
