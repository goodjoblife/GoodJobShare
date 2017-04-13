import { connect } from 'react-redux';
import * as contentful from 'contentful';
import { loadLaborRightsList } from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    items: state.laborRights.toJS(),
  }),
  dispatch => ({
    download: () => {
      const SPACE_ID = 'siutzcg6nl4g';
      const ACCESS_TOKEN = process.env.CONTENTFUL_TOKEN;

      const client = contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN,
      });

      client.getEntries().then(({ items }) =>
        items.map(({
          sys: { id },
          fields: { title, cover_photo: { fields: { file: { url } } } },
        }) => ({
          id,
          title,
          coverUrl: url,
        }))
      ).then(items => {
        dispatch(loadLaborRightsList(items));
      }).catch(() => {});
    },
  })
)(LaborRightsMenu);
