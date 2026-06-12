import R from 'ramda';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryMenuIfUnfetched } from 'actions/laborRights';
import { Heading, Section, Wrapper } from 'common/base';
import Columns from 'common/Columns';
import FanPageBlock from 'common/FanPageBlock';
import Loader from 'common/Loader';
import StaticHelmet from 'common/StaticHelmet';
import { useShareLink } from 'hooks/experiments';
import { menuBoxSelector } from 'selectors/laborRightsSelector';
import { isError, isFetched, isFetching } from 'utils/fetchBox';

import AdvImage from './banner3_2x.jpg';
import LaborRightsEntry from './LaborRightsEntry';
import styles from './LaborRightsEntry.module.css';

const entryToProps = ({ id, title, coverUrl }) => ({
  link: `/labor-rights/${id}`,
  coverUrl,
  title,
});

const LaborRightsMenu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);

  const menuBox = useSelector(menuBoxSelector);

  const shareLink = useShareLink();

  const title = '勞動知識小教室';

  const entriesToItems = useMemo(() => {
    return R.compose(
      R.insert(4, {
        link: shareLink,
        coverUrl: AdvImage,
        title: '留下你的面試經驗、評價',
      }),
      R.map(entryToProps),
    );
  }, [shareLink]);

  return (
    <Section Tag="main" pageTop>
      <Wrapper size="l">
        <StaticHelmet.LaborRightsMenu />
        <section>
          <Heading size="l" center marginBottom>
            {title}
          </Heading>
          {isFetching(menuBox) && <Loader />}
          {isError(menuBox) && menuBox.error.toString()}
          {isFetched(menuBox) && (
            <Columns
              Item={LaborRightsEntry}
              items={entriesToItems(menuBox.data)}
            />
          )}
        </section>
      </Wrapper>
      <Wrapper size="s">
        <FanPageBlock className={styles.fanPageBlock} />
      </Wrapper>
    </Section>
  );
};

LaborRightsMenu.fetchData = ({ store: { dispatch } }) => {
  return dispatch(queryMenuIfUnfetched());
};

export default LaborRightsMenu;
