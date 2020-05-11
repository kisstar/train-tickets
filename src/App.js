import React, { useState, useMemo, memo, useCallback } from 'react';

const Counter = memo(function Counter({ count, onClick }) {
  console.log('Counter render');
  return <h1 onClick={onClick}>{count}</h1>;
});

function App() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const double = useMemo(() => count * 2, [count === 3]);

  // useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
  const onClick = useCallback(() => {
    // setClickCount((clickCount) => clickCount + 1); // 使用此种方式更新 clickCount，则无需将 clickCount 作为依赖
    setClickCount(clickCount + 1);
    console.log('click');
  }, [clickCount]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Click {count}, Double {double}
      </button>
      <Counter count={double} onClick={onClick} />
    </>
  );
}

export default App;
