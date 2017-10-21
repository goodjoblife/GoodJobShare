import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';

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

class ExperienceSearch extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(fetchExperiencesAction(0, PAGE_COUNT, 'created_at', 'job_title', ''));
  }

  static propTypes = {
    setSearchType: PropTypes.func.isRequired,
    setKeyword: PropTypes.func.isRequired,
    fetchExperiences: PropTypes.func.isRequired,
    fetchMoreExperiences: PropTypes.func.isRequired,
    fetchWorkings: PropTypes.func.isRequired,
    fetchKeywords: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
    searchBy: PropTypes.string,
    sort: PropTypes.string,
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
      sort,
      searchBy,
      fetchExperiences,
    } = this.props;

    fetchExperiences(0, PAGE_COUNT, sort, searchBy, '');
    this.props.fetchKeywords('');
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
    const {
      sort,
      searchBy,
      fetchExperiences,
    } = this.props;
    fetchExperiences(0, PAGE_COUNT, sort, searchBy, val);
    this.props.fetchWorkings(val);
  }

  fetchExperiencesWithSort(sort) {
    const {
      searchBy,
      fetchExperiences,
    } = this.props;
    fetchExperiences(0, PAGE_COUNT, sort, searchBy, '');
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
      fetchKeywords,
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
