# Context

Context 提供了一个无需为每层组件手动添加 `props`，就能在组件树间进行数据传递的方法。

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

如果你只是想避免层层传递一些属性，[组件组合（component composition）][component_composition]有时候是一个比 `context` 更好的解决方案。

除此外，如果子组件还需要在渲染前和父组件进行一些交流，你可以进一步使用 [render props][render_props]。

## React.createContext

通过 `React.createContext` 方法可以创建一个 Context 对象。

当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 `context` 值。

创建时我们可以传递一个默认值，只有当组件所处的树中没有匹配到 Provider 时，其 `defaultValue` 参数才会生效。

```javascript
const MyContext = React.createContext(defaultValue);
```

## Context.Provider

每个 Context 对象都会返回一个名为 Provider 的 React 组件，它允许消费组件订阅 `context` 的变化。

Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。

Provider 及其内部 `consumer` 组件都不受制于 `shouldComponentUpdate` 函数，因此当 `consumer` 组件在其祖先组件退出更新的情况下也能更新。

## Context.Consumer

每个 Context 对象同时还会返回一个名为 Consumer 的 React 组件，它可以订阅 `context` 的变化。

```javascript
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

此处需要将函数作为子元素。这个函数接收当前的 `context` 值，返回一个 React 节点。

传递给函数的 `value` 值等同于往上组件树离这个 `context` 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于上面的 `defaultValue`。

## Class.contextType

挂载在 `class` 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 Context 对象。

这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 `render` 函数中。

```javascript
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```

## Demo

```javascript
import React, { createContext } from 'react';

const BatteryContext = createContext();
const OnlineContext = createContext();

class Leaf extends React.Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {(battery) => (
          <OnlineContext.Consumer>
            {(online) => (
              <h1>
                Battery: {battery}, Online: {String(online)}
              </h1>
            )}
          </OnlineContext.Consumer>
        )}
      </BatteryContext.Consumer>
    );
  }
}

class Middle extends React.Component {
  render() {
    return <Leaf />;
  }
}

class App extends React.Component {
  state = {
    battery: 60,
    online: false,
  };

  render() {
    const { battery, online } = this.state;

    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type='button'
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            Press
          </button>
          <button
            type='button'
            onClick={() => this.setState({ online: !online })}
          >
            Switch
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}

export default App;
```

## Context.displayName

`context` 对象接受一个名为 `displayName` 的 `property`，类型为字符串。React DevTools 使用该字符串来确定 `context` 要显示的内容。

```javascript
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

## Refs

* [Context – React](https://react.docschina.org/docs/context.html)

[component_composition]: https://react.docschina.org/docs/composition-vs-inheritance.html
[render_props]: https://react.docschina.org/docs/render-props.html
