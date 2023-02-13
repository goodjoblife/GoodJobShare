import React from 'react';
import { Section, Wrapper } from 'common/base';
import PageBanner from 'common/PageBanner';
import editorStyles from 'common/Editor.module.css';
import StaticHelmet from 'common/StaticHelmet';

const ProductAndRefundPolicy = () => (
  <main>
    <StaticHelmet.PrivacyPolicy />
    <PageBanner heading="商品與退款政策" />
    <Section padding>
      <Wrapper size="m" className={editorStyles.editor}>
        <ol>
          <li>
            您已充分理解 GoodJob 職場透明化運動網站（以下簡稱本網站）上之薪資、面試經驗、工作心得等相關內容，皆為網友回報，本網站無法保證其資訊之正確性。
          </li>
          <li>
            當您完成購買本網站提供之訂閱制方案以解鎖內容，即代表您同意購買當下所顯示的價格與內容。本網站有權在不同階段進行優化，以不同價格出售方案。故本網站不提供補差價服務與變更服務內容。
          </li>
          <li>
            本網站內容皆已於未付費狀態下部分揭露，例如：顯示網友回報薪資之範圍、面試經驗以及工作心得之部分內容。消費者應已具備足夠資訊決定是否付費購買訂閱制方案以獲得完整內容。因此本網站之訂閱制方案，在相關適用法律許可之範圍內，付款不可退還。
          </li>
          <li>
            本網站可能會出現暫時中斷或故障等現象，對於您暫時無法使用本網站而造成的損害，除故意或重大過失外，在相關適用法律許可之範圍內，不負任何賠償責任。
          </li>
        </ol>
      </Wrapper>
    </Section>
  </main>
);

export default ProductAndRefundPolicy;
