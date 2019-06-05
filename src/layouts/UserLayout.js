import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import styles from './UserLayout.css';

function UserLayout(props) {
  const { children } = props;
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>UserLayout.</h1>
      {children}
    </div>
  );
}
UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default hot(module)(UserLayout);
