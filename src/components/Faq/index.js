import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import PageBanner from 'common/PageBanner';
import editorStyles from 'common/Editor.module.css';
import styles from './Faq.module.css';
import helmetData from '../../constants/helmetData';

const Faq = () => (
  <main>
    <Helmet {...helmetData.FAQ} />
    <PageBanner heading="常見問答" />
    <Section padding>
      <Wrapper size="m" className={editorStyles.editor}>
        <ol className={styles.faq}>
          <li>
            <div className={styles.q}>這個網站是匿名的嗎？為什麼匿名還需要以 Facebook 帳戶驗證？</div>
            <div className={styles.a}>
              是的，這個網站是匿名的，您的 Facebook 帳戶資訊不會於任何地方被顯示、揭露或分享。Facebook 帳戶驗證是為了避免惡意使用者大量輸入假資訊。
              <br />
              目前設定每一個 Facebook 帳戶僅可以上傳 5 筆工時、薪資資訊，未來將視情況做調整。
            </div>
          </li>
          <li>
            <div className={styles.q}>我提供的資料會如何被使用？</div>
            <div className={styles.a}>
              您的資料將會被運用於 GoodJob 團隊之服務中，供其他使用者查詢。未來也可能與其他工作資訊透明化專案合作，共享真實的工作資訊；但您的 Facebook 帳戶資訊並不會被共享。
            </div>
          </li>
          <li>
            <div className={styles.q}>我填錯了，想要刪除、修改資料怎麼辦？</div>
            <div className={styles.a}>
              請填寫<a href="https://docs.google.com/forms/d/e/1FAIpQLScM412J7mMsW25nCxfL7UY92qv5_12zHJf_tcIO2XMrihEaIg/viewform?c=0&w=1">本表單</a>，用以確保您是本人，也保障您的權益。填寫完畢後當週的週日，工程師會統一處理，感謝您的耐心等候。
            </div>
          </li>
        </ol>
      </Wrapper>
    </Section>
  </main>
);

export default Faq;
