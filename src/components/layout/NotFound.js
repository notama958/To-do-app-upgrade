import React, { Fragment } from 'react';
import Navbar from './Navbar';
// import Spinner from '../layout/Spinner';

const NotFound = (props) => {
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
      {/* <Spinner /> */}
    </Fragment>
  );
};

export default NotFound;
