import { useSelector } from 'react-redux';

import { notificationsSelector } from 'selectors/toastNotification';

const useNotificationData = () => useSelector(notificationsSelector);

export default useNotificationData;
