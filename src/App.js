import React, { useState, useRef, useEffect, useCallback } from 'react';

function useCounter(count) {
  const size = useSize();
  return (
    <h1>
      {count}, {size.width}*{size.height}
    </h1>
  );
}

function useCount(initState) {
  const [count, setCount] = useState(initState);
  const it = useRef();

  useEffect(() => {
    it.current = setInterval(() => setCount((count) => count + 1), 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  });

  return [count, setCount];
}

function useSize() {
  const [size, setSize] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, [onResize]);

  return size;
}

function App() {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Click {count}, {size.width}x{size.height}
      </button>
      {Counter}
    </>
  );
}

export default App;
