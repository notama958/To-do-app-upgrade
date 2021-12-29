import React, { Fragment } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import Guide from './Guide';
/**
 * This component renders the Not found page when users go to unknown endpoints
 * @param {Boolean} manual => a store's prop
 * @returns
 */
const NotFound = ({ manual }) => {
  return (
    <Fragment>
      <Navbar />
      <section className="landing">
        <div className="landing-inner">
          <h1 className="large text-dark">
            <i className="fas fa-exclamation"></i> Page not found
          </h1>
        </div>
      </section>
      {manual ? (
        <div className={`dark-overlay readme `}>
          <div className="landing-inner">
            <Guide />
          </div>
        </div>
      ) : (
        console.log(manual)
      )}
    </Fragment>
  );
};
const mapStateToProps = ({ home }) => ({
  manual: home.manual,
});
export default connect(mapStateToProps)(NotFound);
