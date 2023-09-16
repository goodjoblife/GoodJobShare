import React, { useEffect, useMemo } from 'react';
import R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { compose, setStatic } from 'recompose';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { useShareLink } from 'hooks/experiments';
import { queryMenu, queryMenuIfUnfetched } from 'actions/laborRights';
import { menuStateSelector } from 'selectors/laborRightsSelector';
import { isFetching, isError, isFetched } from 'utils/fetchBox';
import LaborRightsEntry from './LaborRightsEntry';
import StaticHelmet from 'common/StaticHelmet';
import styles from './LaborRightsEntry.module.css';
import AdvImage from './banner3_2x.jpg';

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

  const menuState = useSelector(menuStateSelector);

  const shareLink = useShareLink();

  const title = '勞動知識小教室';

  const entriesToItems = useMemo(() => {
    return R.compose(
      R.insert(4, {
        link: shareLink,
        coverUrl: AdvImage,
        title: '留下你的面試經驗、工作經驗',
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
          {isFetching(menuState) && <Loader />}
          {isError(menuState) && menuState.error.toString()}
          {isFetched(menuState) && (
            <Columns
              Item={LaborRightsEntry}
              items={entriesToItems(menuState.data)}
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

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return dispatch(queryMenu());
});

const hoc = compose(ssr);

export default hoc(LaborRightsMenu);
