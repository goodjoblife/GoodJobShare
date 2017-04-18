import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Columns from '../common/Columns';
import Container from './Container';
import LaborRightsEntry from './LaborRightsEntry';

class LaborRightsMenu extends React.Component {
  componentDidMount() {
    this.props.loadLaborRights();
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        <Container>
          <p className="headingL">勞動小教室</p>
          <Columns
            Item={LaborRightsEntry}
            items={this.props.items.toJS()}
          />
        </Container>
      </main>
    );
  }
}

LaborRightsMenu.propTypes = {
  items: ImmutablePropTypes.list.isRequired,
  loadLaborRights: React.PropTypes.func.isRequired,
};

export default LaborRightsMenu;
