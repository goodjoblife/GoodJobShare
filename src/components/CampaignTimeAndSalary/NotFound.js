import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonNotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import { queryCampaignInfoList } from '../../actions/campaignInfo';
import { isFetched } from '../../constants/status';

class NotFound extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(queryCampaignInfoList());
  }

  componentDidMount() {
    this.props.queryCampaignInfoList();
  }

  render() {
    const { campaignName, campaignEntries, campaignEntriesStatus } = this.props;

    if (isFetched(campaignEntriesStatus) && !campaignEntries.has(campaignName)) {
      return <CommonNotFound />;
    }

    return (<Redirect to={'/time-and-salary/campaigns/:campaign_name/latest'.replace(':campaign_name', campaignName)} />);
  }
}

NotFound.propTypes = {
  campaignName: PropTypes.string.isRequired,
  campaignEntries: ImmutablePropTypes.map.isRequired,
  campaignEntriesStatus: PropTypes.string.isRequired,
  queryCampaignInfoList: PropTypes.func.isRequired,
};

export default NotFound;
