import React from 'react';
import Helmet from 'react-helmet';
import * as contentful from 'contentful';

import Desktop from './Desktop';
import BackButton from './BackButton';
import Content from './Content';
import Feedback from './Feedback';
import Pagers from './Pagers';
import Footer from './Footer';
import Seperator from './Seperator';
import styles from './Lecture.module.css';

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

    client.getEntry(this.props.lecture_id).then(
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
        <Desktop>
          <BackButton />
          <h3 className={styles.header}>{this.state.title}</h3>
          <Content>
            {
              this.state.content.map(({ type, data }, i) => (
                <p key={i} className={styles.content_para}>
                  {
                    (
                      type === 'text' && (
                        (data === '' && '\u00A0') || data
                      )
                    ) || (
                      type === 'image' && (
                        <img
                          className={styles.content_image}
                          role="presentation"
                        />
                      )
                    )
                  }
                </p>
              ))
            }
            <Feedback />
            <Seperator />
            <Pagers />
          </Content>
          <Footer />
        </Desktop>
      </main>
    );
  }
}

Lecture.propTypes = {
  lecture_id: React.PropTypes.string,
};

export default Lecture;
