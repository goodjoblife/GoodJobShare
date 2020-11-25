import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMyUnlockedContentsAndPoints } from '../../actions/permission';
import {
  myUnlockedSalaryWorkTimeRecordsSelector,
  myUnlockedExperienceRecordsSelector,
  hasFetchedMyUnlockedContentSelector,
  myPointsSelector,
} from '../../selectors/permissionSelector';

import MyUnlockedContentPage from './MyUnlockedContentsPage';

const mapStateToProps = state => ({
  points: myPointsSelector(state),
  hasFetchedMyUnlockedContents: hasFetchedMyUnlockedContentSelector(state),
  unlockedSalaryWorkTimeRecords: myUnlockedSalaryWorkTimeRecordsSelector(state),
  unlockedExperienceRecords: myUnlockedExperienceRecordsSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMyUnlockedContents: fetchMyUnlockedContentsAndPoints,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyUnlockedContentPage);
