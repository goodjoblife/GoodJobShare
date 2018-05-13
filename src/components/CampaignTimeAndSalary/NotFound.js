import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router-dom';
import CommonNotFound from 'common/NotFound';
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
    const { staticContext, match: { params: { campaign_name: campaignName } } } = this.props;
    const { campaignEntries, campaignEntriesStatus } = this.props;

    if (isFetched(campaignEntriesStatus) && !campaignEntries.has(campaignName)) {
      return <CommonNotFound />;
    }

    if (staticContext) {
      staticContext.status = 301; // eslint-disable-line no-param-reassign
    }
    return (<Redirect to={'/time-and-salary/campaigns/:campaign_name/latest'.replace(':campaign_name', campaignName)} />);
  }
}

NotFound.propTypes = {
  staticContext: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      campaign_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  campaignEntries: ImmutablePropTypes.map.isRequired,
  campaignEntriesStatus: PropTypes.string.isRequired,
  queryCampaignInfoList: PropTypes.func.isRequired,
};

export default NotFound;
