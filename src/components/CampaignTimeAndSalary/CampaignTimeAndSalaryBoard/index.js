import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import Loading from 'common/Loader';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { compose, setStatic } from 'recompose';
import Star from 'common/icons/Star';
import Select from 'common/form/Select';
import Pagination from 'common/Pagination';
import CommonNotFound from 'common/NotFound';
import { withPermission } from 'common/permission-context';
import InfoTimeModal from '../../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../../TimeAndSalary/common/InfoSalaryModal';
import AboutThisJobModal from '../../TimeAndSalary/common/AboutThisJobModal';
import timeAndSalaryBoardStyles from '../../TimeAndSalary/TimeAndSalaryBoard/TimeAndSalaryBoard.module.css';
import timeAndSalaryBannerStyles from '../../TimeAndSalary/Banner.module.css';
import timeAndSalaryCommonStyles from '../../TimeAndSalary/views/view.module.css';
import fetchingStatus from 'constants/status';
import { MAX_ROWS_IF_HIDDEN } from 'constants/hideContent';
import { BasicPermissionBlock } from 'common/PermissionBlock';
import styles from '../CampaignTimeAndSalary.module.css';

import {
  queryCampaignInfoList,
  queryCampaignInfoListIfNeeded,
} from 'actions/campaignInfo';
import { queryCampaignTimeAndSalary } from 'actions/campaignTimeAndSalaryBoard';
import GradientMask from 'common/GradientMask';

import DashBoardTable from '../../TimeAndSalary/common/DashBoardTable';
import {
  campaignEntriesSelector,
  campaignEntriesStatusSelector,
  campaignEntriesErrorSelector,
} from 'selectors/campaignSelector';

import { querySelector } from 'common/routing/selectors';

import {
  toQsString,
  queryParser,
} from '../../TimeAndSalary/TimeAndSalaryBoard/helper';
import { DATA_NUM_PER_PAGE } from '../../../constants/timeAndSalarSearch';

import renderHelmet from './helmet';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import useCampaignName from '../hooks/useCampaignName';
import useModal from 'hooks/useModal';
import { useQuery } from 'hooks/routing';
import { isFetched, isFetching } from 'utils/fetchBox';
import useCampaignInfoBox from '../hooks/useCampaignInfoBox';
import { campaignNameSelector } from '../selectors';

const pathnameMapping = {
  '/time-and-salary/campaigns/:campaign_name/work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    sortBy: 'week_work_time',
    order: 'descending',
  },
  '/time-and-salary/campaigns/:campaign_name/sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    sortBy: 'week_work_time',
    order: 'ascending',
  },
  '/time-and-salary/campaigns/:campaign_name/salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    sortBy: 'estimated_hourly_wage',
    order: 'descending',
  },
  '/time-and-salary/campaigns/:campaign_name/sort/salary-asc': {
    title: '估算時薪排行榜（由低到高）',
    label: '估算時薪（低到高）',
    sortBy: 'estimated_hourly_wage',
    order: 'ascending',
  },
  '/time-and-salary/campaigns/:campaign_name/latest': {
    title: '最新薪資、工時資訊',
    label: '資料時間（新到舊）',
    sortBy: 'created_at',
    order: 'descending',
  },
  '/time-and-salary/campaigns/:campaign_name/sort/time-asc': {
    title: '最舊薪資、工時資訊',
    label: '資料時間（舊到新）',
    sortBy: 'created_at',
    order: 'ascending',
  },
};

const selectOptions = R.pipe(
  R.toPairs,
  R.map(([path, opt]) => ({ value: path, label: opt.label })),
);

const pathSelector = R.prop('path');

const pathParameterSelector = R.compose(
  path => pathnameMapping[path],
  pathSelector,
);

const injectPermissionBlock = campaignName => rows => {
  const newRows = rows.slice(0, MAX_ROWS_IF_HIDDEN);
  newRows.push(
    <tr>
      <td colSpan="8" className={timeAndSalaryBoardStyles.noPadding}>
        <GradientMask />
      </td>
    </tr>,
  );
  newRows.push(
    <tr>
      <td colSpan="8" className={timeAndSalaryBoardStyles.noBefore}>
        <BasicPermissionBlock
          rootClassName={timeAndSalaryBoardStyles.permissionBlockBoard}
          to={`/share/time-and-salary/campaigns/${campaignName}`}
        />
      </td>
    </tr>,
  );
  return newRows;
};

const queryJobTitlesFromCampaignBox = (campaignBox, campaignName) => {
  return campaignBox.data[campaignName].queryJobTitles;
};

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

const usePath = () => {
  const match = useRouteMatch();
  return pathSelector(match);
};

const usePathParameter = () => {
  const match = useRouteMatch();
  return pathParameterSelector(match);
};

const usePage = () => {
  const query = useQuery();
  const { page } = queryParser(query);
  return page;
};

const CampaignTimeAndSalaryBoard = ({
  canView,
  status,
  data,
  totalCount,
  currentPage,
  fetchPermission,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const campaignBox = useCampaignInfoBox();

  // key: campaignName, path, page
  const campaignName = useCampaignName();
  const path = usePath();
  const page = usePage();
  const { title, sortBy, order } = usePathParameter();

  const pathname = usePathname();

  const [state, setState] = useState({
    isOpen: false,
    title: '',
    aboutThisJob: '',
  });

  // refresh permission
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission, path, campaignName]);

  useEffect(() => {
    dispatch(queryCampaignInfoListIfNeeded());
  }, [dispatch]);

  useEffect(() => {
    if (isFetched(campaignBox)) {
      const jobTitles = queryJobTitlesFromCampaignBox(
        campaignBox,
        campaignName,
      );

      dispatch(
        queryCampaignTimeAndSalary(campaignName, {
          sortBy,
          order,
          jobTitles,
          page,
        }),
      );
    }
  }, [dispatch, campaignBox, campaignName, order, page, sortBy]);

  // 給 Pagination 建立分頁的連結用
  const createPageLinkTo = useCallback(
    nextPage => {
      const queryString = toQsString({ page: nextPage });
      return {
        pathname,
        search: `?${queryString}`,
      };
    },
    [pathname],
  );

  const {
    isOpen: infoSalaryModalIsOpen,
    close: closeInfoSalaryModal,
    toggle: toggleInfoSalaryModal,
  } = useModal();

  const {
    isOpen: infoTimeModalIsOpen,
    close: closeInfoTimeModal,
    toggle: toggleInfoTimeModal,
  } = useModal();

  const toggleAboutThisJobModal = (aboutThisJob, title) => {
    const isOpen = !state.isOpen;
    setState({
      ...state,
      isOpen,
      title,
      aboutThisJob,
    });
  };

  const createPostProcessRows = campaignName => {
    if (!canView) {
      return injectPermissionBlock(campaignName);
    }
    return R.identity;
  };

  // 如果 campaignName 不在清單中，代表 Not Found
  if (isFetched(campaignBox) && !R.has(campaignName, campaignBox.data)) {
    return <CommonNotFound />;
  }

  const campaignInfo = campaignBox.data[campaignName];

  const isLoading =
    isFetching(campaignBox) || status === fetchingStatus.FETCHING;

  return (
    <section className={timeAndSalaryCommonStyles.searchResult}>
      {renderHelmet({ pathname, title, campaignInfo, page })}
      <h2 className={styles.heading}>{title}</h2>
      <Link
        className={cn(
          timeAndSalaryBannerStyles.btnS,
          timeAndSalaryBannerStyles.btnYellowLine,
        )}
        to="/salary-work-times/latest"
      >
        <Star /> 全站薪資工時
      </Link>
      <div className={timeAndSalaryCommonStyles.result}>
        <div className={timeAndSalaryBoardStyles.sortRow}>
          <div className={timeAndSalaryBoardStyles.extremeDescription} />
          <div className={timeAndSalaryCommonStyles.sort}>
            <div className={timeAndSalaryCommonStyles.label}> 排序：</div>
            <div className={timeAndSalaryCommonStyles.select}>
              <Select
                options={selectOptions(pathnameMapping)}
                onChange={e =>
                  history.push(
                    e.target.value.replace(':campaign_name', campaignName),
                  )
                }
                value={path}
                hasNullOption={false}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className={styles.status}>
            <Loading size="s" />
          </div>
        ) : (
          <DashBoardTable
            data={data}
            postProcessRows={createPostProcessRows(campaignName)}
            toggleInfoSalaryModal={toggleInfoSalaryModal}
            toggleInfoTimeModal={toggleInfoTimeModal}
            toggleAboutThisJobModal={toggleAboutThisJobModal}
          />
        )}
        {isLoading ? null : (
          <Pagination
            totalCount={totalCount}
            unit={DATA_NUM_PER_PAGE}
            currentPage={currentPage}
            createPageLinkTo={createPageLinkTo}
          />
        )}
        <InfoSalaryModal
          isOpen={infoSalaryModalIsOpen}
          close={closeInfoSalaryModal}
        />
        <InfoTimeModal
          isOpen={infoTimeModalIsOpen}
          close={closeInfoTimeModal}
        />
        <AboutThisJobModal
          isOpen={state.isOpen}
          close={toggleAboutThisJobModal}
          title={state.title}
          aboutThisJob={state.aboutThisJob}
        />
      </div>
    </section>
  );
};

const ssr = setStatic(
  'fetchData',
  ({ store: { dispatch, getState }, match, ...props }) => {
    const campaignName = campaignNameSelector(match);
    const { sortBy, order } = pathParameterSelector(match);
    const { page } = queryParser(querySelector(props));

    return dispatch(queryCampaignInfoList()).then(() => {
      // TODO: work around
      const campaignBox = {
        data: campaignEntriesSelector(getState()),
        status: campaignEntriesStatusSelector(getState()),
        error: campaignEntriesErrorSelector(getState()),
      };

      const jobTitles = queryJobTitlesFromCampaignBox(
        campaignBox,
        campaignName,
      );
      return dispatch(
        queryCampaignTimeAndSalary(campaignName, {
          sortBy,
          order,
          jobTitles,
          page,
        }),
      );
    });
  },
);

const hoc = compose(
  ssr,
  withPermission,
);

CampaignTimeAndSalaryBoard.propTypes = {
  data: PropTypes.array,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  status: PropTypes.string,
  canView: PropTypes.bool.isRequired,
  fetchPermission: PropTypes.func.isRequired,
};

export default hoc(CampaignTimeAndSalaryBoard);
