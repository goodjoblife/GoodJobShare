import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  fetchMetaListIfNeeded,
} from '../../actions/laborRightsMenu';
import status from '../../constants/status';
import Columns from '../common/Columns';
import Container from './Container';
import LaborRightsEntry from './LaborRightsEntry';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchMetaListIfNeeded());
  }

  componentDidMount() {
    this.props.fetchMetaListIfNeeded();
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        {
          (this.props.status === status.UNFETCHED
          || this.props.status === status.FETCHING) &&
            <Container>
              <h1 className="headingL">LOADING</h1>
            </Container>
        }
        {
          this.props.status === status.ERROR &&
            this.props.error &&
              <Container>
                <h1 className="headingL">
                  {this.props.error.toString()}
                </h1>
              </Container>
        }
        {
          this.props.status === status.FETCHED &&
            <Container>
              <h1 className="headingL">勞動小教室</h1>
              <Columns
                Item={LaborRightsEntry}
                items={this.props.metaList.toJS()}
              />
            </Container>
        }
      </main>
    );
  }
}

LaborRightsMenu.propTypes = {
  metaList: ImmutablePropTypes.list.isRequired,
  fetchMetaListIfNeeded: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  error: React.PropTypes.instanceOf(Error),
};

export default LaborRightsMenu;
