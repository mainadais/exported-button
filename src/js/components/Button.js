import React, { useState } from "react";

const Button = () => {
  const [state, setstate] = useState(0);

  return (
    <div className="counter">
      <button onClick={() => setstate(state + 3)}>+</button>
      <span>{state}</span>
      <button onClick={() => setstate(state - 3)}>-</button>
    </div>
  );
};

export default Button;
