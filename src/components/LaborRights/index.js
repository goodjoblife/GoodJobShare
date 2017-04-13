import React from 'react';
import Helmet from 'react-helmet';

import Container from './Container';
import BackButton from './BackButton';
import Content from './Content';
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
            {this.props.item.title}
          </h3>
          <Content>
            {
              this.props.item.content.map(({ type, data }, i) => (
                <p key={i} className={`pLBold ${styles.para}`}>
                  {
                    (
                      type === 'text' && (
                        (data === '' && '\u00A0') || data
                      )
                    ) || (
                      type === 'image' && (
                        <img
                          className={styles.image}
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
