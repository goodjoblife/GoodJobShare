import React from 'react';
import { DFPSlotsProvider, AdSlot, DFPManager } from 'react-dfp';
import { GOOGLE_AD_MANAGER_NETWORK_ID } from '../../../config';

/**
 * 這個是由 Google Ad Manager 方法埋設的 google 廣告
 * 都是 Google Adsense 的廣告，差別在於被 Google Ad Manager 管理
 * 會跟廣告代理商分潤
 */

export default ({ adUnit, sizes }) => (
  <DFPSlotsProvider dfpNetworkId={GOOGLE_AD_MANAGER_NETWORK_ID}>
    <div>
      <AdSlot sizes={sizes} adUnit={adUnit} />
    </div>
  </DFPSlotsProvider>
);

export const Manager = DFPManager;
