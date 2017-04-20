import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { status, fetchLaborRights } from '../../actions/laborRights';
import Columns from '../common/Columns';
import Container from './Container';
import LaborRightsEntry from './LaborRightsEntry';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchLaborRights());
  }

  componentDidMount() {
    this.props.fetchLaborRights();
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        {
          this.props.status === status.FETCHING &&
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
  fetchLaborRights: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  error: React.PropTypes.object,
};

export default LaborRightsMenu;
