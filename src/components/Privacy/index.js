import React from 'react';
import { Section, Wrapper } from 'common/base';
import PageBanner from 'common/PageBanner';
import editorStyles from 'common/Editor.module.css';
import StaticHelmet from 'common/StaticHelmet';

const Privacy = () => (
  <main>
    <StaticHelmet.PrivacyPolicy />
    <PageBanner heading="隱私權政策" />
    <Section padding>
      <Wrapper size="m" className={editorStyles.editor}>
        <p>
          GoodJob
          的使用者您好！為了尊重您個人的隱私權，因此制訂了隱私權政策。對於
          GoodJob 如何蒐集、應用及保護您所提供之個人資訊，請詳細閱讀下列內容。
          我們未來有可能修訂本政策，您將會於本頁面或公告指定的頁面找到此政策的最新版本。
        </p>
        <h2>隱私權政策的適用範圍</h2>
        <p>
          以下的隱私權宣告，適用於您在使用 GoodJob
          的產品、軟體、網站或服務(以下簡稱「GoodJob
          服務」)，所涉及的「個人身分資訊」以及「使用者指定分享之資訊」的蒐集、運用與保護。
        </p>
        <h2>個人資料之蒐集及使用方式</h2>
        <ul>
          <li>
            在 GoodJob 服務查詢工作資訊時，需使用者以第三方網站帳戶 (如:
            Facebook,Google)進行註冊與驗證，此流程用於辨識使用者身份，確認該名使用者是否擁有查看資料之權限。
            流程遵從<a href="https://oauth.net/2/">OAuth2</a>
            標準規範。其中，第三方網站之帳戶資訊，為「個人身分資訊」。
          </li>
          <li>
            在 GoodJob 服務提供工作資訊時，需使用者以第三方網站帳戶 (如:
            Facebook,Google)進行註冊與驗證；並提供其公司名稱、職稱、工時、薪資等工作資訊。第三方網站之帳戶資訊，為「個人身分資訊」；而提供之公司名稱、職稱、工時、薪資等工作資訊，則為「使用者指定分享之資訊」。
          </li>
          <li>
            GoodJob
            服務絕不會出售、交換、出租或透露任何您的「個人身分資訊」給其他團體、個人或私人企業。但配合司法機關的合法調查時，不在此限。
          </li>
          <li>
            GoodJob
            服務將會公開分享「使用者指定分享之資訊」，並可能與其他組織、團體、個人或企業合作並共享「使用者指定分享之資訊」，以達到工作資訊透明化之目的。
          </li>
        </ul>
        <h2>使用者請求刪除個人資料</h2>
        <ul>
          <li>
            曾使用 Facebook 或 Google 於 GoodJob
            網站進行第三方驗證及註冊者，可請求刪除其「個人身分資訊」以及「使用者指定分享之資訊」。
            資料經刪除將永久不可恢復，本站沒有任何備份、復原之義務。
          </li>
          <li>
            若要刪除個人「個人身分資訊」以及「使用者指定分享之資訊」，請使用第三方登入之
            Facebook 或 Google 信箱，寄信至
            <a href="mailto:findyourgoodjob@gmail.com">
              findyourgoodjob@gmail.com
            </a>
            ，標題標明「請求刪除 GoodJob
            網站上所有本人身份以及分享之資訊」，本站人員將於兩週內
            刪除所有「個人身分資訊」以及「使用者指定分享之資訊」。
          </li>
        </ul>
      </Wrapper>
    </Section>
  </main>
);

export default Privacy;
