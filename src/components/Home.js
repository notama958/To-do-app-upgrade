import React, { Fragment } from 'react';
import Navbar from './layout/Navbar';
import { Link } from 'react-router-dom';
import store from '../store';
import { connect, Provider } from 'react-redux';

const Home = ({ manual }) => {
  return (
    <Fragment>
      <Navbar />
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">TO-DO LIST</h1>
            <p className="lead">Simple note for everyone</p>
            <div className="take-a-note">
              <Link to="/dashboard" className="btn btn-primary">
                Take a note
              </Link>
            </div>
          </div>
        </div>
        {manual ? (
          <div className={`dark-overlay readme `}>
            <div className="landing-inner">
              <p>Instruction for usage updated later on</p>
            </div>
          </div>
        ) : (
          console.log(manual)
        )}
      </section>
    </Fragment>
  );
};

const mapStateToProps = ({ home }) => ({
  manual: home.manual,
});
export default connect(mapStateToProps)(Home);
