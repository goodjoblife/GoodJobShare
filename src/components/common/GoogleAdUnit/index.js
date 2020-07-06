import React from 'react';
import PropTypes from 'prop-types';
import { DFPSlotsProvider, AdSlot, DFPManager } from 'react-dfp';
import { GOOGLE_AD_MANAGER_NETWORK_ID } from '../../../config';

/**
 * 這個是由 Google Ad Manager 方法埋設的 google 廣告
 * 都是 Google Adsense 的廣告，差別在於被 Google Ad Manager 管理
 * 會跟廣告代理商分潤
 */

const GoogleAdUnit = ({ adUnit, sizes }) => (
  <DFPSlotsProvider dfpNetworkId={GOOGLE_AD_MANAGER_NETWORK_ID}>
    <div>
      <AdSlot sizes={sizes} adUnit={adUnit} />
    </div>
  </DFPSlotsProvider>
);

GoogleAdUnit.propTypes = {
  adUnit: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.array),
};

export default GoogleAdUnit;

export const Manager = DFPManager;
