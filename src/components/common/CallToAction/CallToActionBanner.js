import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Section, Wrapper, Heading } from 'common/base';
import CtaImage from './cta-01.jpg';
import styles from './CallToActionBanner.module.css';

const CallToActionBanner = ({
  heading,
  headingSize,
  imgSrc,
  buttonText,
  bgColor,
  marginTop,
}) => (
  <Section padding bg={bgColor} marginTop={marginTop}>
    <Wrapper size="m" className={styles.container}>
      <div className={styles.image}>
        <img src={imgSrc} alt="留下你的資訊" />
      </div>
      <div className={styles.content}>
        <Heading size={headingSize} className={styles.heading} Tag="h3">
          {heading}
        </Heading>
        <Link to="/share" className={cn('buttonCircleL', 'buttonBlack2')}>
          {buttonText}
        </Link>
      </div>
    </Wrapper>
  </Section>
);

CallToActionBanner.propTypes = {
  bgColor: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  marginTop: PropTypes.bool,
};

CallToActionBanner.defaultProps = {
  heading: '覺得小教室很有用嗎？快分享你的資訊吧！',
  headingSize: 'm',
  buttonText: '立即分享',
  imgSrc: CtaImage,
  bgColor: 'white',
};

export default CallToActionBanner;
