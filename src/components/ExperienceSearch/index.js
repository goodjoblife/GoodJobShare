import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import ReactGA from 'react-ga';

import Loader from 'common/Loader';
import { Section, Wrapper, Heading, P } from 'common/base';
import Columns from 'common/Columns';
import Button from 'common/button/Button';
import { ArrowLeft } from 'common/icons';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import TimeSalaryBlock from './TimeSalaryBlock';
import Filter from './Filter';
import { Banner1, Banner2 } from './Banners';
import { fetchExperiences } from '../../actions/experienceSearch';

import { HELMET_DATA } from '../../constants/helmetData';
import getScale from '../../utils/numberUtils';

import { GA_CATEGORY, GA_ACTION } from '../../constants/gaConstants';

const SORT = {
  CREATED_AT: 'created_at',
  POPULARITY: 'popularity',
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
    const data = HELMET_DATA.EXPERIENCE_SEARCH;
    data.meta.push(
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    );
    return <Helmet {...data} />;
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
                fetchKeywords={fetchKeywords}
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

              <div className={styles.pagination}>
                <P size="m" className={styles.info}>1-20 篇 (共 93 篇)</P>
                <div>
                  <Button btnStyle="firstPage">第一頁</Button>
                  <Button btnStyle="page"><ArrowLeft />前一頁</Button>
                  <Button btnStyle="page" disabled>下一頁<ArrowLeft style={{ transform: 'scaleX(-1)' }} /></Button>
                </div>
              </div>

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
