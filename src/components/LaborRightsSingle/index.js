import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Container from './Container';
import BackButton from './BackButton';
import Body from './Body';
import MarkdownParser from './MarkdownParser';
import Feedback from './Feedback';
import Pagers from './Pagers';
import CallToAction from './CallToAction';
import Seperator from './Seperator';

import styles from './LaborRightsSingle.module.css';

class LaborRightsSingle extends React.Component {
  componentDidMount() {
    this.props.loadLaborRights();
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        <Container>
          <BackButton />
          <h3 className={`headingL ${styles.header}`}>
            {this.props.title}
          </h3>
          <Body>
            <MarkdownParser content={this.props.content} />
            <Feedback />
            <Seperator />
            <Pagers
              prev={this.props.prev}
              next={this.props.next}
            />
          </Body>
          <CallToAction />
        </Container>
      </main>
    );
  }
}

LaborRightsSingle.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  prev: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
  loadLaborRights: React.PropTypes.func.isRequired,
};

export default LaborRightsSingle;
