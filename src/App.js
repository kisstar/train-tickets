import React, { useState, useRef, useEffect } from 'react';

function useCounter(count) {
  return <h1>{count}</h1>;
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

function App() {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
      {Counter}
    </>
  );
}

export default App;
