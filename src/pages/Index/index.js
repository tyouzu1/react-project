import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

function UserLayout(props) {
  const { children } = props;
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {children}
    </div>
  );
}
UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserLayout;
