import cn from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'common/Modal';

import styles from './JobTitleChips.module.css';

export type ChipItem = { name: string; count?: number };

type Props = {
  label: string;
  items: ChipItem[];
  previewCount?: number;
  activeName?: string | null;
  // 二選一：給 getLinkTo 就渲染成連結；給 onSelect 就渲染成按鈕
  getLinkTo?: (name: string) => string;
  onSelect?: (name: string) => void;
  moreTitle?: string;
  className?: string;
};

const formatCount = (count?: number): string | null =>
  typeof count === 'number' ? `${count.toLocaleString()} 筆` : null;

type ChipProps = {
  item: ChipItem;
  active: boolean;
  getLinkTo?: (name: string) => string;
  onSelect?: (name: string) => void;
};

const Chip: React.FC<ChipProps> = ({ item, active, getLinkTo, onSelect }) => {
  const className = cn(styles.chip, { [styles.chipActive]: active });
  const content = (
    <>
      {item.name}
      {formatCount(item.count) && (
        <span className={styles.count}>{formatCount(item.count)}</span>
      )}
    </>
  );
  if (getLinkTo) {
    return (
      <Link className={className} to={getLinkTo(item.name)}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={(): void => {
        if (onSelect) onSelect(item.name);
      }}
    >
      {content}
    </button>
  );
};

const JobTitleChips: React.FC<Props> = ({
  label,
  items,
  previewCount = 5,
  activeName,
  getLinkTo,
  onSelect,
  moreTitle,
  className,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const preview = useMemo(() => items.slice(0, previewCount), [
    items,
    previewCount,
  ]);
  const hidden = items.length - preview.length;

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter(item => item.name.toLowerCase().includes(q));
  }, [items, filter]);

  const close = useCallback(() => {
    setOpen(false);
    setFilter('');
  }, []);

  const handleSelectInModal = useCallback(
    (name: string) => {
      if (onSelect) onSelect(name);
      close();
    },
    [onSelect, close],
  );

  if (items.length === 0) return null;

  return (
    <div className={cn(styles.container, className)}>
      <span className={styles.label}>{label}</span>
      {preview.map(item => (
        <Chip
          key={item.name}
          item={item}
          active={item.name === activeName}
          getLinkTo={getLinkTo}
          onSelect={onSelect}
        />
      ))}
      {hidden > 0 && (
        <button
          type="button"
          className={cn(styles.chip, styles.more)}
          onClick={(): void => setOpen(true)}
        >
          更多 +{hidden}
        </button>
      )}
      <Modal
        isOpen={isOpen}
        close={close}
        closableOnClickOutside
        size="m"
        contentClassName=""
      >
        <div className={styles.modalTitle}>
          {moreTitle || label}（{items.length}）
        </div>
        <input
          className={styles.filterInput}
          placeholder="輸入關鍵字篩選，例如：前端"
          value={filter}
          onChange={(e): void => setFilter(e.target.value)}
          autoFocus
        />
        <div className={styles.list}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>找不到符合「{filter}」的職稱</div>
          ) : (
            filtered.map(item => (
              <Chip
                key={item.name}
                item={item}
                active={item.name === activeName}
                getLinkTo={getLinkTo}
                onSelect={handleSelectInModal}
              />
            ))
          )}
        </div>
        <div className={styles.hint}>依資料筆數由多到少排序</div>
      </Modal>
    </div>
  );
};

export default JobTitleChips;
