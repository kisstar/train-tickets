# Hooks

Hook 是 React 16.8 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。

## class 组件的弊端

**在组件之间复用状态逻辑很难**。

React 没有提供将可复用性行为“附加”到组件的途径，一些解决此类问题的方案，比如 `render props` 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使代码难以理解。

Hook 使你在无需修改组件结构的情况下复用状态逻辑。

**复杂组件变得难以理解**，每个生命周期常常包含一些不相关的逻辑。

Hook 将组件中相互关联的部分拆分成更小的函数。

**难以理解的 class**，为此必须去理解 JavaScript 中 `this` 的工作方式，这与其他语言存在巨大差异。

另外，还不能忘记绑定事件处理器。没有稳定的语法提案，这些代码非常冗余。

Hook 使你在非 class 的情况下可以使用更多的 React 特性。

## useState

`useState` 接受一个唯一的参数作为初始的 `state`，最后返回一个数组。

数组中第一项是 `state`，React 会在重复渲染时保留这个 `state`。第二项则是更新状态的函数。

现在，通过在函数组件里调用它来给组件添加一些内部 `state`。

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
    </>
  );
}
```

**初始 `state` 只在第一次渲染时会被用到，如果初始 `state` 需要通过复杂计算获得，也可以传入一个函数，同样此函数只在初始渲染时被调用。**

```javascript
const initSate = () => {
  console.log('初始化 state');
  return 0; // 返回初始 satte
};

function Counter() {
  const [count, setCount] = useState(initSate);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
    </>
  );
}
```

多次点击按钮，初始化的的提示消息只会出现一次。

## 注意

**只在最顶层使用 Hook。**

不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。

遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。

**只在 React 函数中调用 Hook。**

不要在普通的 JavaScript 函数中调用 Hook。你可以：

* 在 React 的函数组件中调用 Hook
* 在自定义 Hook 中调用其他 Hook

## 参考

* [Hook 简介 – React](https://zh-hans.reactjs.org/docs/hooks-intro.html)
* [Hook 规则 – React](https://zh-hans.reactjs.org/docs/hooks-rules.html)
