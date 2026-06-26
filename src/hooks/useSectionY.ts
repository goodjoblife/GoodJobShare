import React, { useEffect, useRef, useState } from 'react';

import useMobile from 'hooks/useMobile';

const useSectionY = (): [
  number | null,
  React.RefObject<HTMLElement | null>,
] => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();
  const [y, setY] = useState<number | null>(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  // DOM state changes don't notify React,
  // so dependencies are omitted to always run the effect
  // to ensure the latest scroll position is calculated.
  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      let newY = rect.top + window.scrollY;
      if (isMobile) {
        newY -= 50; /* nav height */
      }
      if (newY !== y) {
        setY(newY);
      }
    }
  });
  /* eslint-enable react-hooks/exhaustive-deps */

  return [y, sectionRef];
};

export default useSectionY;
