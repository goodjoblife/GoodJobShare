import React from 'react';
import Helmet from 'react-helmet';
import * as contentful from 'contentful';
import Container from './Container';
import BackButton from './BackButton';
import Content from './Content';
import Feedback from './Feedback';
import Pagers from './Pagers';
import CallToAction from './CallToAction';
import Seperator from './Seperator';

import styles from './LaborRights.module.css';

class Lecture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: [],
    };
  }

  componentDidMount() {
    const SPACE_ID = 'siutzcg6nl4g';
    const ACCESS_TOKEN =
      'ef08dee7812e4bbd8c9856776426ade160ea263c2972d19b381b29aae95e4c61';

    const client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    });

    client.getEntry(this.props.id).then(
      ({ fields: { title, content } }) => {
        this.setState({
          title,
          content,
        });
      }
    ).catch(() => {});
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        <Container>
          <BackButton />
          <h3 className={`headingL ${styles.header}`}>
            {this.state.title}
          </h3>
          <Content content={this.state.content}>
            <Feedback />
            <Seperator />
            <Pagers />
          </Content>
          <CallToAction />
        </Container>
      </main>
    );
  }
}

Lecture.propTypes = {
  id: React.PropTypes.string,
};

export default Lecture;
