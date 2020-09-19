import React, { useState } from "react";

export default () => {
  const [state, setstate] = useState(0);

  return (
    <div className="counter">
      <button onClick={() => setstate(state + 1)}>+</button>
      <span>{state}</span>
      <button onClick={() => setstate(state - 1)}>-</button>
    </div>
  );
};
