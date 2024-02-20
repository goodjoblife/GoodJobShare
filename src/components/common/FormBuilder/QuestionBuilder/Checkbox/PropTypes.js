import PropTypes from 'prop-types';

export const ValuePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const OptionPropType = PropTypes.oneOfType([
  ValuePropType,
  PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    value: ValuePropType.isRequired,
  }),
]);
