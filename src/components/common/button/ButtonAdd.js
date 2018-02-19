import React from 'react';
import PropTypes from 'prop-types';
import ButtonAddElement from './ButtonAddElement';
import AddButton from './AddButton';
import styles from './ButtonAdd.module.css';

class ButtonAdd extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleStage = this.handleStage.bind(this);

    this.state = {
      stage: 0,
    };
  }

  handleStage() {
    return this.setState(state => ({
      stage: state.stage === 0 ? 1 : 0,
    }));
  }
  render() {
    const {
      options,
      custimizedValues,
      disabledValues,
      appendBlock,
    } = this.props;

    const {
      stage,
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.button}>
          <AddButton
            active={stage !== 0}
            onClick={this.handleStage}
            addSection
          />
        </div>
        <div className={styles.sectionButtons}>
          {
            stage !== 0 ?
              options.map(ele =>
                <span
                  key={ele.value}
                  style={{
                    marginRight: '15px',
                    marginBottom: '10px',
                  }}
                >
                  <ButtonAddElement
                    text={ele.label}
                    custimized={custimizedValues.includes(ele.value)}
                    disabled={disabledValues.includes(ele.value)}
                    onClick={() => {
                      appendBlock(ele.value, ele.placeholder, ele.titlePlaceholder);
                      this.handleStage();
                    }}
                  />
                </span>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

ButtonAdd.propTypes = {
  custimizedValues: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ),
  disabledValues: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  appendBlock: PropTypes.func,
};
ButtonAdd.defaultProps = {
  custimizedValues: [],
  disabledValues: [],
};

export default ButtonAdd;
