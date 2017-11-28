import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import R from 'ramda';
import qs from 'qs';

import ReactGA from 'react-ga';

import Loader from 'common/Loader';
import { Section, Wrapper, Heading, P } from 'common/base';
import Columns from 'common/Columns';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import {
  fetchExperiences as fetchExperiencesAction,
} from '../../actions/experienceSearch';
import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../constants/helmetData';
import {
  PAGE_COUNT,
} from '../../constants/experienceSearch';
import status from '../../constants/status';
import TimeSalaryBlock from './TimeSalaryBlock';
import Filter from './Filter';
import { Banner1, Banner2 } from './Banners';

import Pagination from './Pagination';

import getScale from '../../utils/numberUtils';

import {
  // searchQuerySelector,
  // searchBySelector,
  // sortBySelector,
  // searchTypeSelector,
  handleSearchType,
  // pageSelector,
  toQsString,
  querySelector,
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
      sortBy: sort,
      page,
    } = querySelector(query);

    let {
      searchType,
    } = querySelector(query);
    searchType = R.split(',', searchType);

    return dispatch(fetchExperiencesAction(page, PAGE_COUNT, sort, searchBy, searchQuery, searchType));
  }

  static propTypes = {
    setKeyword: PropTypes.func.isRequired,
    fetchExperiences: PropTypes.func.isRequired,
    fetchWorkings: PropTypes.func.isRequired,
    getNewSearchBy: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      query: PropTypes.object,
      pathname: PropTypes.string,
    }),
    loadingStatus: PropTypes.string,
  }

  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeywordClick = this.handleKeywordClick.bind(this);
    this.fetchExperiencesWithSort = this.fetchExperiencesWithSort.bind(this);
    this.fetchExperiencesAndWorkings = this.fetchExperiencesAndWorkings.bind(this);
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
      sortBy: sort,
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
        sortBy: sort,
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
      sortBy,
      page,
    } = querySelector(this.props.location.query);

    const params = {
      type: searchType || 'interview,work',
      q: searchQuery || '',
      s_by: searchBy || 'job_title',
      sort: sortBy || 'created_at',
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

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const searchQuery = e.target.value;
      this.fetchExperiencesAndWorkings(searchQuery);
    }
  }

  handleKeywordClick(searchQuery) {
    this.fetchExperiencesAndWorkings(searchQuery);
  }

  handleSearchBy = searchBy => {
    const {
      getNewSearchBy,
    } = this.props;
    const {
      pathname,
      query,
    } = this.props.location;

    const {
      searchQuery,
      sortBy: sort,
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
  }

  fetchExperiencesAndWorkings(val) {
    const {
      fetchWorkings,
    } = this.props;

    const {
      pathname,
      query,
    } = this.props.location;

    const {
      searchBy,
      sortBy: sort,
      searchType,
    } = querySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery: val,
      page: 1,
      searchType,
    });

    const url = `${pathname}?${queryString}`;

    browserHistory.push(url);
    fetchWorkings(searchBy, val);

    ReactGA.event({
      category: GA_CATEGORY.SEARCH_EXPERIENCE,
      action: `${GA_ACTION.SEARCH_BY}_${this.props.experienceSearch.get('searchBy')}`,
      value: val,
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

  fetchMoreExperiences = nextPage => {
    ReactGA.event({
      category: GA_CATEGORY.SEARCH_EXPERIENCE,
      action: GA_ACTION.FETCH_MORE,
      value: nextPage,
    });

    const {
      pathname,
      query,
    } = this.props.location;

    const {
      searchBy,
      searchQuery,
      sortBy: sort,
      searchType,
    } = querySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
      page: nextPage,
      searchType,
    });

    const url = `${pathname}?${queryString}`;

    browserHistory.push(url);
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
      setKeyword,
      experienceSearch,
      loadingStatus,
    } = this.props;
    const data = experienceSearch.toJS();

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
                data={data}
                handleSearchBy={this.handleSearchBy}
                setKeyword={setKeyword}
                handleKeyPress={this.handleKeyPress}
                handleKeywordClick={this.handleKeywordClick}
                fetchExperiencesAndWorkings={this.fetchExperiencesAndWorkings}
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
                onSelect={this.fetchMoreExperiences}
              />

              {(data.searchQuery && data.experienceCount === 0) &&
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
                : (data.experiences || [])
                  .map((o, index) => {
                    if (index === BANNER_LOCATION) {
                      return (
                        <div key={o._id}>
                          <Banner2 />
                          <ExperienceBlock
                            to={`/experiences/${o._id}`}
                            data={o}
                            size="l"
                            backable
                          />
                        </div>
                      );
                    }
                    return (
                      <ExperienceBlock
                        key={o._id}
                        to={`/experiences/${o._id}`}
                        data={o}
                        size="l"
                        backable
                      />
                    );
                  }
                )
              }

              <Pagination
                totalCount={data.experienceCount}
                unit={PAGE_COUNT}
                currentPage={data.currentPage}
                onSelect={this.fetchMoreExperiences}
              />

              {(data.searchQuery && data.workings.length > 0) &&
                <div>
                  <hr className={styles.splitter} />
                  <section className={styles.timeSalaryWrapper}>
                    <Heading size="m" bold marginBottom>「{data.searchQuery}」的薪資工時</Heading>
                    {data.salary &&
                      <Columns
                        Item={TimeSalaryBlock}
                        items={(data.workings || []).map(o => ({ data: o }))}
                        gutter="s"
                      />
                    }
                  </section>
                </div>
              }
            </section>
          </div>
        </Wrapper>
      </Section>
    );
  }
}

export default ExperienceSearch;
