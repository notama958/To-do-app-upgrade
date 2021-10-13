import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <div
        style={{
          color: 'black',

          position: 'relative',
          verticalAlign: 'middle',
          alignItems: 'center',
          textAlign: 'center',
          height: 'fit-content',
        }}
      >
        <i className="fas fa-sync-alt" id="spinner"></i>
        <p
          style={{
            color: 'black',
            display: 'block',
            position: 'relative',
          }}
        >
          loading...
        </p>
      </div>
    </Fragment>
  );
};

export default Spinner;
