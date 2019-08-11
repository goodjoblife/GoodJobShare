import { Component } from 'react';
import PropTypes from 'prop-types';

class ViewLog extends Component {
  static propTypes = {
    experienceId: PropTypes.string.isRequired,
    viewExperiences: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { experienceId } = this.props;
    if (experienceId) {
      const contentIds = [experienceId];
      const referrer = window.location.href;

      this.props.viewExperiences({ contentIds, referrer });
    }
  }

  componentDidUpdate(prevProps) {
    const { experienceId } = this.props;
    if (prevProps.experienceId !== experienceId && experienceId) {
      const contentIds = [experienceId];
      const referrer = window.location.href;

      this.props.viewExperiences({ contentIds, referrer });
    }
  }

  render() {
    return null;
  }
}

export default ViewLog;
