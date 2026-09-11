import cn from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { groupJobTitles, JobTitleCount } from './groupJobTitles';
import styles from './JobTitlePicker.module.css';

type Props = {
  jobTitles: JobTitleCount[];
  appliedTitles: string[];
  onApply: (titles: string[]) => void;
  onRemoveOne: (title: string) => void;
  onClearAll: () => void;
  placeholder?: string;
};

const sameTitleSet = (a: Set<string>, b: string[]): boolean =>
  a.size === b.length && b.every(title => a.has(title));

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
// - 已套用的職稱以可移除的 tag 顯示在輸入框內；點 tag 的 × 立即生效重新查詢。
// - focus 輸入框展開下拉面板：面板內是該 tab 全部職稱的 chip 網格，
//   先用字首前綴分群、群組間依總筆數排序，讓相關職稱（如「前端」「前端工程師」）彼此靠近。
// - 面板內打字為本地即時過濾；已勾選的 chip 即使不符合過濾字串仍保持可見、不搬位。
// - 面板內新增勾選需要按「套用」才會通知外部重新查詢；未套用就關閉面板則作廢。
// - 「清除全部」比照「移除單一 tag」，立即生效，不需要透過套用。
const JobTitlePicker: React.FC<Props> = ({
  jobTitles,
  appliedTitles,
  onApply,
  onRemoveOne,
  onClearAll,
  placeholder = '打字搜尋職稱，或點擊瀏覽全部職稱',
}) => {
  const [isOpen, setOpen] = useState(false);
  const [pendingTitles, setPendingTitles] = useState<Set<string>>(
    () => new Set(appliedTitles),
  );
  const [filterText, setFilterText] = useState('');

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const orderedJobTitles = useMemo(() => groupJobTitles(jobTitles), [
    jobTitles,
  ]);

  const openPanel = useCallback(() => {
    setOpen(true);
  }, []);

  const closePanel = useCallback(
    ({ discard = true }: { discard?: boolean } = {}) => {
      setOpen(false);
      setFilterText('');
      if (discard) setPendingTitles(new Set(appliedTitles));
    },
    [appliedTitles],
  );

  // 點面板外面關閉，並作廢未套用的勾選（Q14）。
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

  const toggleChip = useCallback((name: string) => {
    setPendingTitles(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const hasPendingChange = !sameTitleSet(pendingTitles, appliedTitles);

  const handleApply = useCallback(() => {
    if (!hasPendingChange) return;
    onApply(Array.from(pendingTitles));
    closePanel({ discard: false });
  }, [hasPendingChange, onApply, pendingTitles, closePanel]);

  const handleClearAll = useCallback(() => {
    setPendingTitles(new Set());
    onClearAll();
  }, [onClearAll]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleApply();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePanel();
        if (inputRef.current) inputRef.current.blur();
      }
    },
    [handleApply, closePanel],
  );

  const query = filterText.trim().toLowerCase();
  const visibleTitles = orderedJobTitles.filter(
    item =>
      !query ||
      item.name.toLowerCase().includes(query) ||
      pendingTitles.has(item.name),
  );

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <span className={styles.label}>依職稱篩選</span>
      <div
        className={cn(styles.field, { [styles.isOpen]: isOpen })}
        onClick={(): void => {
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        {appliedTitles.map(title => (
          <span className={styles.tag} key={title}>
            <span>{title}</span>
            <button
              type="button"
              className={styles.tagRemove}
              aria-label={`移除 ${title}`}
              onClick={(e): void => {
                e.stopPropagation();
                onRemoveOne(title);
              }}
            >
              ×
            </button>
          </span>
        ))}
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
              <div className={styles.chipGrid}>
                {visibleTitles.map(item => {
                  const selected = pendingTitles.has(item.name);
                  return (
                    <button
                      type="button"
                      key={item.name}
                      className={cn(styles.chip, {
                        [styles.chipSelected]: selected,
                      })}
                      title={`${item.count} 筆資料`}
                      aria-pressed={selected}
                      onClick={(): void => toggleChip(item.name)}
                    >
                      {selected && <span className={styles.chipMark}>✓</span>}
                      <span>{item.name}</span>
                    </button>
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
              onClick={handleClearAll}
            >
              清除全部
            </button>
            <span className={styles.pendingNote}>
              {pendingTitles.size ? `已勾選 ${pendingTitles.size} 個` : ''}
            </span>
            <button
              type="button"
              className={cn(styles.btn, styles.btnPrimary)}
              disabled={!hasPendingChange}
              onClick={handleApply}
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
