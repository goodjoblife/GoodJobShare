import React from 'react';
import cn from 'classnames';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Columns from '../common/Columns';
import Container from './Container';
import LaborRightsEntry from './LaborRightsEntry';
import styles from './LaborRightsMenu.module.css';

class LaborRightsMenu extends React.Component {
  componentDidMount() {
    this.props.loadLaborRights();
  }

  render() {
    return (
      <main className="wrapperL">
        <Helmet title="勞動小教室" />
        <Container>
          <h1 className={cn(styles.heading, 'headingL')}>勞動小教室</h1>
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
