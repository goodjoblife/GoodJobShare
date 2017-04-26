import React from 'react';
import cn from 'classnames';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { status, fetchLaborRightsIfNeeded } from '../../actions/laborRights';
import Columns from '../common/Columns';
import Container from './Container';
import LaborRightsEntry from './LaborRightsEntry';
import styles from './LaborRightsMenu.module.css';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchLaborRightsIfNeeded());
  }

  componentDidMount() {
    this.props.fetchLaborRightsIfNeeded();
  }

  render() {
    return (
      <main className="wrapperL">
        <Helmet title="勞動小教室" />
        {
          this.props.status === status.FETCHING &&
            <Container>
              <h1 className={cn(styles.heading, 'headingL')}>LOADING</h1>
            </Container>
        }
        {
          this.props.status === status.ERROR &&
            this.props.error &&
              <Container>
                <h1 className={cn(styles.heading, 'headingL')}>
                  {this.props.error.toString()}
                </h1>
              </Container>
        }
        {
          this.props.status === status.FETCHED &&
            <Container>
              <h1 className={cn(styles.heading, 'headingL')}>勞動小教室</h1>
              <Columns
                Item={LaborRightsEntry}
                items={this.props.items.toJS()}
              />
            </Container>
        }
      </main>
    );
  }
}

LaborRightsMenu.propTypes = {
  items: ImmutablePropTypes.list.isRequired,
  fetchLaborRightsIfNeeded: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  error: React.PropTypes.instanceOf(Error),
};

export default LaborRightsMenu;
