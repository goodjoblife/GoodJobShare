import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import ReactGA from 'react-ga';

import Checkbox from 'common/form/Checkbox';
import Loader from 'common/Loader';
import { Section, Wrapper } from 'common/base';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import WorkingHourBlock from './WorkingHourBlock';
import { fetchExperiences } from '../../actions/experienceSearch';

import { PAGE_NAMES } from '../../constants/helmetConstants';
import { HelmetData } from '../../utils/helmetHelper';
import getScale from '../../utils/numberUtils';

import { GA_CATEGORY, GA_ACTION } from '../../constants/gaConstants';

const SORT = { CREATED_AT: 'created_at', POPULARITY: 'popularity' };
const SEARCH_TYPE = {
  INTERVIEW: 'interview',
  WORK: 'work',
  SALARY: 'salary',
};

class ExperienceSearch extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(fetchExperiences('sort', '', 0));
  }

  static propTypes = {
    setSearchType: PropTypes.func.isRequired,
    setKeyword: PropTypes.func.isRequired,
    fetchExperiences: PropTypes.func.isRequired,
    fetchMoreExperiences: PropTypes.func.isRequired,
    fetchWorkings: PropTypes.func.isRequired,
    fetchKeywords: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
  }

  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeywordClick = this.handleKeywordClick.bind(this);
    this.fetchExperiencesWithSort = this.fetchExperiencesWithSort.bind(this);
    this.fetchExperiencesAndWorkings = this.fetchExperiencesAndWorkings.bind(this);
  }

  componentDidMount() {
    this.props.fetchExperiences('sort', '', 0);
    this.props.fetchKeywords('');
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
    this.props.setSearchType(e);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const val = e.target.value;
      this.fetchExperiencesAndWorkings(val);
    }
  }

  handleKeywordClick(e) {
    const val = e.target.innerHTML;
    this.fetchExperiencesAndWorkings(val);
  }

  fetchExperiencesAndWorkings(val) {
    ReactGA.event({
      category: GA_CATEGORY.SEARCH_EXPERIENCE,
      action: `${GA_ACTION.SEARCH_BY}_${this.props.experienceSearch.get('searchBy')}`,
      value: val,
    });
    this.props.fetchExperiences('searchBy', val, 0);
    this.props.fetchWorkings(val);
  }

  fetchExperiencesWithSort(e) {
    const value = e.target.value;
    if (value === SORT.CREATED_AT) {
      ReactGA.event({
        category: GA_CATEGORY.SEARCH_EXPERIENCE,
        action: GA_ACTION.CLICK_LATEST,
      });
    } else if (value === SORT.POPULARITY) {
      ReactGA.event({
        category: GA_CATEGORY.SEARCH_EXPERIENCE,
        action: GA_ACTION.CLICK_POPULAR,
      });
    }
    this.props.fetchExperiences('sort', e.target.value, 0);
  }

  fetchMoreExperiences = nextPage => {
    ReactGA.event({
      category: GA_CATEGORY.SEARCH_EXPERIENCE,
      action: GA_ACTION.FETCH_MORE,
      value: nextPage,
    });
    this.props.fetchMoreExperiences(nextPage);
  }

  renderHelmet = () => {
    const scale = getScale(this.props.experienceSearch.get('experienceCount'));
    const description = `馬上查詢超過 ${scale} 篇面試及工作經驗分享，讓我們一起把面試準備的更好，也更瞭解公司內部的真實樣貌，找到更適合自己的好工作！`;
    const helmetData = new HelmetData(PAGE_NAMES.EXPERIENCE_SEARCH);
    helmetData.setData({
      description,
      'og:description': description,
    });
    return <Helmet {...helmetData.getData()} />;
  }

  render() {
    const {
      /* setSort, setIndustry, */ fetchKeywords, setKeyword,
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
                  className={data.sort === SORT.CREATED_AT
                    ? `${styles.frontButton} ${styles.toggle}`
                    : styles.frontButton}
                  onClick={this.fetchExperiencesWithSort} value={SORT.CREATED_AT}
                >
                  最新
                </button>
                <button
                  className={data.sort === SORT.POPULARITY
                    ? `${styles.rearButton} ${styles.toggle}`
                    : styles.rearButton}
                  onClick={this.fetchExperiencesWithSort} value={SORT.POPULARITY}
                >
                  熱門
                </button>
              </section>
              <hr className={styles.splitter} />
              <div className={styles.fliters}>
                {
                  [
                    { label: '面試經驗', value: SEARCH_TYPE.INTERVIEW },
                    { label: '工作經驗', value: SEARCH_TYPE.WORK },
                    { label: '薪資工時', value: SEARCH_TYPE.SALARY },
                  ].map(o => (
                    <Checkbox
                      key={o.value} id={`searchType-${o.value}`}
                      label={o.label} value={o.value}
                      disabled={o.value === 'salary' && !data.searchQuery}
                      onChange={this.setSearchType}
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
                fetchKeywords={fetchKeywords}
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
                    this.fetchMoreExperiences(nextPage);
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
