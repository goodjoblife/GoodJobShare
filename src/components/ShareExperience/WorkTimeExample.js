import React, { useState } from 'react';
import Question from 'common/icons/Question';
import commonStyles from './styles.module.css';

const WorkTimeExample = ({ children }) => {
  const [showsExample, setShowsExample] = useState(false);
  const toggle = () => setShowsExample(!showsExample);
  return (
    <div className={commonStyles.example}>
      <button onClick={toggle}>
        <Question className={commonStyles.icon} />
        我有疑問
      </button>
      {showsExample && <p>{children}</p>}
    </div>
  );
};

export default WorkTimeExample;
