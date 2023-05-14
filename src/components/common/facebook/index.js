import FacebookContext from 'contexts/FacebookContext';
import withFB from './withFB';
import FacebookWrapper from './FacebookWrapper';

const FacebookContextConsumer = FacebookContext.Consumer;

export default FacebookContext;
export { FacebookContextConsumer, withFB, FacebookWrapper };
