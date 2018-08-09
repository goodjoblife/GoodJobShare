import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';
import * as ExperienceDetailActions from '../../actions/experienceDetail';
import { fetchMyPermission } from '../../actions/me';

import { statusSelector } from '../../selectors/authSelector';

import { canViewExperirenceDetailSelector } from '../../selectors/meSelector';

const mapStateToProps = state => ({
  experienceDetail: state.experienceDetail,
  replies: state.experienceDetail.get('replies'),
  repliesStatus: state.experienceDetail.get('replyStatus'),
  authStatus: statusSelector(state),
  canViewExperirenceDetail: canViewExperirenceDetailSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ExperienceDetailActions,
      fetchMyPermission,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceDetail);
