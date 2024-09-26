// hooks/useInView.js
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const useInViewAnimation = (options) => {
  const [ref, inView] = useInView(options);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasBeenInView(true);
    }
  }, [inView]);

  return [ref, hasBeenInView];
};

export default useInViewAnimation;
