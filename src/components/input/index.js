import React from 'react';

import './index.css';

const Input = ({ name, value, placeholder, className, onChange }) => (
  <input
    type="text"
    name={name}
    value={value}
    placeholder={placeholder}
    className={className}
    onChange={event => onChange(event.target.value)}
  />
);

export default Input;
