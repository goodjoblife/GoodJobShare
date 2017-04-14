import React from 'react';
import Helmet from 'react-helmet';

import Container from './Container';
import BackButton from './BackButton';
import Body from './Body';
import MarkdownParser from './MarkdownParser';
import Feedback from './Feedback';
import Pagers from './Pagers';
import CallToAction from './CallToAction';
import Seperator from './Seperator';

import styles from './LaborRights.module.css';

class Lecture extends React.Component {
  componentDidMount() {
    this.props.download();
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

Lecture.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  prev: React.PropTypes.string,
  next: React.PropTypes.string,
  download: React.PropTypes.func.isRequired,
};

export default Lecture;
