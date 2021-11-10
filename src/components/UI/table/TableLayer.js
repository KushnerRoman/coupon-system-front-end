import React from 'react';

import classes from './TableLayer.module.css';

const TableLayer = (props) => {
  return (
    <div className={`${classes.tableLayer} ${props.className}`}>{props.children}</div>
  );
};

export default TableLayer;
