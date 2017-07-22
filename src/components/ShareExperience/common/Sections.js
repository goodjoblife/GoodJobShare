import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Element as ScrollElement } from 'react-scroll';

import SectionEle from './SectionEle';

import styles from './Sections.module.css';
import { VALID, INVALID, SECTIONS } from '../../../constants/formElements';

class Sections extends React.Component {
  constructor(props) {
    super(props);
    const isValid = props.validator(props.sections);
    props.changeValidationStatus(SECTIONS, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.sections);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      this.props.changeValidationStatus(SECTIONS, isValid ? VALID : INVALID);
    }
  }

  render() {
    const { sections, removeSection, editSection, submitted } = this.props;
    const isWarning = submitted && !this.state.isValid;
    return (
      <div
        className={isWarning ? styles.warning : ''}
      >
        <ScrollElement name={SECTIONS} />
        {
          sections.map(section =>
            <div
              key={section.id}
              style={{
                marginBottom: '40px',
              }}
            >
              <SectionEle
                subtitle={section.subtitle}
                content={section.content}
                isSubtitleEditable={section.isSubtitleEditable}
                editSection={editSection(section.id)}
                removeSection={() => removeSection(section.id)}
              />
            </div>
          )
        }
        {
          isWarning ?
            <p
              className={cn(styles.warning__wording, 'pS')}
            >
              需填寫一則內容（包含完整的標題及內文）
            </p>
            : null
        }
      </div>
    );
  }
}

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    isSubtitleEditable: PropTypes.bool,
  })),
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default Sections;
