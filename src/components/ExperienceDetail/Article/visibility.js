import PropTypes from 'prop-types';

const VISIBLE = 'VISIBLE';
const COLLAPSED = 'COLLAPSED';
const LOCKED = 'LOCKED';

const VISIBILITY = {
  VISIBLE,
  COLLAPSED,
  LOCKED,
};

export default VISIBILITY;

export const VisibilityPropTypes = PropTypes.oneOf(Object.values(VISIBILITY));
