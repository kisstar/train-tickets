import { useCallback } from 'react';
import { h0 } from '../utils';

export function useNav(departDate, dispatch, prevDate, nextDate) {
  const isPrevDisabled = h0(departDate) <= h0();
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;

  const onPrevClick = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }
    dispatch(prevDate());
  }, [dispatch, prevDate, isPrevDisabled]);

  const onNextClick = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    dispatch(nextDate());
  }, [dispatch, nextDate, isNextDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    onPrevClick,
    onNextClick,
  };
}
