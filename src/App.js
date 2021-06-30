import React from 'react';
import './App.css';
import useCounter from './useCounter';

function App({ initialCount }) {
  
  // calling custom hook
  const { state, increment, decrement } = useCounter(initialCount);

  return (
    <div data-test="component-app" className="App container">
      <p>React version: <strong>{React.version}</strong></p>      

      {/* onClick update counter */}
      <button className="btn btn-outline-primary" data-test="btn-incr" onClick={ increment }>Increment by 1</button>
      <h1 data-test="display-count">Counter is: { state }</h1>
      <button className="btn btn-outline-primary" data-test="btn-decr" onClick={ decrement }>Decrement by 1</button>
    </div>
  );
}

export default App;