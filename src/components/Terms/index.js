import React from 'react';
import { Section, Wrapper } from 'common/base';
import PageBanner from 'common/PageBanner';
import editorStyles from 'common/Editor.module.css';
import StaticHelmet from 'common/StaticHelmet';

const Terms = () => (
  <main>
    <StaticHelmet.UserTerms />
    <PageBanner heading="使用者條款" />
    <Section padding>
      <Wrapper size="m" className={editorStyles.editor}>
        <p>
          GoodJob 歡迎您！ 一旦您使用 GoodJob
          的產品、軟體、網站或服務（以下簡稱「本服務」），即代表您同意遵守以下條款，及其未來修訂公告的最新版本。
        </p>

        <h2>使用者對其提供之內容自負法律責任</h2>
        <p>
          由使用者上載至本服務的薪資、工時、工作評價、面試經驗等一切內容，均由提供該內容的使用者自負法律責任。GoodJob
          對於使用者經由本服務張貼之內容，不保證其正確性、完整性或品質。在任何情況下，GoodJob
          均不為任何使用者提供之內容負責，包含但不限於任何錯誤或遺漏，及其衍生之任何損失或損害。
        </p>

        <h2>GoodJob 有權利、但無義務移除不當內容</h2>
        <p>
          GoodJob 並未針對使用者提供之內容事先加以審查，但 GoodJob
          有權（但無義務）依其自行之考量，拒絕或移除使用者經由本服務提供之內容，包括有違法、侵權、虛偽不實之虞或其他
          GoodJob 認為不適當之內容。
        </p>
        <h2>使用者承諾遵守法律與契約義務</h2>
        <p>
          您承諾絕不為任何非法目的或以任何非法方式使用本服務，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。您若是中華民國以外之使用者，並同意遵守所屬國家或地域之法令。您同意並保證不得利用本服務從事侵害他人權益或違法之行為，包括但不限於：
        </p>
        <ul>
          <li>
            於本服務上載任何不實、誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻或其他不法的內容
          </li>
          <li>
            侵害他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利
          </li>
          <li>違反依法律或契約所應負之保密義務</li>
          <li>冒用他人名義或帳號使用本服務</li>
          <li>其他 GoodJob 有正當理由認為不適當之行為</li>
        </ul>

        <h2>服務中斷或故障時</h2>
        <p>
          本服務如因維修或其他原因出現中斷或故障，使用者宜自行採取適當防護措施，GoodJob
          對使用本服務造成的資料喪失或其他損害，不負損害賠償責任。
        </p>

        <h2>準據法與管轄法院</h2>
        <p>
          本使用者條款之解釋、適用與相關爭議，除法律另有規定者外，均應依照中華民國法律處理，並以台灣台北地方法院為第一審管轄法院。
        </p>
      </Wrapper>
    </Section>
  </main>
);

export default Terms;
