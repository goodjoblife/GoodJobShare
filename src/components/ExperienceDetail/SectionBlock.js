import React, { PropTypes } from 'react';

const SectionBlock = ({ section }) => (
  <section>
    <h3 className={'pLBold'}>{section.subtitle}</h3>
    <p className={'pL'}>{section.content}</p>
    <br />
  </section>
);

SectionBlock.propTypes = {
  section: PropTypes.object.isRequired,
};

export default SectionBlock;
