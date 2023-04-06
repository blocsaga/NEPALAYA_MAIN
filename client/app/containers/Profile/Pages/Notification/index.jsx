import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectNotification, makeSelectLoading } from './selectors';
import { makeSelectUser } from '../../../App/selectors';
import { FaBell, FaInfoCircle } from 'react-icons/fa';
import { Alert } from 'reactstrap';
const key = 'userNotificationPage';
const NotificationPage = (props) => {
  const { loadNotificationRequest, notification, user, loading } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadNotificationRequest();
  }, []);
  console.log('Notification', notification);

  return loading && loading === true ? (
    <div className="circular_loader waftloader"></div>
  ) : (
    <div>
      <div className="my-4 container mx-auto">
        <div className="section-title">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-2xl">
            Notification from college.
          </h2>
        </div>
        {notification && notification.data && notification.data.length > 0 ? (
          notification.data.map((dat) => (
            <>
              <Alert className="flex my-2" role="alert">
                <div className="row">
                  <div className="p-2 my-auto">
                    <FaBell className="fill-current h-6 w-6 text-teal-500 mr-4" />
                  </div>
                  <div>
                    <p className="h4 mb-0">{dat.question}</p>

                    <div
                      className="ckEditor"
                      dangerouslySetInnerHTML={{
                        __html: dat.title,
                      }}
                    />
                  </div>
                </div>
              </Alert>
            </>
          ))
        ) : (
          <div
            className="bg-blue-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <FaInfoCircle className="fill-current h-6 w-6 text-teal-500 mr-4" />
              </div>
              <div className="my-auto">
                <p>
                  You don't have any notification from nepalaya yet. Thank you!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
NotificationPage.propTypes = {
  loadNotificationRequest: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  notification: makeSelectNotification(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
