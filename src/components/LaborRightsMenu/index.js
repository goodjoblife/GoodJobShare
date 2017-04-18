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
        <Helmet title="勞動小教室 | 工時薪資透明化運動" />
        <Container>
          <h1 className="headingL">勞動小教室</h1>
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
