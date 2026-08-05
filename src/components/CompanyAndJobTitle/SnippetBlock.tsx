import cn from 'classnames';
import React from 'react';

import { Heading, Link } from 'common/base';
import { TabType } from 'constants/companyJobTitle';

import EmptyView from './EmptyView';
import styles from './SnippetBlock.module.css';

type SnippetBlockProps = {
  title: string;
  children: React.ReactNode;
  linkText?: string;
  linkTo?: string;
  isEmpty?: boolean;
  // 只在 isEmpty 時用到，轉手給 EmptyView。isEmpty 是動態值，型別上分不出
  // 「這次會不會渲染空狀態」，因此 pageName 一律必填
  pageName: string;
  tabType?: TabType;
};

const SnippetBlock: React.FC<SnippetBlockProps> = ({
  title,
  children,
  linkText,
  linkTo,
  isEmpty = false,
  pageName,
  tabType,
}) => (
  <div className={styles.snippet}>
    <Heading className={cn(styles.title, styles.aboveCard)} Tag="h2">
      {title}
    </Heading>
    {isEmpty ? (
      <EmptyView tabType={tabType} pageName={pageName} />
    ) : (
      <React.Fragment>
        {children}
        {linkText && (
          <Link to={linkTo} className={styles.link}>
            {linkText}
          </Link>
        )}
      </React.Fragment>
    )}
  </div>
);

export default SnippetBlock;
