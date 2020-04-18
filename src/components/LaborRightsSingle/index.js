import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
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
import { isUiNotFoundError } from 'utils/errors';
import NotFound from 'common/NotFound';
import CallToActionFolder from 'common/CallToAction/CallToActionFolder';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import Body from './Body';
import Footer from './Footer';

import { queryMenu, queryEntry } from '../../actions/laborRights';
import {
  isFetching,
  isUnfetched,
  isError,
  isFetched,
} from '../../constants/status';
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
    const { id, title, description, content, coverUrl, nPublicPages } = this
      .props.entry
      ? this.props.entry
      : {};
    const { seoTitle = title || '', seoDescription, seoText } = this.props.entry
      ? this.props.entry
      : {};

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
        {isError(entryStatus) && isUiNotFoundError(entryError) && <NotFound />}
        {isFetched(entryStatus) && (
          <div>
            <Body
              title={title}
              seoText={seoText}
              description={description}
              content={content}
            />
            <FanPageBlock className={styles.fanPageBlock} />
            {nPublicPages < 0 && (
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
  entry: PropTypes.object,
  entryStatus: PropTypes.string.isRequired,
  entryError: PropTypes.object,
  prevEntry: PropTypes.object,
  nextEntry: PropTypes.object,
  queryMenuIfUnfetched: PropTypes.func.isRequired,
  queryEntryIfUnfetched: PropTypes.func.isRequired,
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
