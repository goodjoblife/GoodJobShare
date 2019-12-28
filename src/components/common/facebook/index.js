// @flow
import FacebookContext from 'contexts/FacebookContext';
import withFB from './withFB';
import FacebookWrapper from './FacebookWrapper';
export type { FBType } from './Facebook';

const FacebookContextConsumer = FacebookContext.Consumer;

export default FacebookContext;
export { FacebookContextConsumer, withFB, FacebookWrapper };
