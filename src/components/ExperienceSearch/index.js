import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import R from 'ramda';
import qs from 'qs';

import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import Loader from 'common/Loader';
import { Section, Wrapper, Heading, P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import { fetchExperiences as fetchExperiencesAction } from '../../actions/experienceSearch';
import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../constants/helmetData';
import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';
import { PAGE_COUNT } from '../../constants/experienceSearch';
import status from '../../constants/status';
import Filter from './Filter';
import { Banner1, Banner2 } from './Banners';

import Pagination from '../common/Pagination';

import getScale from '../../utils/numberUtils';

import { toQsString, querySelector, locationSearchToQuery } from './helper';
import { GA_CATEGORY, GA_ACTION } from '../../constants/gaConstants';

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
  static fetchData({ location, store: { dispatch } }) {
    const { search } = location;
    const query = locationSearchToQuery(search);
    const { searchBy, searchQuery, sort, page } = querySelector(query);

    let { searchType } = querySelector(query);
    searchType = R.split(',', searchType);

    return dispatch(
      fetchExperiencesAction(
        page,
        PAGE_COUNT,
        sort,
        searchBy,
        searchQuery,
        searchType
      )
    );
  }

  static propTypes = {
    fetchExperiences: PropTypes.func.isRequired,
    getNewSearchBy: PropTypes.func.isRequired, // TODO: rename, eg: queryKeywords
    experienceSearch: ImmutablePropTypes.map.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    loadingStatus: PropTypes.string,
  };

  componentDidMount() {
    const { fetchExperiences } = this.props;

    const { search } = this.props.location;
    const query = locationSearchToQuery(search);

    const { searchBy, searchQuery, sort, page } = querySelector(query);

    let { searchType } = querySelector(query);
    searchType = R.split(',', searchType);

    fetchExperiences(page, PAGE_COUNT, sort, searchBy, searchQuery, searchType);
    this.props.getNewSearchBy(searchBy);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const { fetchExperiences } = this.props;

      const { search } = this.props.location;
      const query = locationSearchToQuery(search);

      const { searchBy, searchQuery, sort, page } = querySelector(query);

      let { searchType } = querySelector(query);
      searchType = R.split(',', searchType);

      fetchExperiences(
        page,
        PAGE_COUNT,
        sort,
        searchBy,
        searchQuery,
        searchType
      );
    }
  }

  getCanonicalUrl = () => {
    const { search } = this.props.location;
    const query = locationSearchToQuery(search);
    const { searchType, searchQuery, searchBy, sort, page } = querySelector(
      query
    );

    const params = {
      type: searchType || 'interview,work',
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
    const { pathname, search } = this.props.location;
    const query = locationSearchToQuery(search);

    const { searchBy, searchQuery } = querySelector(query);

    const page = 1;

    const queryString = toQsString({
      page,
      sort,
      searchBy,
      searchQuery,
      searchType: R.join(',')(searchType),
    });
    const url = `${pathname}?${queryString}`;
    this.props.history.push(url);
  };

  handleSearchbarKeywordClick = ({ keyword, searchBy }) => {
    const { pathname, search } = this.props.location;
    // pickup parameter from query
    const query = locationSearchToQuery(search);
    const { sort, searchType } = querySelector(query);
    // reset to initial page
    const page = 1;

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery: keyword,
      page,
      searchType,
    });
    const url = `${pathname}?${queryString}`;
    this.props.history.push(url);

    this.searchTrack({ searchBy, keyword });
  };

  handleSearchBy = ({ searchQuery, searchBy }) => {
    const { getNewSearchBy } = this.props;
    const { pathname, search } = this.props.location;
    const query = locationSearchToQuery(search);

    const { sort, searchType } = querySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
      page: 1,
      searchType,
    });

    const url = `${pathname}?${queryString}`;

    getNewSearchBy(searchBy);
    this.props.history.push(url);
    this.searchTrack({ searchBy, searchQuery });
  };

  handleSearchbarSubmit = ({ searchBy, searchQuery }) => {
    const { pathname, search } = this.props.location;
    // pickup parameter from query
    const query = locationSearchToQuery(search);
    const { sort, searchType } = querySelector(query);
    // reset to initial page
    const page = 1;

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
      page,
      searchType,
    });
    const url = `${pathname}?${queryString}`;
    this.props.history.push(url);
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
    const { pathname, search } = this.props.location;
    const query = locationSearchToQuery(search);

    const { searchBy } = querySelector(query);

    // reset searchQuery
    const searchQuery = '';
    const page = 1;

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
      page,
      searchType: R.join(',')(searchType),
    });

    const url = `${pathname}?${queryString}`;
    this.props.history.push(url);

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
    const { pathname, search } = this.props.location;
    const query = locationSearchToQuery(search);

    const { searchBy, searchQuery, sortBy, searchType } = querySelector(query);

    const queryString = toQsString({
      sort: sortBy,
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
      injectBannerAt(BANNER_LOCATION)
    );

    return toBlocks(experiences);
  };

  renderHelmet = () => {
    // TODO 將邏輯拆成 1. 公司職稱搜尋 2. 非搜尋，減少 if/else
    const { search } = this.props.location;
    const query = locationSearchToQuery(search);
    const { searchType, searchQuery, sortBy, page } = querySelector(query);

    const count = this.props.experienceSearch.get('experienceCount');
    const scale = getScale(count);
    const url = this.getCanonicalUrl();
    const searchTypeName = searchType
      .split(',')
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
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { property: 'og:title', content: formatTitle(title, SITE_NAME) },
          { property: 'og:description', content: description },
          { property: 'og:url', content: url },
          {
            property: 'og:image',
            content: `${imgHost}/og/experience-search.jpg`,
          },
        ]}
        link={[{ rel: 'canonical', href: url }]}
      />
    );
  };

  render() {
    const { experienceSearch, loadingStatus } = this.props;
    const data = experienceSearch.toJS();
    const experiences = data.experiences || [];

    const { search } = this.props.location;
    const query = locationSearchToQuery(search);
    const { searchQuery, searchBy, sort, searchType } = querySelector(query);

    return (
      <Section Tag="main" pageTop paddingBottom>
        {this.renderHelmet()}
        <Wrapper size="l">
          <div className={styles.container}>
            <aside className={styles.aside}>
              <Filter
                sort={sort}
                searchType={searchType.split(',')}
                onSeachTypeChange={this.handleSearchTypeChange}
                onSortClick={this.handleSortClick}
                className={styles.filter}
              />
              <Banner1 className={styles.banner} />
            </aside>

            <section className={styles.content}>
              <Searchbar
                className={styles.searcbarLarge}
                keywords={data.keywords}
                searchBy={searchBy}
                searchQuery={searchQuery}
                onKeywordClick={this.handleSearchbarKeywordClick}
                onSearchByChange={this.handleSearchBy}
                onSubmit={this.handleSearchbarSubmit}
              />

              {data.searchQuery &&
                data.experienceCount > 0 && (
                  <div className={styles.searchResult}>
                    <Heading size="m" bold>
                      「{data.searchQuery}
                      」的面試經驗、工作經驗
                    </Heading>
                  </div>
                )}

              <Pagination
                totalCount={data.experienceCount}
                unit={PAGE_COUNT}
                currentPage={data.currentPage}
                createPageLinkTo={this.createPageLinkTo}
              />

              {data.searchQuery &&
                data.experienceCount === 0 &&
                loadingStatus !== status.FETCHING && (
                  <P size="l" bold className={styles.searchNoResult}>
                    尚未有「
                    {data.searchQuery}
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
                totalCount={data.experienceCount}
                unit={PAGE_COUNT}
                currentPage={data.currentPage}
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

export default ExperienceSearch;
