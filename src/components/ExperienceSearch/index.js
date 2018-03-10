import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import R from 'ramda';
import qs from 'qs';

import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import Loader from 'common/Loader';
import { Section, Wrapper, Heading, P } from 'common/base';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import {
  fetchExperiences as fetchExperiencesAction,
} from '../../actions/experienceSearch';
import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../constants/helmetData';
import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';
import {
  PAGE_COUNT,
} from '../../constants/experienceSearch';
import status from '../../constants/status';
import Filter from './Filter';
import { Banner1, Banner2 } from './Banners';

import Pagination from './Pagination';

import getScale from '../../utils/numberUtils';

import {
  handleSearchType,
  toQsString,
  querySelector,
  pageKeysToQuery,
} from './helper';
import { GA_CATEGORY, GA_ACTION } from '../../constants/gaConstants';

const SORT = {
  CREATED_AT: 'created_at',
  POPULARITY: 'popularity',
};

const searchTypeMap = {
  work: '工作經驗',
  interview: '面試經驗',
};

const sortByMap = {
  created_at: '最新',
  popularity: '熱門',
};

const BANNER_LOCATION = 10;

class ExperienceSearch extends Component {
  static fetchData({ location, store: { dispatch } }) {
    const { query } = location;
    const {
      searchBy,
      searchQuery,
      sort,
      page,
    } = querySelector(query);

    let {
      searchType,
    } = querySelector(query);
    searchType = R.split(',', searchType);

    return dispatch(fetchExperiencesAction(page, PAGE_COUNT, sort, searchBy, searchQuery, searchType));
  }

  static propTypes = {
    fetchExperiences: PropTypes.func.isRequired,
    getNewSearchBy: PropTypes.func.isRequired, // TODO: rename, eg: queryKeywords
    experienceSearch: ImmutablePropTypes.map.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      query: PropTypes.object,
      pathname: PropTypes.string,
    }),
    loadingStatus: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.fetchExperiencesWithSort = this.fetchExperiencesWithSort.bind(this);
  }

  componentDidMount() {
    const {
      fetchExperiences,
    } = this.props;

    const {
      query,
    } = this.props.location;

    const {
      searchBy,
      searchQuery,
      sort,
      page,
    } = querySelector(query);

    let {
      searchType,
    } = querySelector(query);
    searchType = R.split(',', searchType);

    fetchExperiences(page, PAGE_COUNT, sort, searchBy, searchQuery, searchType);
    this.props.getNewSearchBy(searchBy);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const {
        fetchExperiences,
      } = nextProps;

      const {
        query,
      } = nextProps.location;

      const {
        searchBy,
        searchQuery,
        sort,
        page,
      } = querySelector(query);

      let {
        searchType,
      } = querySelector(query);
      searchType = R.split(',', searchType);

      fetchExperiences(page, PAGE_COUNT, sort, searchBy, searchQuery, searchType);
    }
  }

  getCanonicalUrl = () => {
    const {
      searchType,
      searchQuery,
      searchBy,
      sort,
      page,
    } = querySelector(this.props.location.query);

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
  }

  setSearchType = e => {
    const searchType = e.target.value;
    const on = this.props.experienceSearch.get(searchType);
    if (on) {
      ReactGA.event({
        category: GA_CATEGORY.SEARCH_EXPERIENCE,
        action: `${GA_ACTION.TOGGLE_OFF}_${searchType}`,
      });
    } else {
      ReactGA.event({
        category: GA_CATEGORY.SEARCH_EXPERIENCE,
        action: `${GA_ACTION.TOGGLE_ON}_${searchType}`,
      });
    }

    const {
      pathname,
      query,
    } = this.props.location;

    const {
      searchBy,
      searchQuery,
      sortBy: sort,
    } = querySelector(query);

    let {
      searchType: prevSearchType,
    } = querySelector(query);

    prevSearchType = R.split(',', prevSearchType);

    const nextSearchType = handleSearchType(searchType)(prevSearchType);

    const queryString = toQsString({
      page: 1,
      sort,
      searchBy,
      searchQuery,
      searchType: nextSearchType,
    });

    const url = `${pathname}?${queryString}`;

    browserHistory.push(url);
  }

  handleSearchbarKeywordClick = ({ keyword, searchQuery, searchBy }) => {
    const { pathname, query } = this.props.location;
    // pickup parameter from query
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
    browserHistory.push(url);

    this.searchTrack({ searchBy, searchQuery });
  }

  handleSearchBy = ({ searchQuery, searchBy }) => {
    const {
      getNewSearchBy,
    } = this.props;
    const {
      pathname,
      query,
    } = this.props.location;

    const {
      sort,
      searchType,
    } = querySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
      page: 1,
      searchType,
    });

    const url = `${pathname}?${queryString}`;

    getNewSearchBy(searchBy);
    browserHistory.push(url);
    this.searchTrack({ searchBy, searchQuery });
  }

  handleSearchbarSubmit = ({ searchBy, searchQuery }) => {
    const { pathname, query } = this.props.location;
    // pickup parameter from query
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
    browserHistory.push(url);
    this.searchTrack({ searchBy, searchQuery });
  }

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
  }

  fetchExperiencesWithSort(sort) {
    const {
      pathname,
      query,
    } = this.props.location;

    const {
      searchBy,
      searchType,
    } = querySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery: '',
      page: 1,
      searchType,
    });

    const url = `${pathname}?${queryString}`;

    browserHistory.push(url);

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
  }

  // 給 Pagination 建立分頁的連結用
  createPageLinkTo = nextPage => {
    const {
      pathname,
      query,
    } = this.props.location;

    const {
      searchBy,
      searchQuery,
      sortBy,
      searchType,
    } = querySelector(query);

    return {
      pathname,
      query: pageKeysToQuery({
        searchBy,
        searchQuery,
        sortBy,
        searchType,
        page: nextPage,
      }),
    };
  }

  renderBlocks = experiences => {
    const _toBlocks = R.map(experience =>
      (<ExperienceBlock
        key={experience._id}
        data={experience}
        size="l"
        backable
      />));

    const injectBannerAt = N =>
      R.addIndex(R.chain)((row, i) => {
        if (i === N - 1) {
          return [(<Banner2 key="banner" />), row];
        }
        return row;
      });

    // 複寫原本的 toBlocks 行為，插入 Banner
    const toBlocks = R.pipe(
      _toBlocks,
      injectBannerAt(BANNER_LOCATION)
    );

    return toBlocks(experiences);
  }

  renderHelmet = () => {
    const {
      searchType,
      searchQuery,
      sortBy,
      page,
    } = querySelector(this.props.location.query);

    const count = this.props.experienceSearch.get('experienceCount');
    const scale = getScale(count);
    const url = this.getCanonicalUrl();
    const searchTypeName = searchType.split(',').sort().reduce((names, type) => {
      if (searchTypeMap[type]) { names.push(searchTypeMap[type]); }
      return names;
    }, []).join('、');

    // default helmet info
    let title = '查詢面試、工作經驗';
    let description = `馬上查詢超過 ${scale} 篇面試及工作經驗分享，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;

    // if searchQuery is given and number of result > 0, then show job / company name
    if (searchQuery && count > 0) {
      const tmpStr = `${searchQuery}的${searchTypeName}分享`;
      title = `${tmpStr}，第 ${page} 頁`;
      description = `馬上查看共 ${count} 篇有關${tmpStr}，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;
    } else if (sortBy) { // if searchQuery is not given, but sortBy is given, then show 最新/熱門
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
          { property: 'og:image', content: `${imgHost}/og/experience-search.jpg` },
        ]}
        link={[
          { rel: 'canonical', href: url },
        ]}
      />
    );
  }

  render() {
    const {
      experienceSearch,
      loadingStatus,
    } = this.props;
    const data = experienceSearch.toJS();
    const experiences = data.experiences || [];

    const { query } = this.props.location;
    const { searchQuery, searchBy } = querySelector(query);

    return (
      <Section Tag="main" pageTop paddingBottom>
        {this.renderHelmet()}
        <Wrapper size="l">
          <div className={styles.container}>
            <aside className={styles.aside}>
              <Filter
                data={data}
                fetchExperiencesWithSort={this.fetchExperiencesWithSort}
                setSearchType={this.setSearchType}
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

              {(data.searchQuery && data.experienceCount > 0) &&
                <div className={styles.searchResult}>
                  <Heading size="m" bold>「{data.searchQuery}」的面試經驗、工作經驗</Heading>
                </div>
              }

              <Pagination
                totalCount={data.experienceCount}
                unit={PAGE_COUNT}
                currentPage={data.currentPage}
                createPageLinkTo={this.createPageLinkTo}
              />

              {(data.searchQuery && data.experienceCount === 0 && loadingStatus !== status.FETCHING) &&
                <P
                  size="l" bold
                  className={styles.searchNoResult}
                >
                    尚未有「{data.searchQuery}」的經驗分享
                </P>
              }
              { // rendering experiences blocks and banner
                loadingStatus === status.FETCHING
                ? <Loader size="s" />
                : this.renderBlocks(experiences)
              }

              <Pagination
                totalCount={data.experienceCount}
                unit={PAGE_COUNT}
                currentPage={data.currentPage}
                createPageLinkTo={this.createPageLinkTo}
              />
            </section>
          </div>
        </Wrapper>
      </Section>
    );
  }
}

export default ExperienceSearch;
