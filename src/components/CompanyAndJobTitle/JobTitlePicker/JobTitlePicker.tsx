import cn from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Checkbox from 'common/form/Checkbox';

import { groupJobTitles, JobTitleCount } from './groupJobTitles';
import styles from './JobTitlePicker.module.css';

type Props = {
  jobTitles: JobTitleCount[];
  appliedTitles: string[];
  onApply: (titles: string[]) => void;
  onClearAll: () => void;
  placeholder?: string;
};

const ChevronIcon = (): React.ReactElement => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <path d="M3 6l5 5 5-5" />
  </svg>
);

// 公司頁「依職稱篩選」的多選瀏覽元件。目前為 UI/UX prototype demo，
// 直接換掉 SalaryWorkTime / InterviewExperiences / WorkExperiences 的 SearchBar，
// 資料來自 mockData.ts 的假資料，等提案通過才會接上真實 API。
//
// 互動模型摘要：
// - 輸入框不逐一列出已選的職稱名稱，收合時只顯示「已選 N 個」的數量摘要
//   （0 個則不顯示）；展開面板時輸入框改成單純的搜尋輸入，不重複顯示數量
//   （已選幾個看面板下方的 pendingNote 就好）。
// - focus 輸入框展開下拉面板：面板內是該 tab 全部職稱的 checkbox 網格，
//   先用字首前綴分群、群組間依總筆數排序，讓相關職稱（如「前端」「前端工程師」）彼此靠近。
// - 面板內打字為本地即時過濾；已勾選的項目即使不符合過濾字串仍保持可見、不搬位。
// - 點 checkbox 立即套用（toggle），即時反映在數量摘要上；面板維持開啟方便繼續多選；
//   「套用」按鈕與按 Enter 純粹是收合面板的捷徑，不再是「確認送出」的動作。
// - 「清除全部」立即生效。摘要旁的 × 是清除全部的捷徑，沒有單一移除的 UI。
const JobTitlePicker: React.FC<Props> = ({
  jobTitles,
  appliedTitles,
  onApply,
  onClearAll,
  placeholder = '職稱篩選',
}) => {
  const [isOpen, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const orderedJobTitles = useMemo(() => groupJobTitles(jobTitles), [
    jobTitles,
  ]);

  const openPanel = useCallback(() => {
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    setFilterText('');
  }, []);

  // 點面板外面就收合。
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleMouseDown = (e: MouseEvent): void => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, closePanel]);

  const toggleTitle = useCallback(
    (name: string) => {
      const next = appliedTitles.includes(name)
        ? appliedTitles.filter(title => title !== name)
        : [...appliedTitles, name];
      onApply(next);
    },
    [appliedTitles, onApply],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        closePanel();
        if (inputRef.current) inputRef.current.blur();
      }
    },
    [closePanel],
  );

  const query = filterText.trim().toLowerCase();
  const visibleTitles = orderedJobTitles.filter(
    item =>
      !query ||
      item.name.toLowerCase().includes(query) ||
      appliedTitles.includes(item.name),
  );

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div
        className={cn(styles.field, { [styles.isOpen]: isOpen })}
        onClick={(): void => {
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        <div className={styles.valueRow}>
          {appliedTitles.length > 0 && !isOpen && (
            <span className={styles.summary}>
              <span>已選 {appliedTitles.length} 個</span>
              <button
                type="button"
                className={styles.summaryClear}
                aria-label="清除已選職稱"
                onClick={(e): void => {
                  e.stopPropagation();
                  onClearAll();
                }}
              >
                ×
              </button>
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder={placeholder}
            autoComplete="off"
            value={filterText}
            onFocus={openPanel}
            onChange={(e): void => {
              setFilterText(e.target.value);
              if (!isOpen) openPanel();
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          type="button"
          className={styles.chevron}
          aria-label="展開職稱清單"
          aria-expanded={isOpen}
          onClick={(e): void => {
            e.stopPropagation();
            if (isOpen) closePanel();
            else {
              if (inputRef.current) inputRef.current.focus();
              openPanel();
            }
          }}
        >
          <ChevronIcon />
        </button>
      </div>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelScroll}>
            {visibleTitles.length > 0 ? (
              <div className={styles.checkboxGrid}>
                {visibleTitles.map(item => {
                  const selected = appliedTitles.includes(item.name);
                  return (
                    <Checkbox
                      key={item.name}
                      className={cn(styles.checkboxOption, {
                        [styles.checkboxOptionSelected]: selected,
                      })}
                      label={
                        <span title={`${item.count} 筆資料`}>{item.name}</span>
                      }
                      value={item.name}
                      checked={selected}
                      margin="0"
                      onChange={(): void => toggleTitle(item.name)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className={styles.panelEmpty}>無符合的職稱</div>
            )}
          </div>
          <div className={styles.panelFoot}>
            <button
              type="button"
              className={cn(styles.btn, styles.btnGhost)}
              onClick={onClearAll}
            >
              清除全部
            </button>
            <span className={styles.pendingNote}>
              {appliedTitles.length ? `已選 ${appliedTitles.length} 個` : ''}
            </span>
            <button
              type="button"
              className={cn(styles.btn, styles.btnPrimary)}
              onClick={closePanel}
            >
              套用
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTitlePicker;
