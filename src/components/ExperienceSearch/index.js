import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import { browserHistory } from 'react-router';


import Checkbox from 'common/form/Checkbox';
import Loader from 'common/Loader';
import { Section, Wrapper } from 'common/base';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import WorkingHourBlock from './WorkingHourBlock';
import { fetchExperiences as fetchExperiencesAction } from '../../actions/experienceSearch';
import { HELMET_DATA } from '../../constants/helmetData';
import {
  PAGE_COUNT,
} from '../../constants/experienceSearch';

import getScale from '../../utils/numberUtils';

import {
  searchQuerySelector,
  searchBySelector,
  sortBySelector,
  toQsString,
} from './helper';

class ExperienceSearch extends Component {
  static fetchData({ query, store: { dispatch } }) {
    const sort = sortBySelector(query);
    const searchBy = searchBySelector(query);
    const searchQuery = searchQuerySelector(query);
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
    } = this.props;

    const {
      query,
    } = this.props.location;

    const sort = sortBySelector(query);
    const searchBy = searchBySelector(query);
    const searchQuery = searchQuerySelector(query);

    fetchExperiences(0, PAGE_COUNT, sort, searchBy, searchQuery);
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

      const sort = sortBySelector(query);
      const searchBy = searchBySelector(query);
      const searchQuery = searchQuerySelector(query);

      fetchExperiences(0, PAGE_COUNT, sort, searchBy, searchQuery);
    }
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

  handleSearchType = searchBy => {
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
      setSearchType,
      setKeyword,
      fetchMoreExperiences,
      experienceSearch,
    } = this.props;
    const data = experienceSearch.toJS();

    return (
      <Section Tag="main" pageTop paddingBottom>
        {this.renderHelmet()}
        <Wrapper size="l">
          <div className={styles.container}>
            <aside className={styles.aside}>
              <section>
                <button
                  className={data.sort === 'created_at'
                    ? `${styles.frontButton} ${styles.toggle}`
                    : styles.frontButton}
                  onClick={e => this.fetchExperiencesWithSort(e.target.value)} value="created_at"
                >
                  最新
                </button>
                <button
                  className={data.sort === 'popularity'
                    ? `${styles.rearButton} ${styles.toggle}`
                    : styles.rearButton}
                  onClick={e => this.fetchExperiencesWithSort(e.target.value)} value="popularity"
                >
                  熱門
                </button>
              </section>
              <hr className={styles.splitter} />
              <div className={styles.fliters}>
                {
                  [
                    { label: '面試經驗', value: 'interview' },
                    { label: '工作經驗', value: 'work' },
                    { label: '薪資工時', value: 'salary' },
                  ].map(o => (
                    <Checkbox
                      key={o.value} id={`searchType-${o.value}`}
                      label={o.label} value={o.value}
                      disabled={o.value === 'salary' && !data.searchQuery}
                      onChange={e => setSearchType(e.target.value)}
                      checked={data[o.value]}
                    />
                  ))
                }
              </div>
            </aside>

            <div className={styles.content}>
              <Searchbar
                className={styles.searcbarLarge}
                data={data}
                handleSearchType={this.handleSearchType}
                setKeyword={setKeyword}
                handleKeyPress={this.handleKeyPress}
                handleKeywordClick={this.handleKeywordClick}
                fetchExperiencesAndWorkings={this.fetchExperiencesAndWorkings}
              />

              {data.searchQuery &&
                <div className={styles.searchResult}>
                  找到 {data.experienceCount} 筆與 &quot;{data.searchQuery}&quot; 相關的資料
                </div>
              }

              <InfiniteScroll
                pageStart={0} hasMore={data.hasMore}
                loadMore={nextPage => {
                  if (data.hasMore) {
                    fetchMoreExperiences(nextPage);
                  }
                }}
                loader={<Loader size="s" />}
              >
                {
                  (data.experiences || []).map(o => (
                    data[o.type] && (
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
              </InfiniteScroll>

              <div className={styles.workingHourWrapper}>
                {
                  data.salary && (data.workings || []).map((o, i) => (
                    <WorkingHourBlock key={o.company.id || i} data={o} />
                  ))
                }
              </div>

            </div>
          </div>
        </Wrapper>
      </Section>
    );
  }
}

export default ExperienceSearch;
