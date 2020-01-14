/**
 * 因為 google adsense 一直無法在 local 端測試，
 * 只好做個頁面上 production 測，確認可以正常顯示
 */

import React from 'react';
import GoogleAdsense from 'common/GoogleAdsense';

import styles from './GoogleAdsenseTestPage.module.css';

const GoogleAdsenseTestPage = () => {
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '40px' }}>
        <h3 className={styles.h3}>文章內廣吿</h3>
        <div className={styles.inArticleAdContainer}>
          <p>
            這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。這是一篇測試文章。
          </p>
          <GoogleAdsense
            style={{ display: 'block', textAlign: 'center' }}
            layout="in-article"
            format="fluid"
            slot="9324029284"
          />
          <p>
            這是一篇測試文章的下方。這是一篇測試文章的下方。這是一篇測試文章的下方。這是一篇測試文章的下方。這是一篇測試文章的下方。這是一篇測試文章的下方。這是一篇測試文章的下方。
          </p>
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h3 className={styles.h3}>方形多媒體廣吿</h3>
        <div className={styles.squareDisplayAdContainer}>
          <GoogleAdsense
            style={{ display: 'block' }}
            format="auto"
            slot="1068219022"
            responsive="true"
          />
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h3 className={styles.h3}>橫條多媒體廣吿</h3>
        <div className={styles.horizontalDisplayAdContainer}>
          <GoogleAdsense
            style={{ display: 'block' }}
            format="auto"
            slot="2126343344"
            responsive="true"
          />
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h3 className={styles.h3}>直條多媒體廣吿</h3>
        <div className={styles.verticalDisplayAdContainer}>
          <GoogleAdsense
            style={{ display: 'block' }}
            format="auto"
            slot="6339096692"
            responsive="true"
          />
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h3 className={styles.h3}>
          動態內廣吿（for 薪資工時 table 的一個 row）
        </h3>
        <div className={styles.inFeedAdForSalaryTableContainer}>
          <GoogleAdsense
            style={{ display: 'block' }}
            format="fluid"
            layout-key="-f9+5v+4m-d8+7b"
            slot="7546190980"
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsenseTestPage;
