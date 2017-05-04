import React from 'react';
import cn from 'classnames';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
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
    return (
      <main className={cn('wrapperL', styles.wrapper)}>
        <Helmet title="勞動小教室" />
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
              <h1 className={cn(styles.heading, 'headingL')}>勞動小教室</h1>
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
