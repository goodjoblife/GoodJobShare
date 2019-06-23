import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactPixel from 'react-facebook-pixel';
import R from 'ramda';
import { compose, setStatic } from 'recompose';

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
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import Body from './Body';
import Footer from './Footer';
import LaborRightsPermissionBlock from '../../containers/PermissionBlock/LaborRightsPermissionBlockContainer';

import { queryMenu, queryEntry } from '../../actions/laborRights';
import {
  isFetching,
  isUnfetched,
  isError,
  isFetched,
} from '../../constants/status';
import { MARKDOWN_DIVIDER } from '../../constants/hideContent';
import { SITE_NAME } from '../../constants/helmetData';
import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

import { paramsSelector } from 'common/routing/selectors';

import styles from './LaborRightsSingle.module.css';

const idSelector = R.compose(
  params => params.id,
  paramsSelector,
);

class LaborRightsSingle extends React.Component {
  componentDidMount() {
    this.props.queryMenuIfUnfetched();
    this.props.queryEntryIfUnfetched(idSelector(this.props));
    this.props.fetchPermission();

    // send Facebook Pixel 'ViewContent' event
    ReactPixel.track('ViewContent', {
      content_ids: [this.props.match.params.id],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_LABOR_RIGHT,
    });
  }

  componentDidUpdate(prevProps) {
    this.props.queryMenuIfUnfetched();
    this.props.queryEntryIfUnfetched(idSelector(this.props));

    // send Facebook Pixel 'ViewContent' event if goto reading another labor rights unit
    if (idSelector(prevProps) !== idSelector(this.props)) {
      ReactPixel.track('ViewContent', {
        content_ids: [idSelector(this.props)],
        content_category: PIXEL_CONTENT_CATEGORY.VIEW_LABOR_RIGHT,
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
    } = this.props.entry ? this.props.entry.toJS() : {};
    const { seoTitle = title || '', seoDescription, seoText } = this.props.entry
      ? this.props.entry.toJS()
      : {};
    const { canViewLaborRightsSingle } = this.props;

    // hide some content if user dosen't have permission
    // but when bPublicPages === -1, all pages are public
    let newContent = content;
    let permissionBlock = null;
    if (!canViewLaborRightsSingle && nPublicPages > 0 && content) {
      const endPos = nthIndexOf(content, MARKDOWN_DIVIDER, nPublicPages);
      newContent = content.substr(0, endPos);
      permissionBlock = (
        <LaborRightsPermissionBlock
          rootClassName={styles.permissionBlockLaborRights}
          description={descriptionInPermissionBlock || ''}
        />
      );
    }

    const { entryStatus, entryError } = this.props;
    return (
      <Section>
        <Helmet>
          <title itemProp="name" lang="zh-TW">
            {seoTitle}
          </title>
          <meta name="description" content={seoDescription} />
          <meta
            property="og:title"
            content={formatTitle(seoTitle, SITE_NAME)}
          />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:image" content={formatUrl(coverUrl)} />
          <meta
            property="og:url"
            content={formatCanonicalPath(`/labor-rights/${id}`)}
          />
          <link
            rel="canonical"
            href={formatCanonicalPath(`/labor-rights/${id}`)}
          />
        </Helmet>
        {R.anyPass([isFetching, isUnfetched])(entryStatus) && <Loader />}
        {isError(entryStatus) && entryError.toJS().statusCode === 404 && (
          <NotFound />
        )}
        {isFetched(entryStatus) && (
          <div>
            <Body
              title={title}
              seoText={seoText}
              description={description}
              content={newContent}
              permissionBlock={permissionBlock}
            />
            <FanPageBlock className={styles.fanPageBlock} />
            {(canViewLaborRightsSingle || nPublicPages < 0) && (
              <Section marginTop>
                <CallToActionFolder />
              </Section>
            )}
            <Footer
              id={id}
              prev={this.props.prevEntry}
              next={this.props.nextEntry}
            />
          </div>
        )}
      </Section>
    );
  }
}

LaborRightsSingle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  entry: ImmutablePropTypes.map,
  entryStatus: PropTypes.string.isRequired,
  entryError: ImmutablePropTypes.map,
  prevEntry: ImmutablePropTypes.map,
  nextEntry: ImmutablePropTypes.map,
  queryMenuIfUnfetched: PropTypes.func.isRequired,
  queryEntryIfUnfetched: PropTypes.func.isRequired,
  canViewLaborRightsSingle: PropTypes.bool.isRequired,
  fetchPermission: PropTypes.func.isRequired,
};

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const id = idSelector(props);
  return Promise.all([dispatch(queryMenu()), dispatch(queryEntry(id))]);
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(LaborRightsSingle);
