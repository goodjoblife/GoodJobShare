import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Container from './Container';
import BackButton from './BackButton';
import Body from './Body';
import HidingText from './HidingText';
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
    const {
      title,
      description,
      content,
      coverUrl,
    } = this.props.item ? this.props.item.toJS() : {};
    const {
      seoTitle = title,
      seoDescription,
      hidingText,
    } = this.props.item ? this.props.item.toJS() : {};
    return (
      <main>
        <Helmet
          title={`${seoTitle} | 工時薪資透明化運動`}
          meta={[
            { name: 'description', content: seoDescription },
            { property: 'og:image', content: coverUrl },
          ]}
        />
        <Container>
          <BackButton />
          <h1 className={`headingL ${styles.header}`}>
            {title}
          </h1>
          <Body>
            <HidingText content={hidingText} />
            <MarkdownParser content={description} />
            <MarkdownParser content={content} />
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
  item: ImmutablePropTypes.map,
  prev: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
  loadLaborRights: React.PropTypes.func.isRequired,
};

export default LaborRightsSingle;
