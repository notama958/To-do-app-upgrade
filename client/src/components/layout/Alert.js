import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * This component for Alert notification rendering
 * @param {Array} alerts
 * @returns React elements
 */
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {/* {console.log(alert.alertType)} */}
      {alert.msg}
    </div>
  ));
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
// map alerts to state.alert
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
