import React from 'react';
import PropTypes from 'prop-types';


const Main = ({ children }) => (
  <div>
    {children}
  </div>
);

Main.propTypes = {
  children: PropTypes.element.isRequired,
};


export default Main;
