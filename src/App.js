import React, { useState, useMemo } from 'react';

function Counter({ count }) {
  return <h1>{count}</h1>;
}

function App() {
  const [count, setCount] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const double = useMemo(() => count * 2, [count === 3]);

  /*
    // 一个 useMemo 可以依赖另一个 useMemo 的返回值
    // 但注意不要循环依赖，以免程序崩溃
    const half = useMemo(() => double / 2, [double]);
  */

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Click {count}, Double {double}
      </button>
      <Counter count={count} />
    </>
  );
}

export default App;
