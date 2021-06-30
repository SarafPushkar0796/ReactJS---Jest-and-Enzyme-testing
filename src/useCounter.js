import React, { useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (initialValue) => {
  const [state, setState] = useState(0);

  const increment = () => {
    setState(preState => ++preState);
  };

  const decrement = () => {
    setState(preState => --preState);
  };

  return {
    state,
    increment,
    decrement
  };
};