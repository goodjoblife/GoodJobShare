import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import R from 'ramda';
import qs from 'qs';
import { compose, withHandlers, setStatic, lifecycle } from 'recompose';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import Loader from 'common/Loader';
import { Section, Wrapper, Heading, P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import Pagination from 'common/Pagination';
import { pathnameSelector, querySelector } from 'common/routing/selectors';
import getScale from 'utils/numberUtils';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { fetchExperiences as fetchExperiencesAction } from 'actions/experienceSearch';
import { IMG_HOST, SITE_NAME } from 'constants/helmetData';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';
import { PAGE_COUNT } from 'constants/experienceSearch';
import status from 'constants/status';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import Filter from './Filter';
import { Banner1, Banner2 } from './Banners';
import { queryParser, toQsString } from './helper';
import withRouteParameter from './withRouteParameter';

const SORT = {
  CREATED_AT: 'created_at',
  POPULARITY: 'popularity',
};

const searchTypeMap = {
  work: '工作經驗',
  interview: '面試經驗',
  intern: '實習經驗',
};

const sortByMap = {
  created_at: '最新',
  popularity: '熱門',
};

const BANNER_LOCATION = 10;

class ExperienceSearch extends Component {
  static propTypes = {
    experienceSearch: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    loadingStatus: PropTypes.string,
    changeSearchTypeAndSort: PropTypes.func.isRequired,
    changeSearchQueryAndSearchBy: PropTypes.func.isRequired,
    searchBy: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    searchType: PropTypes.array.isRequired,
  };

  getCanonicalUrl = () => {
    const { searchType, searchQuery, searchBy, sort, page } = this.props;

    const params = {
      type: R.join(',')(searchType) || 'interview,work',
      q: searchQuery || '',
      s_by: searchBy || 'job_title',
      sort: sort || 'created_at',
      p: page || 1,
    };
    const str = qs.stringify(params, { sort: (a, b) => a.localeCompare(b) });
    const url = formatCanonicalPath(`${this.props.location.pathname}?${str}`);
    return url;
  };

  handleSearchTypeChange = ({ searchType, sort }) => {
    this.props.changeSearchTypeAndSort({ searchType, sort });
  };

  handleSearchbarKeywordClick = ({ keyword, searchBy }) => {
    this.props.changeSearchQueryAndSearchBy({
      searchQuery: keyword,
      searchBy,
    });
    this.searchTrack({ searchBy, keyword });
  };

  handleSearchBy = ({ searchQuery, searchBy }) => {
    this.props.changeSearchQueryAndSearchBy({ searchQuery, searchBy });
    this.searchTrack({ searchBy, searchQuery });
  };

  handleSearchbarSubmit = ({ searchBy, searchQuery }) => {
    this.props.changeSearchQueryAndSearchBy({ searchQuery, searchBy });
    this.searchTrack({ searchBy, searchQuery });
  };

  searchTrack = ({ searchBy, searchQuery }) => {
    ReactGA.event({
      category: GA_CATEGORY.SEARCH_EXPERIENCE,
      action: `${GA_ACTION.SEARCH_BY}_${searchBy}`,
      value: searchQuery,
    });

    ReactPixel.track('Search', {
      search_string: searchQuery,
      content_category: PIXEL_CONTENT_CATEGORY.SEARCH_EXPERIENCES,
    });
  };

  handleSortClick = ({ searchType, sort }) => {
    this.props.changeSearchTypeAndSort({ searchType, sort });

    if (sort === SORT.CREATED_AT) {
      ReactGA.event({
        category: GA_CATEGORY.SEARCH_EXPERIENCE,
        action: GA_ACTION.CLICK_LATEST,
      });
    } else if (sort === SORT.POPULARITY) {
      ReactGA.event({
        category: GA_CATEGORY.SEARCH_EXPERIENCE,
        action: GA_ACTION.CLICK_POPULAR,
      });
    }
  };

  // 給 Pagination 建立分頁的連結用
  createPageLinkTo = nextPage => {
    const pathname = pathnameSelector(this.props);
    const { searchBy, searchQuery, sort, searchType } = this.props;

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
      searchType,
      page: nextPage,
    });

    return {
      pathname,
      search: `?${queryString}`,
    };
  };

  renderBlocks = experiences => {
    const _toBlocks = R.map(experience => (
      <ExperienceBlock
        key={experience._id}
        data={experience}
        size="l"
        backable
      />
    ));

    const injectBannerAt = N =>
      R.addIndex(R.chain)((row, i) => {
        if (i === N - 1) {
          return [<Banner2 key="banner" />, row];
        }
        return row;
      });

    // 複寫原本的 toBlocks 行為，插入 Banner
    const toBlocks = R.pipe(
      _toBlocks,
      injectBannerAt(BANNER_LOCATION),
    );

    return toBlocks(experiences);
  };

  renderHelmet = () => {
    // TODO 將邏輯拆成 1. 公司職稱搜尋 2. 非搜尋，減少 if/else
    const { searchType, searchQuery, sortBy, page } = this.props;

    const count = this.props.experienceSearch.experienceCount;
    const scale = getScale(count);
    const url = this.getCanonicalUrl();
    const searchTypeName = searchType
      .sort()
      .reduce((names, type) => {
        if (searchTypeMap[type]) {
          names.push(searchTypeMap[type]);
        }
        return names;
      }, [])
      .join('、');

    // default helmet info
    let title = '查詢面試、工作、實習經驗';
    let description = `馬上查詢超過 ${scale} 篇面試、工作及實習經驗分享，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;

    // if searchQuery is given and number of result > 0, then show job / company name
    if (searchQuery && count > 0) {
      const tmpStr = `${searchQuery}的${searchTypeName}分享`;
      title = `${tmpStr}，第 ${page} 頁`;
      description = `馬上查看共 ${count} 篇有關${tmpStr}，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;
    } else if (sortBy) {
      // if searchQuery is not given, but sortBy is given, then show 最新/熱門
      title = `${sortByMap[sortBy]}${searchTypeName}分享 - 第 ${page} 頁`;
      description = `馬上查詢超過 ${scale} 篇${searchTypeName}分享，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;
    }
    return (
      <Helmet>
        <title itemProp="name" lang="zh-TW">
          {title}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${IMG_HOST}/og/experience-search.jpg`}
        />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
      </Helmet>
    );
  };

  render() {
    const { experienceSearch, loadingStatus } = this.props;
    const experiences = experienceSearch.experiences || [];

    const { searchQuery, searchBy, sort, searchType, page } = this.props;

    return (
      <Section Tag="main" pageTop paddingBottom>
        {this.renderHelmet()}
        <Wrapper size="l">
          <div className={styles.container}>
            <aside className={styles.aside}>
              <Filter
                sort={sort}
                searchType={searchType}
                onSeachTypeChange={this.handleSearchTypeChange}
                onSortClick={this.handleSortClick}
                className={styles.filter}
              />
              <Banner1 className={styles.banner} />
            </aside>

            <section className={styles.content}>
              <Searchbar
                className={styles.searcbarLarge}
                keywords={experienceSearch.keywords}
                searchBy={searchBy}
                searchQuery={searchQuery}
                onKeywordClick={this.handleSearchbarKeywordClick}
                onSearchByChange={this.handleSearchBy}
                onSubmit={this.handleSearchbarSubmit}
              />

              {experienceSearch.searchQuery &&
                experienceSearch.experienceCount > 0 && (
                  <div className={styles.searchResult}>
                    <Heading size="m" bold>
                      「{experienceSearch.searchQuery}
                      」的面試經驗、工作經驗
                    </Heading>
                  </div>
                )}

              <Pagination
                totalCount={experienceSearch.experienceCount}
                unit={PAGE_COUNT}
                currentPage={page}
                createPageLinkTo={this.createPageLinkTo}
              />

              {experienceSearch.searchQuery &&
                experienceSearch.experienceCount === 0 &&
                loadingStatus !== status.FETCHING && (
                  <P size="l" bold className={styles.searchNoResult}>
                    尚未有「
                    {experienceSearch.searchQuery}
                    」的經驗分享
                  </P>
                )}
              {// rendering experiences blocks and banner
              loadingStatus === status.FETCHING ? (
                <Loader size="s" />
              ) : (
                this.renderBlocks(experiences)
              )}

              <Pagination
                totalCount={experienceSearch.experienceCount}
                unit={PAGE_COUNT}
                currentPage={page}
                createPageLinkTo={this.createPageLinkTo}
              />
            </section>
          </div>
        </Wrapper>
        <Wrapper>
          <FanPageBlock className={styles.fanPageBlock} />
        </Wrapper>
      </Section>
    );
  }
}

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const { searchBy, searchQuery, sort, page, searchType } = queryParser(
    querySelector(props),
  );

  return dispatch(
    fetchExperiencesAction(
      page,
      PAGE_COUNT,
      sort,
      searchBy,
      searchQuery,
      searchType,
    ),
  );
});

const queryData = lifecycle({
  componentDidMount() {
    const { fetchExperiences, getNewSearchBy } = this.props;
    const { searchBy, searchQuery, sort, page, searchType } = this.props;

    fetchExperiences(page, PAGE_COUNT, sort, searchBy, searchQuery, searchType);
    getNewSearchBy(searchBy);
  },
  componentDidUpdate(prevProps) {
    const props = R.props([
      'searchBy',
      'searchQuery',
      'sort',
      'page',
      'searchType',
    ]);
    const propsEq = (a, b) => R.equals(props(a), props(b));
    const { fetchExperiences, getNewSearchBy } = this.props;

    if (!propsEq(this.props, prevProps)) {
      const { searchBy, searchQuery, sort, page, searchType } = this.props;

      fetchExperiences(
        page,
        PAGE_COUNT,
        sort,
        searchBy,
        searchQuery,
        searchType,
      );
    }

    if (!R.eqProps('searchBy')(this.props, prevProps)) {
      const { searchBy } = this.props;
      getNewSearchBy(searchBy);
    }
  },
});

const hoc = compose(
  ssr,
  withRouteParameter,
  withHandlers({
    changeSearchTypeAndSort: ({ changeRouteParameter }) => ({
      searchType,
      sort,
    }) => {
      changeRouteParameter({ page: 1, searchType, sort });
    },
    changeSearchQueryAndSearchBy: ({ changeRouteParameter }) => ({
      searchQuery,
      searchBy,
    }) => {
      changeRouteParameter({ page: 1, searchQuery, searchBy });
    },
  }),
  queryData,
);

export default hoc(ExperienceSearch);
