import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaEnvelopeOpenText, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { makeSelectUser, makeSelectLocation } from '../../App/selectors';
import '../profile.css';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectToken } from '../selectors';

import { Nav, NavItem, NavLink, Breadcrumb, BreadcrumbItem } from 'reactstrap';

function App(props) {
  const {
    location: { pathname },
  } = props;
  useInjectReducer({
    key: 'userPersonalInformationPage',
    reducer,
  });
  useInjectSaga({ key: 'userPersonalInformationPage', saga });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const { user, token } = props;
  return (
    <>
      <div>
        {token || user.email_verified ? (
          <>
            {/* <div className="text-center p-4 bg-white rounded-lg">
              <div className="relative inline-block">
                <FaEnvelopeOpenText className="text-5xl text-gray-300" />
                <div className="flex absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-success">
                  <FaCheck className="m-auto text-white" />
                </div>
              </div>
              <div className=" mt-2 font-bold">
                <p className="text-success">Your Email is Verified</p>
              </div>
            </div> */}
            <Breadcrumb className="my-5">
              <BreadcrumbItem active>Profile</BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/">Home</a>
              </BreadcrumbItem>
            </Breadcrumb>

            <div className="ProfileNav">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    href="/user/profile/information"
                    active={pathname === '/user/profile/information'}
                  >
                    Information
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/user/profile/notification"
                    active={pathname === '/user/profile/notification'}
                  >
                    Notification
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/user/profile/routine"
                    active={pathname === '/user/profile/routine'}
                  >
                    Class Routine
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/user/profile/assignments"
                    active={pathname === '/user/profile/assignments'}
                  >
                    Class Assignment
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/user/profile/change-password"
                    active={pathname === '/user/profile/change-password'}
                  >
                    Change Password
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </>
        ) : (
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="relative inline-block">
              <FaEnvelopeOpenText className="text-5xl text-gray-300" />
              <div className="flex absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-red-500">
                <FaTimes className="m-auto text-white" />
              </div>
            </div>
            <div className="mt-2 font-bold">
              <p>Your Email address is not verified</p>
            </div>
            <NavLink
              className="inline-block mt-2 bg-red-500 border border-red-600 text-white px-4 py-1 hover:bg-red-600 rounded"
              to="/user/profile/verify"
            >
              Verify Your Email
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  token: makeSelectToken(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(App);
