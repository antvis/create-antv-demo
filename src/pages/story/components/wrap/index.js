import React from 'react';

export const WrapComponent = (props) => {
  return <div className="section">{props.children}</div>;
};
