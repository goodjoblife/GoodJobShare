import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';
<<<<<<< HEAD
import { fetchReplies, likeReply } from 'actions/experienceDetail';

const mapStateToProps = state => ({
  replies: state.experienceDetail.get('replies'),
  repliesStatus: state.experienceDetail.get('replyStatus'),
=======
import { fetchExperience } from 'actions/experienceDetail';

const mapStateToProps = state => ({
  experienceDetail: state.experienceDetail,
>>>>>>> upstream/master
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
<<<<<<< HEAD
      fetchReplies,
      likeReply,
=======
      fetchExperience,
>>>>>>> upstream/master
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceDetail);
