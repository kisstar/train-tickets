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
