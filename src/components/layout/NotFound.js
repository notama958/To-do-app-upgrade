import React, { Fragment } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import Guide from './Guide';
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
