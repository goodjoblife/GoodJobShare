import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactPixel from 'react-facebook-pixel';

import Loader from 'common/Loader';
import { Section } from 'common/base';
import {
  formatTitle,
  formatCanonicalPath,
  formatUrl,
} from 'utils/helmetHelper';
import { nthIndexOf } from 'utils/stringUtil';
import NotFound from 'common/NotFound';
import CallToActionFolder from 'common/CallToAction/CallToActionFolder';
import Body from './Body';
import Footer from './Footer';
import LaborRightsPermissionBlock from '../../containers/PermissionBlock/LaborRightsPermissionBlockContainer';

import {
    fetchMetaListIfNeeded,
    fetchDataIfNeeded,
} from '../../actions/laborRightsSingle';
import status from '../../constants/status';
import { MAX_IMAGES_IF_HIDDEN, MARKDOWN_DIVIDER } from '../../constants/hideContent';
import { SITE_NAME } from '../../constants/helmetData';
import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

import styles from './LaborRightsSingle.module.css';

class LaborRightsSingle extends React.Component {
  static fetchData({ store: { dispatch }, params: { id } }) {
    return dispatch(fetchMetaListIfNeeded()).then(() =>
      dispatch(fetchDataIfNeeded(id))
    );
  }

  componentDidMount() {
    this.props.fetchMetaListIfNeeded().then(() => {
      this.props.fetchDataIfNeeded(this.props.params.id);
    });
    this.props.fetchMyPermission();

    // send Facebook Pixel 'ViewContent' event
    ReactPixel.track('ViewContent', {
      content_ids: [this.props.params.id],
      content_category: PIXEL_CONTENT_CATEGORY.LABOR_RIGHTS,
    });
  }

  componentDidUpdate(prevProps) {
    this.props.fetchMetaListIfNeeded().then(() => {
      this.props.fetchDataIfNeeded(this.props.params.id);
    });

    // send Facebook Pixel 'ViewContent' event if goto reading another labor rights unit
    if (prevProps.params.id !== this.props.params.id) {
      ReactPixel.track('ViewContent', {
        content_ids: [this.props.params.id],
        content_category: PIXEL_CONTENT_CATEGORY.LABOR_RIGHTS,
      });
    }
  }

  render() {
    const {
      id,
      title,
      description,
      content,
      coverUrl,
      nPublicPages,
      descriptionInPermissionBlock,
    } = this.props.data ? this.props.data.toJS() : {};
    const {
      seoTitle = title || '',
      seoDescription,
      seoText,
    } = this.props.data ? this.props.data.toJS() : {};
    const { canViewLaborRightsSingle } = this.props;

    // hide some content if user dosen't have permission
    // but when bPublicPages === -1, all pages are public
    let newContent = content;
    let permissionBlock = null;
    if (!canViewLaborRightsSingle && nPublicPages > 0 && content) {
      const endPos = nthIndexOf(content, MARKDOWN_DIVIDER, MAX_IMAGES_IF_HIDDEN);
      newContent = content.substr(0, endPos);
      permissionBlock = (
        <LaborRightsPermissionBlock
          rootClassName={styles.permissionBlockLaborRights}
          description={descriptionInPermissionBlock || ''}
        />
      );
    }
    return (
      <main>
        <Helmet
          title={seoTitle}
          meta={[
            { name: 'description', content: seoDescription },
            { property: 'og:url', content: formatCanonicalPath(`/labor-rights/${id}`) },
            { property: 'og:title', content: formatTitle(seoTitle, SITE_NAME) },
            { property: 'og:description', content: seoDescription },
            { property: 'og:image', content: formatUrl(coverUrl) },
          ]}
          link={[
            { rel: 'canonical', href: formatCanonicalPath(`/labor-rights/${id}`) },
          ]}
        />
        {this.props.status === status.FETCHING && <Loader />}
        {
          this.props.status === status.ERROR && this.props.error.get('message') === 'Not found' &&
            <NotFound />
        }
        {
          this.props.status === status.FETCHED &&
            <div>
              <Body
                title={title}
                seoText={seoText}
                description={description}
                content={newContent}
                permissionBlock={permissionBlock}
              />
              {(canViewLaborRightsSingle || nPublicPages < 0) && (
                <Section marginTop>
                  <CallToActionFolder />
                </Section>
              )}
              <Footer
                id={id}
                prev={this.props.prev}
                next={this.props.next}
              />
            </div>
        }
      </main>
    );
  }
}

LaborRightsSingle.propTypes = {
  params: PropTypes.object.isRequired,
  data: ImmutablePropTypes.map,
  prev: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
  fetchMetaListIfNeeded: PropTypes.func.isRequired,
  fetchDataIfNeeded: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: ImmutablePropTypes.map,
  canViewLaborRightsSingle: PropTypes.bool.isRequired,
  fetchMyPermission: PropTypes.func.isRequired,
};

export default LaborRightsSingle;
