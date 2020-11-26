import React from 'react';
import PropTypes from 'prop-types';
import ExperienceEntry from './ExperienceEntry';
import EmptyView from '../EmptyView';

import usePermission from 'hooks/usePermission';

import { Section } from 'common/base';
import Pagination from 'common/Pagination';

import { canViewExperience } from 'utils/permissionUtil';

const pageSize = 10;

const WorkExperiences = ({ pageType, pageName, tabType, data, page }) => {
  const { unlockedExperienceRecords, firstTimeView } = usePermission();
  if (data.length === 0) {
    return <EmptyView pageName={pageName} tabType={tabType} />;
  }
  const visibleData = data.slice((page - 1) * pageSize, page * pageSize);
  return (
    <Section Tag="main" paddingBottom>
      {visibleData.map(d => (
        <ExperienceEntry
          key={d.id}
          pageType={pageType}
          data={d}
          canView={canViewExperience(
            d.id,
            unlockedExperienceRecords,
            firstTimeView,
          )}
        />
      ))}
      <Pagination
        totalCount={data.length}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={page => `?p=${page}`}
      />
    </Section>
  );
};

WorkExperiences.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
};

export default WorkExperiences;
