import React from 'react';
import Helmet from 'react-helmet';

import Columns from '../common/Columns';
import Container from './Container';
import LectureEntry from './LectureEntry';

class LaborLecture extends React.Component {
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
            Item={LectureEntry}
            items={this.props.items}
          />
        </Container>
      </main>
    );
  }
}

LaborLecture.propTypes = {
  items: React.PropTypes.array,
  loadLaborRights: React.PropTypes.func.isRequired,
};

export default LaborLecture;
