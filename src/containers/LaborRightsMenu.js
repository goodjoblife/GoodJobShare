import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    items: state.laborRights.get('idList').map(id =>
      state.laborRights.getIn(['dataMapById', id])
    ),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
