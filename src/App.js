import React, { lazy, Suspense } from 'react';

const LazyAbout = lazy(() => import(/* webpackChunkName: "about" */ './About'));

class App extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <LazyAbout />
      </Suspense>
    );
  }
}

export default App;
