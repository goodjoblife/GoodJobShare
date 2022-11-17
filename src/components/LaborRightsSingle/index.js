import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';
import R from 'ramda';
import { compose, setStatic } from 'recompose';
import { useParams } from 'react-router-dom';
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
import { paramsSelector } from 'common/routing/selectors';
import { isFetching, isUnfetched, isError, isFetched } from 'constants/status';
import { SITE_NAME } from 'constants/helmetData';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';
import Body from './Body';
import Footer from './Footer';

import {
  queryMenu,
  queryEntry,
  queryMenuIfUnfetched,
  queryEntryIfUnfetched,
} from '../../actions/laborRights';

import {
  menuEntriesSelector,
  entryDataSelector,
  entryStatusSelector,
  entryErrorSelector,
} from '../../selectors/laborRightsSelector';

import styles from './LaborRightsSingle.module.css';

const idSelector = R.compose(
  params => params.id,
  paramsSelector,
);

const useTracking = entryId => {
  /*
   * send Facebook Pixel 'ViewContent' event
   */
  useEffect(() => {
    ReactPixel.track('ViewContent', {
      content_ids: [entryId],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_LABOR_RIGHT,
    });
  }, [entryId]);
};

const LaborRightsSingle = () => {
  const params = useParams();
  const entryId = params.id;

  useTracking(entryId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);

  useEffect(() => {
    console.log('trigger', entryId);
    dispatch(queryEntryIfUnfetched(entryId));
  }, [dispatch, entryId]);

  const entryStatus = useSelector(entryStatusSelector(entryId));
  const entryError = useSelector(entryErrorSelector(entryId));
  const entry = useSelector(entryDataSelector(entryId)) || {};
  const menuEntries = useSelector(menuEntriesSelector);
  const index = R.findIndex(R.propEq('id', entryId))(menuEntries);
  const prevEntry = index > 0 ? menuEntries[index - 1] : undefined;
  const nextEntry =
    index < menuEntries.length - 1 ? menuEntries[index + 1] : undefined;

  const { title, description, content, coverUrl, nPublicPages } = entry;
  const { seoTitle = title || '', seoDescription, seoText } = entry;

  return (
    <Section>
      <Helmet>
        <title itemProp="name" lang="zh-TW">
          {seoTitle}
        </title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={formatTitle(seoTitle, SITE_NAME)} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={formatUrl(coverUrl)} />
        <meta
          property="og:url"
          content={formatCanonicalPath(`/labor-rights/${entryId}`)}
        />
        <link
          rel="canonical"
          href={formatCanonicalPath(`/labor-rights/${entryId}`)}
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
          <Footer id={entryId} prev={prevEntry} next={nextEntry} />
        </div>
      )}
    </Section>
  );
};

LaborRightsSingle.propTypes = {
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
