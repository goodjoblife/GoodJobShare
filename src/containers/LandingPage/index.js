import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import { queryMenuIfUnfetched } from '../../actions/laborRights';
import { queryPopularExperiences } from '../../actions/popularExperiences';
import { queryPopularCompanyAverageSalary } from '../../actions/popularCompanyAverageSalary';
import { queryPopularJobTitleSalaryDistribution } from '../../actions/popularJobTitleSalaryDistribution';
import { queryTimeAndSalaryCountIfUnfetched } from '../../actions/timeAndSalary';
import { menuEntriesSelector } from '../../selectors/laborRightsSelector';
import { laborRightsCountSelector } from '../../selectors/countSelector';

const mapStateToProps = state => ({
  popularCompanyAverageSalary: state.popularCompanyAverageSalary.data,
  popularCompanyAverageSalaryStatus: state.popularCompanyAverageSalary.status,
  popularJobTitleSalaryDistribution:
    state.popularJobTitleSalaryDistribution.data,
  popularJobTitleSalaryDistributionStatus:
    state.popularJobTitleSalaryDistribution.status,
  popularExperiences: state.popularExperiences.get('data'),
  laborRightsMenuEntries: menuEntriesSelector(state).slice(-3),
  laborRightsCount: laborRightsCountSelector(state),
  timeAndSalaryCount: state.timeAndSalary.get('count'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryMenuIfUnfetched,
      queryPopularExperiences,
      queryPopularCompanyAverageSalary,
      queryPopularJobTitleSalaryDistribution,
      queryTimeAndSalaryCount: queryTimeAndSalaryCountIfUnfetched,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
