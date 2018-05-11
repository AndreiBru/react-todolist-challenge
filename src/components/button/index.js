import React from 'react';

import './index.css';

// type = add | edit | default
const Button = ({ onClick, type, children }) => (
  <button onClick={onClick} className={`button ${type}`}>
    {children}
  </button>
);

export default Button;
