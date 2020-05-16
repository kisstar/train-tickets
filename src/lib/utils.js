import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}

export function useGoBack() {
  const history = useHistory();
  return useCallback(() => {
    history.goBack();
  }, [history]);
}
