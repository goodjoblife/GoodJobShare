// @flow
import FacebookContext from './FacebookContext';
import FacebookContextProvider from './FacebookContextProvider';
import withFB from './withFB';
import FacebookWrapper from './FacebookWrapper';
export type { FBType } from './Facebook';

const FacebookContextConsumer = FacebookContext.Consumer;

export default FacebookContext;
export {
  FacebookContextProvider,
  FacebookContextConsumer,
  withFB,
  FacebookWrapper,
};
