import React from 'react';

import MopsLink from './MopsLink';

export enum EsgIndicator {
  AVG_SALARY = '員工薪資平均數',
  NON_MANAGER_AVG_SALARY = '非主管全時員工薪資平均數',
  NON_MANAGER_MEDIAN_SALARY = '非主管全時員工薪資中位數',
  FEMALE_MANAGER_PERCENTAGE = '管理職女性主管佔比',
}

export const ESG_DISCLOSURE_URL = 'https://mops.twse.com.tw/mops/web/t214sb01';

const NON_MANAGER_SALARY_URL = 'https://mops.twse.com.tw/mops/web/t100sb15';

export const esgIndicatorDescription: Record<EsgIndicator, React.ReactNode> = {
  [EsgIndicator.AVG_SALARY]: (
    <>
      <p>
        公司當年度財務報告附註揭露的
        <strong>員工薪資費用總額 ÷ 員工人數（年度平均）</strong>
        ，也就是全體員工的平均薪資。
      </p>
      <ul>
        <li>
          薪資費用通常包含本薪、加班費、獎金、員工酬勞等經常性與非經常性薪資。
        </li>
        <li>
          員工人數包含本國籍與外國籍的全職、兼職、約聘僱人員，不含監察人、派遣與外包人員。
        </li>
        <li>
          「與同業相比」是與同市場別（上市／上櫃）、同產業類別公司的平均數比較。
        </li>
        <li>
          此平均數未依職級或工作性質分類，高階主管的薪資也計入，因此可能高於多數員工的實際薪資水準。
        </li>
      </ul>
      <p>
        資料來源：
        <MopsLink href={ESG_DISCLOSURE_URL}>
          公開資訊觀測站－企業ESG資訊揭露
        </MopsLink>
        （每年 6 月起揭露）
      </p>
    </>
  ),
  [EsgIndicator.NON_MANAGER_AVG_SALARY]: (
    <>
      <p>
        公司當年度
        <strong>非擔任主管職務之全時員工</strong>
        的薪資總額 ÷
        該類員工人數（年度平均）。排除主管後，較接近一般員工的薪資水準。
      </p>
      <ul>
        <li>
          「擔任主管職務」指公司經理人，包含總經理、副總經理、協理及相當等級者，以及財務、會計部門主管等；其餘員工即為非主管。
        </li>
        <li>
          「全時員工」指工作時數達公司規定正常上班時數或法定工時者；公司未規定時，以每週平均工時超過
          35 小時者認定。
        </li>
        <li>統計範圍為在台僱用的員工（含台籍、外籍），不含海外分公司員工。</li>
        <li>
          薪資總額包含經常性薪資、加班費及非經常性薪資（獎金、員工酬勞等），不含退休金。
        </li>
        <li>
          「與同業相比」是與同市場別（上市／上櫃）、同產業類別公司的薪資平均數比較。
        </li>
      </ul>
      <p>
        資料來源：
        <MopsLink href={NON_MANAGER_SALARY_URL}>
          公開資訊觀測站－非擔任主管職務之全時員工薪資資訊
        </MopsLink>
        （每年 7 月起揭露）
      </p>
    </>
  ),
  [EsgIndicator.NON_MANAGER_MEDIAN_SALARY]: (
    <>
      <p>
        把非擔任主管職務之全時員工的薪資由低到高排序後，
        <strong>位於正中間的那一筆</strong>
        。不會被少數極高薪資拉高，因此通常比平均數更貼近多數人的實際薪資水準。
      </p>
      <ul>
        <li>員工範圍與薪資總額的定義，與「非主管全時員工薪資平均數」相同。</li>
        <li>
          中位數高於或接近平均數，代表薪資分布較平均；反之則代表薪資集中在少數高薪員工。
        </li>
      </ul>
      <p>
        資料來源：
        <MopsLink href={NON_MANAGER_SALARY_URL}>
          公開資訊觀測站－非擔任主管職務之全時員工薪資資訊
        </MopsLink>
        （每年 7 月起揭露）
      </p>
    </>
  ),
  [EsgIndicator.FEMALE_MANAGER_PERCENTAGE]: (
    <>
      <p>
        公司當年度管理職中由女性擔任的比例，即
        <strong>女性管理職人數 ÷ 全體管理職人數</strong>
        ，是觀察職場性別平權與升遷機會的指標之一。
      </p>
      <ul>
        <li>
          此為公司依證交所規定於 ESG 社會面「人力發展」項下自行申報的數據。
        </li>
        <li>各公司認定的管理職範圍可能不同，跨公司比較時僅供參考。</li>
      </ul>
      <p>
        資料來源：
        <MopsLink href={ESG_DISCLOSURE_URL}>
          公開資訊觀測站－企業ESG資訊揭露
        </MopsLink>
      </p>
    </>
  ),
};
