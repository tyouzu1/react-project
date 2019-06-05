import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import styles from './BasicLayout.css';

function BasicLayout(props) {
  const { children } = props;
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>这里是BasicLayout</h1>
      {children}
    </div>
  );
}
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default hot(module)(BasicLayout);
