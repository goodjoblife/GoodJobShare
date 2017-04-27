import React from 'react';
import R from 'ramda';
import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';
import InterviewExperience from './InterviewExperience';

const sortById = R.sortBy(R.prop('id'));

const createSection = id => ({
  id,
  subtitle: `${id}請輸入標題，例：面試過程`,
  content: `
    風的同些教小示作水究大的主、有結人營水量生。愛生一爭層？媽孩音朋故下流子洲形、出世了上？
    麼他研黨然優仍，星的自人不這元生；不道考亞線點等水住負我留際裡二；早技著元相思，環可綠看
    。多創所美具微民原包差。變起合、體營旅、力只地量品的？為為帶名每我，下條人馬法這、得自送
    不內刻來筆，然冷包生常地一，他的賽熱訴了速更家作的說身理車種北易陽力面個管孩自賽值有場正
    調國量前看能室頭師久人有教他制治公色他、底致血！市格標業中則方氣在來細了夫大經當前或馬城
    檢生員大動心進是看得個！平法頭：什過上，我提來常系有一非不算自人子五母健對有容，好聲及本。
  `,
});

const sectionIdGenerator = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const sectionIdCounter = sectionIdGenerator();


class InterviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.appendSection = this.appendSection.bind(this);
    this.removeSection = this.removeSection.bind(this);
    this.editSection = this.editSection.bind(this);

    this.state = {
      companyQuery: '',
      region: null,
      jobTitle: '',
      experienceInYear: null,
      education: null,
      interviewTimeYear: null,
      interviewTimeMonth: null,
      interviewResult: null,
      salaryType: 'month',
      salaryAmount: '',
      overallRating: 3,
      title: '',
      sections: [
        createSection(sectionIdCounter()),
      ],
    };
  }

  handleState(key) {
    return value =>
      this.setState({
        [key]: value,
      });
  }

  appendSection() {
    return this.setState(state => ({
      sections: [
        ...state.sections,
        createSection(sectionIdCounter()),
      ],
    }));
  }

  removeSection(id) {
    return this.setState(state => ({
      sections: state.sections.filter(
        section => section.id !== id
      ),
    }));
  }

  editSection(id) {
    return key => value =>
      this.setState(state => ({
        sections: [
          ...state.sections.filter(
            section => section.id !== id
          ),
          {
            ...state.sections.find(
              section => section.id === id
            ),
            [key]: value,
          },
        ],
      }));
  }

  render() {
    return (
      <div className={styles.container}>
        <h1
          className="headingL"
        >
          面試經驗分享
        </h1>
        <InterviewInfo
          handleState={this.handleState}
          companyQuery={this.state.companyQuery}
          region={this.state.region}
          jobTitle={this.state.jobTitle}
          experienceInYear={this.state.experienceInYear}
          education={this.state.education}
          interviewTimeYear={this.state.interviewTimeYear}
          interviewTimeMonth={this.state.interviewTimeMonth}
          interviewResult={this.state.interviewResult}
          salaryType={this.state.salaryType}
          salaryAmount={this.state.salaryAmount}
          overallRating={this.state.overallRating}
        />
        <InterviewExperience
          handleState={this.handleState}
          title={this.state.title}
          sections={sortById(this.state.sections)}
          appendSection={this.appendSection}
          removeSection={this.removeSection}
          editSection={this.editSection}
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
