# code-splitting

React 应用大都会使用 Webpack，Rollup 或 Browserify 这类的构建工具来打包文件。

打包其实就是一个将文件引入并合并到一个单独文件的过程，最终形成一个 “bundle”。 接着在页面上引入该 `bundle`，整个应用即可一次性加载。

为了避免搞出大体积的代码包，就需要对代码包进行分割。

在你的应用中引入代码分割的最佳方式是通过动态 `import()` 语法，当 Webpack 解析到该语法时，会自动进行代码分割。

## React.lazy

`React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）。

它接受一个函数，这个函数需要动态调用 `import()`。然后返回一个 `Promise`，该 `Promise` 需要 `resolve` 一个默认导出的 `React` 组件。

决定在哪引入代码分割需要一些技巧，一个不错的选择是从路由开始。

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

如果模块加载失败（如网络问题），它会触发一个错误。你可以通过[异常捕获边界（Error boundaries）][error_boundaries]技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。

注意：`React.lazy` 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。

## Suspense

Suspense 让你的组件在渲染之前进行“等待”，并在等待时显示 `fallback` 的内容。

通常，应在 Suspense 组件中渲染 `lazy` 组件，如此使得我们可以使用在等待加载 `lazy` 组件时做优雅降级（如 loading 指示器等）。

`fallback` 属性接受任何在组件加载过程中你想展示的 React 元素。

另外，你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。

## Demo

```javascript
// About.js
import React from 'react';

class About extends React.Component {
  render() {
    return <div>About</div>;
  }
}

export default About;

// App.js
import React, { lazy, Suspense } from 'react';

const LazyAbout = lazy(() => import(/* webpackChunkName: "about" */ './About'));

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(_error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 可以在此将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 自定义降级后的 UI 并渲染
      return <div>Error</div>;
    }

    return this.props.children;
  }
}

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading</div>}>
          <LazyAbout />
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
```

## Refs

* [代码分割 – React](https://zh-hans.reactjs.org/docs/code-splitting.html)
* [代码分离](https://webpack.docschina.org/guides/code-splitting/)

[error_boundaries]: https://zh-hans.reactjs.org/docs/error-boundaries.html
