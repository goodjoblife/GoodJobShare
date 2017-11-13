import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
// import InfiniteScroll from 'react-infinite-scroller';
import { browserHistory } from 'react-router';

import ReactGA from 'react-ga';

// import Loader from 'common/Loader';
import { Section, Wrapper, Heading, P } from 'common/base';
import Columns from 'common/Columns';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import {
  fetchExperiences as fetchExperiencesAction,
  setSearchType as setSearchTypeAction,
} from '../../actions/experienceSearch';
import { HELMET_DATA } from '../../constants/helmetData';
import {
  PAGE_COUNT,
} from '../../constants/experienceSearch';
import TimeSalaryBlock from './TimeSalaryBlock';
import Filter from './Filter';
import { Banner1, Banner2 } from './Banners';

import Pagination from './Pagination';

import getScale from '../../utils/numberUtils';

import {
  searchQuerySelector,
  searchBySelector,
  sortBySelector,
  searchTypeSelector,
  handleSearchType,
  toQsString,
} from './helper';
import { GA_CATEGORY, GA_ACTION } from '../../constants/gaConstants';

const SORT = {
  CREATED_AT: 'created_at',
  POPULARITY: 'popularity',
};

class ExperienceSearch extends Component {
  static fetchData({ query, store: { dispatch } }) {
    const sort = sortBySelector(query);
    const searchBy = searchBySelector(query);
    const searchQuery = searchQuerySelector(query);
    const searchType = searchTypeSelector(query);

    dispatch(setSearchTypeAction(searchType));
    return dispatch(fetchExperiencesAction(0, PAGE_COUNT, sort, searchBy, searchQuery));
  }

  static propTypes = {
    setSearchType: PropTypes.func.isRequired,
    setKeyword: PropTypes.func.isRequired,
    fetchExperiences: PropTypes.func.isRequired,
    fetchMoreExperiences: PropTypes.func.isRequired,
    fetchWorkings: PropTypes.func.isRequired,
    getNewSearchBy: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      query: PropTypes.object,
      pathname: PropTypes.string,
    }),
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
      setSearchType,
    } = this.props;

    const {
      query,
    } = this.props.location;

    const sort = sortBySelector(query);
    const searchBy = searchBySelector(query);
    const searchQuery = searchQuerySelector(query);
    const searchType = searchTypeSelector(query);

    setSearchType(searchType);

    fetchExperiences(0, PAGE_COUNT, sort, searchBy, searchQuery);
    this.props.getNewSearchBy(searchBy);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const {
        fetchExperiences,
        setSearchType,
      } = nextProps;

      const {
        query,
      } = nextProps.location;

      const sort = sortBySelector(query);
      const searchBy = searchBySelector(query);
      const searchQuery = searchQuerySelector(query);
      const searchType = searchTypeSelector(query);

      setSearchType(searchType);

      fetchExperiences(0, PAGE_COUNT, sort, searchBy, searchQuery);
    }
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

    const sort = sortBySelector(query);
    const searchQuery = searchQuerySelector(query);
    const searchBy = searchBySelector(query);
    const prevSearchType = searchTypeSelector(query);

    const nextSearchType = handleSearchType(searchType)(prevSearchType);

    const queryString = toQsString({
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

    const sort = sortBySelector(query);
    const searchQuery = searchQuerySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery,
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

    const sort = sortBySelector(query);
    const searchBy = searchBySelector(query);

    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery: val,
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

    const searchBy = searchBySelector(query);
    const queryString = toQsString({
      sort,
      searchBy,
      searchQuery: '',
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
    return this.props.fetchMoreExperiences(nextPage);
  }

  renderHelmet = () => {
    const scale = getScale(this.props.experienceSearch.get('experienceCount'));
    const description = `馬上查詢超過 ${scale} 篇面試及工作經驗分享，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;
    const data = HELMET_DATA.EXPERIENCE_SEARCH;
    data.meta.push(
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    );
    return <Helmet {...data} />;
  }

  render() {
    const {
      setKeyword,
      experienceSearch,
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
                  <div className={styles.searchResultNum}>1-20 篇 (共&nbsp;{data.experienceCount}&nbsp;篇)</div>
                </div>
              }

              {(data.searchQuery && data.experienceCount === 0) &&
                <P
                  size="l" bold
                  className={styles.searchNoResult}
                >
                    尚未有「{data.searchQuery}」的經驗分享
                </P>
              }

              <Banner2 />

              {
                (data.experiences || [])
                  .map(o => (
                    data.searchType.includes(o.type) && (
                      <ExperienceBlock
                        key={o._id}
                        to={`/experiences/${o._id}`}
                        data={o}
                        size="l"
                        backable
                      />
                    )
                  ))
              }

              <Pagination />

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
