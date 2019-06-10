import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../reducers/dashboard';

import styles from './Dashboard.scss';

function Dashboard(props) {
  console.log(props);
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>这里是Dashboard</h1>
    </div>
  );
}
Dashboard.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(actions.setDashboard(ownProps.filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
