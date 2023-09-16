import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import { queryPopularExperiences } from 'actions/popularExperiences';
import { queryPopularCompanyAverageSalary } from 'actions/popularCompanyAverageSalary';
import { queryPopularJobTitleSalaryDistribution } from 'actions/popularJobTitleSalaryDistribution';

const mapStateToProps = state => ({
  popularCompanyAverageSalary: state.popularCompanyAverageSalary.data,
  popularCompanyAverageSalaryStatus: state.popularCompanyAverageSalary.status,
  popularJobTitleSalaryDistribution:
    state.popularJobTitleSalaryDistribution.data,
  popularJobTitleSalaryDistributionStatus:
    state.popularJobTitleSalaryDistribution.status,
  popularExperiences: state.popularExperiences.get('data'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryPopularExperiences,
      queryPopularCompanyAverageSalary,
      queryPopularJobTitleSalaryDistribution,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
