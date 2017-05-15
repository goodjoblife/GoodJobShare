import React from 'react';
import cn from 'classnames';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import {
  formatTitle,
  formatCanonicalPath,
} from 'utils/helmetHelper';
import {
  fetchMetaListIfNeeded,
} from '../../actions/laborRightsMenu';
import status from '../../constants/status';
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
    return (
      <main className={cn('wrapperL', styles.wrapper)}>
        <Helmet
          title={formatTitle(title)}
          meta={[
            { property: 'og:url', content: formatCanonicalPath('/labor-rights') },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: formatTitle(title) },
          ]}
          link={[
            { rel: 'canonical', href: formatCanonicalPath('/labor-rights') },
          ]}
        />
        {this.props.status === status.FETCHING && <Loader />}
        {
          this.props.status === status.ERROR && this.props.error &&
            <div className={cn(styles.heading, 'headingL')}>
              {this.props.error.toString()}
            </div>
        }
        {
          this.props.status === status.FETCHED &&
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
  status: React.PropTypes.string.isRequired,
  error: ImmutablePropTypes.map,
};

export default LaborRightsMenu;
