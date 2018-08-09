import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import PageBanner from 'common/PageBanner';
import editorStyles from 'common/Editor.module.css';
import { HELMET_DATA } from '../../constants/helmetData';

const GuideLines = () => (
  <main>
    <Helmet {...HELMET_DATA.GUIDELINES} />
    <PageBanner heading="發文留言規則" />
    <Section padding>
      <Wrapper size="m" className={editorStyles.editor}>
        <p>
          GoodJob 的使用者您好！一旦您在 GoodJob
          平台上發表內容（包含但不限於薪資及工時資訊、面試經驗分享、工作經驗分享、實習經驗分享、留言回覆以及檢舉的內容），即代表您同意遵守以下發文留言規則。我們未來有可能修訂本規則，您將會於本頁面或公告指定的頁面找到此規則的最新版本。
        </p>

        <p>
          您所發表的內容，若有以下情形之一者，本站管理者有權視情節輕重，隱藏或刪除該內容。
        </p>
        <ol>
          <li>
            包含針對特定族群之仇恨、威脅及歧視言論，含侮辱、挑撥、威脅、蓄意人身攻擊、歧視等文字。特定族群包含但不限於種族、地域、職業、公司、性別、年齡、學校、薪水階級等族群。
          </li>
          <li>
            包含違反中華民國法律之內容。例如：散布他人個人隱私資訊、侵害他人著作權之內容、惡意程式之網站連結。
          </li>
          <li>內容主要為商業廣告之用途。</li>
          <li>相同內容重複張貼。</li>
          <li>
            內容包含不易閱讀之資訊。例如：注音文、未註明用途之超連結。意即，超連結須註明來源。
          </li>
          <li>
            內容指涉之資訊，顯然不具參考性，或顯然有誤。例如：公司或職務名稱無法辨識、薪資數額明顯不合理。
          </li>
          <li>
            職場經驗之分享的本文字數若低於（含） 50
            字，則本版管理團隊可依內容相關程度判斷是否保留/刪除。
          </li>
          <li>與本版宗旨或本討論串無相關之內容。</li>
        </ol>
      </Wrapper>
    </Section>
  </main>
);

export default GuideLines;
