import React from 'react';
import cn from 'classnames';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import {
  siteName,
  formatTitle,
  formatCanonicalPath,
} from 'utils/helmetHelper';
import {
  fetchMetaListIfNeeded,
} from '../../actions/laborRightsMenu';
import Columns from '../common/Columns';
import LaborRightsEntry from './LaborRightsEntry';
import styles from './LaborRightsMenu.module.css';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchMetaListIfNeeded());
  }

  componentDidMount() {
    this.props.fetchMetaListIfNeeded();
  }

  render() {
    const title = '勞動知識小教室';
    const description = 'GoodJob 工時薪資透明化團隊，看見勞工們的需要，自 2016 年底推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，讓勞工認識自己的權益，學會保護自己。內容涵蓋勞基法、性別工作平等法、就服法以及工會相關法令等勞工必備的權益資訊。';
    return (
      <main className={cn('wrapperL', styles.wrapper)}>
        <Helmet
          title={formatTitle(title)}
          meta={[
            { name: 'description', content: description },
            { property: 'og:url', content: formatCanonicalPath('/labor-rights') },
            { property: 'og:type', content: 'website' },
            { property: 'og:locale', content: 'zh_TW' },
            { property: 'og:description', content: description },
            { property: 'og:title', content: formatTitle(title) },
            { property: 'og:site_name', content: siteName },
            { property: 'og:image', content: 'https://www.goodjob.life/assets/img/common/og-image_1200-630.png' },
          ]}
          link={[
            { rel: 'canonical', href: formatCanonicalPath('/labor-rights') },
          ]}
        />
        {
          this.props.isFetching && <Loader />
        }
        {
          !this.props.isFetching && this.props.error &&
            <div className={cn(styles.heading, 'headingL')}>
              {this.props.error.toString()}
            </div>
        }
        {
          !this.props.isFetching && !this.props.error && this.props.metaList &&
            <div>
              <h1 className={cn(styles.heading, 'headingL')}>{title}</h1>
              <Columns
                Item={LaborRightsEntry}
                items={this.props.metaList.toJS()}
              />
            </div>
        }
      </main>
    );
  }
}

LaborRightsMenu.propTypes = {
  metaList: ImmutablePropTypes.list.isRequired,
  fetchMetaListIfNeeded: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  error: ImmutablePropTypes.map,
};

export default LaborRightsMenu;
