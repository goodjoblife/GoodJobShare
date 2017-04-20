import React, { PropTypes } from 'react';
import TextInput from 'common/form/TextInput';
import Select from 'common/form/Select';

import styles from './InterviewInfo.module.css';

import InputTitle from '../common/InputTitle';

import {
  checkWordingLength,
} from '../utils';

import {
  regionOptions,
  experienceInYearOptions,
  educationOptions,
} from '../common/optionMap';

class InterviewInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      companyQuery,
      region,
      jobTitle,
      experienceInYear,
      education,
      interviewTimeYear,
      interviewTimeMonth,
    } = this.props;

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
          面試資訊
        </h1>
        <div className={styles.form}>
          <div
            style={{
              marginBottom: '35px',
            }}
          >
            <InputTitle
              text="公司/單位 或 統一編號"
              must
            />
            <TextInput
              placeholder="ＯＯ 股份有限公司"
              value={companyQuery}
              onChange={e => handleState('companyQuery')(e.target.value)}
              isWarning={!checkWordingLength(10)(companyQuery)}
              warningWording="請輸入10個字以內"
            />
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <InputTitle
              text="面試地區"
              must
            />
            <div
              style={{
                width: '320px',
              }}
            >
              <Select
                options={regionOptions}
                value={region}
                onChange={
                  e => handleState('region')(e.target.value)
                }
              />
            </div>
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <InputTitle
              text="應徵職務"
              must
            />
            <div
              style={{
                width: '320px',
              }}
            >
              <TextInput
                placeholder="硬體工程師"
                value={jobTitle}
                onChange={
                  e => handleState('jobTitle')(e.target.value)
                }
                isWarning={!checkWordingLength(10)(jobTitle)}
                warningWording="請輸入10個字以內"
              />
            </div>
          </div>
          <div
            style={{
              marginBottom: '52px',
            }}
          >
            <InputTitle
              text="相關職務工作經驗"
            />
            <div
              style={{
                width: '320px',
                position: 'relative',
              }}
            >
              <Select
                options={experienceInYearOptions}
                value={experienceInYear}
                onChange={
                  e => handleState('experienceInYear')(e.target.value)
                }
              />
              <p
                className="pS"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  transform: 'translate(16px, -50%)',
                }}
              >
                年
              </p>
            </div>
          </div>
          <div
            style={{
              marginBottom: '64px',
            }}
          >
            <InputTitle
              text="最高學歷"
            />
            <div
              style={{
                width: '320px',
              }}
            >
              <Select
                options={educationOptions}
                value={education}
                onChange={
                  e => handleState('education')(e.target.value)
                }
              />
            </div>
          </div>
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <InputTitle
              text="面試時間"
              must
            />
            <div
              style={{
                display: 'flex',
              }}
            >
              <div
                style={{
                  marginRight: '35px',
                }}
              >
                <div
                  style={{
                    width: '110px',
                    display: 'inline-block',
                    marginRight: '11px',
                  }}
                >
                  <Select
                    options={educationOptions}
                    value={interviewTimeYear}
                    onChange={
                      e => handleState('interviewTimeYear')(e.target.value)
                    }
                  />
                </div>
                <p
                  className="pS"
                  style={{
                    display: 'inline-block',
                  }}
                >
                  年
                </p>
              </div>
              <div>
                <div
                  style={{
                    width: '110px',
                    display: 'inline-block',
                    marginRight: '11px',
                  }}
                >
                  <Select
                    options={educationOptions}
                    value={interviewTimeMonth}
                    onChange={
                      e => handleState('interviewTimeMonth')(e.target.value)
                    }
                  />
                </div>
                <p
                  className="pS"
                  style={{
                    display: 'inline-block',
                  }}
                >
                  月
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InterviewInfo.propTypes = {
  companyQuery: PropTypes.string,
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  jobTitle: PropTypes.string,
  handleState: PropTypes.func,
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewTimeYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewTimeMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default InterviewInfo;
