import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  const onSize = () =>
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    window.addEventListener('resize', onSize, false);

    return () => {
      window.removeEventListener('resize', onSize, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button onClick={() => setCount(count + 1)}>
      Click {count}
      Size {size.width}x{size.height}
    </button>
  );
}

export default App;
