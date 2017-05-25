import React, { PropTypes } from 'react';

import styles from './WorkExperience.module.css';

class WorkExperience extends React.PureComponent {
  render() {
    // const {} = this.props;

    return (
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <h1
          className="pLBold"
          style={{
            marginBottom: '13px',
          }}
        >
          工作經驗
        </h1>
        <div className={styles.form}>
          <p>WorkExperience</p>
        </div>
      </div>
    );
  }
}

WorkExperience.propTypes = {
  handleState: PropTypes.func,
  title: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  })),
  appendSection: PropTypes.func,
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
};

export default WorkExperience;
