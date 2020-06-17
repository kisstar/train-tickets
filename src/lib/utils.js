import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

export let hasInquiried = false;
export let permissionGetLocation = false;
export let currentPosition = '';

export function noop() { }

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}

export function useGoBack() {
  const history = useHistory();
  return useCallback(() => {
    history.goBack();
  }, [history]);
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.warn('该浏览器不支持定位。');
  }
}

function showPosition(position) {
  const { latitude, longitude } = position.coords;
  console.log('纬度: ' + latitude + '<br>经度: ' + longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('用户拒绝对获取地理位置的请求。');
      break;
    case error.POSITION_UNAVAILABLE:
      console.error('位置信息是不可用的。');
      break;
    case error.TIMEOUT:
      console.error('请求用户地理位置超时。');
      break;
    case error.UNKNOWN_ERROR:
    default:
      console.error('未知错误。');
  }
}

export function getPosition() {
  if (!hasInquiried) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('获取您的位置')) {
      permissionGetLocation = true;
    }
    hasInquiried = true;
  }

  if (!permissionGetLocation) {
    return Promise.reject('用户拒绝对获取地理位置的请求。');
  }

  // if (!currentPosition) {
  //   return Promise.resolve(currentPosition);
  // }

  // eslint-disable-next-line no-undef
  const citysearch = new AMap.CitySearch();
  // 自动获取用户 IP，返回当前城市
  // Ref: https://www.vxzsk.com/597.html
  return new Promise((resolve, reject) => {
    citysearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        if (result && result.city && result.bounds) {
          resolve(result.city);
        }
      } else {
        reject(result.info);
      }
    });
  });
}

export function h0(time = Date.now()) {
  const target = new Date(time)

  target.setHours(0)
  target.setMinutes(0)
  target.setSeconds(0)
  target.setMilliseconds(0)

  return target.getTime()
}
