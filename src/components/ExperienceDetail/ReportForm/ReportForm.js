import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ReportForm extends PureComponent {
  render() {
    return (
      <section>
        ReportForm
      </section>
    );
  }
}

ReportForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ReportForm;
