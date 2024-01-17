import { useEffect, useState } from 'react';

const useScrollPercentageDisplay = ({ percentage }) => {
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeightPercent =
        (document.documentElement.scrollTop + window.innerHeight) /
        document.body.clientHeight;

      if (scrollHeightPercent >= percentage) {
        setIsDisplay(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [percentage]);

  return { isDisplay };
};

export default useScrollPercentageDisplay;
