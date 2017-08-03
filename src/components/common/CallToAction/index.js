import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { Section, Wrapper, Heading } from 'common/base';
import styles from './CallToAction.module.css';

const CallToAction = ({ heading, headingSize, imgSrc, buttonText, bgColor }) => (
  <Section padding bg={bgColor}>
    <Wrapper size="m" className={styles.container}>
      <div className={styles.image}>
        <img src={imgSrc} alt="留下你的資訊" />
      </div>
      <div className={styles.content}>
        <Heading size={headingSize} className={styles.heading} Tag="h3">
          {heading}
        </Heading>
        <Link to="/share" className={cn('buttonCircleL', 'buttonBlack2')}>{buttonText}</Link>
      </div>
    </Wrapper>
  </Section>
);
CallToAction.propTypes = {
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};
CallToAction.defaultProps = {
  heading: '覺得很有用嗎？也留下你的資訊吧！',
  headingSize: 'm',
  buttonText: '留下資料',
  imgSrc: 'https://image.goodjob.life/cta-01.jpg',
  bgColor: 'white',
};


export default CallToAction;
