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

  const onClick = () => {
    console.log('click');
  };

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

  useEffect(() => {
    console.log(`count: ${count}`);
  }, [count]); // 只在 count 发生改变时执行

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false);

    return () => {
      document
        .querySelector('#size')
        .removeEventListener('click', onClick, false);
    };
  });

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
      {count & 2 ? (
        <span id='size'>
          Size {size.width}x{size.height}
        </span>
      ) : (
        <p id='size'>
          Size {size.width}x{size.height}
        </p>
      )}
    </>
  );
}

export default App;
