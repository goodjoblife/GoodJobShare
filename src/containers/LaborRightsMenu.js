import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';
import fetchLaborRights from '../utils/fetchLaborRights';

export default connect(
  state => ({
    items: state.laborRights.toJS(),
  }),
  dispatch => ({
    download: () => {
      fetchLaborRights().then(items => {
        dispatch(loadLaborRights(items));
      }).catch(() => {});
    },
  })
)(LaborRightsMenu);
