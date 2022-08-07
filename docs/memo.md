# memo

`React.memo` 为高阶组件。它与 `React.PureComponent` 非常相似，但只适用于函数组件，而不适用 `class` 组件。

## React.PureComponent

`React.PureComponent` 中以浅层对比 `prop` 和 `state` 的方式来实现了 `shouldComponentUpdate()` 函数。

如果赋予 React 组件相同的 `props` 和 `state`，`render()` 函数会渲染相同的内容，那么在某些情况下使用 `React.PureComponent` 可提高性能。

注意：`React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较。

请仅在你的 `props` 和 `state` 较为简单时，才使用 `React.PureComponent`，或者在深层数据结构发生变化时调用 [forceUpdate()][forceupdate] 来确保组件被正确地更新。

你也可以考虑使用 [immutable][immutable] 对象加速嵌套数据的比较。

## React.memo

如果你的函数组件在给定相同 `props` 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。

这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

`React.memo` 仅检查 `props` 变更。如果函数组件被 `React.memo` 包裹，且其实现中拥有 `useState` 或 `useContext` 的 Hook，当 `context` 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

## Demo

```javascript
import React from 'react';

const Foo = React.memo(function Foo(props) {
  console.log('Foo render');
  return <div>{props.person.age}</div>;
});

class App extends React.Component {
  state = {
    count: 0,
    person: {
      age: 1,
    },
  };

  callback = () => {};

  render() {
    const { count, person } = this.state;

    return (
      <>
        <button
          onClick={() => {
            person.age++;
            this.setState({ count: count + 1 });
          }}
        >
          Add
        </button>
        <Foo person={person} cb={this.callback} />
      </>
    );
  }
}

export default App;
```

## Refs

* [React 顶层 API – React](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo)
* [React 的 PureComponent Vs Component - 掘金](https://juejin.im/post/5b614d9bf265da0fa759e84b)
* [constructor 会执行两次？- 浅淡 React StrictMode - 掘金](https://juejin.im/post/5e64d3eff265da57671bd080)

[forceupdate]: https://zh-hans.reactjs.org/docs/react-component.html#forceupdate
[immutable]: https://immutable-js.github.io/immutable-js/
