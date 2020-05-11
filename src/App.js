import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';

/**
 * useRef 常见的两种使用场景：
 *  1、获取子组件或 DOM 节点的句柄
 *  2、渲染周期之间共享数据的存储
 */

class Counter extends React.PureComponent {
  speak() {
    const { count } = this.props;
    console.log(`now counter is ${count}`);
  }

  render() {
    const { count, onClick } = this.props;

    return <h1 onClick={onClick}>{count}</h1>;
  }
}

function App() {
  const [count, setCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [clickCount, setClickCount] = useState(0);
  const counterRef = useRef();
  const it = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const double = useMemo(() => count * 2, [count === 3]);

  // useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
  const onClick = useCallback(() => {
    console.log('click');
    setClickCount((clickCount) => clickCount + 1);
    // console.log(counterRef.current);
    counterRef.current.speak();
  }, [counterRef]);

  useEffect(() => {
    it.current = setInterval(() => setCount((count) => count + 1), 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  });

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Click {count}, Double {double}
      </button>
      <Counter count={double} onClick={onClick} ref={counterRef} />
    </>
  );
}

export default App;
