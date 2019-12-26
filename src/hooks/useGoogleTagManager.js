import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { activateOptimize } from '../utils/gtm';

export default () => {
  // 因為 react 是 SPA，需要在每次 route 改變時
  // push event 到 window.dataLayer 去觸發 google optimize 實驗
  const location = useLocation();
  useEffect(() => {
    activateOptimize();
  }, [location]);
};
