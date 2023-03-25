import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSection, makeSelectLoading } from './selectors';
import { makeSelectUser } from '../../../App/selectors';
import { FaClock, FaInfoCircle } from 'react-icons/fa';

const key = 'userSectionPage';
const SectionPage = (props) => {
  const { loadSectionRequest, section, user, loading } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadSectionRequest();
  }, []);
  console.log('section', section);

  return loading && loading === true ? (
    <div className="circular_loader waftloader"></div>
  ) : (
    <div>
      <div className="my-10 container mx-auto">
        <div className="section-title">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-2xl">
            Get to know which section you are in.
          </h2>
        </div>
        {section && section.data && section.data.length > 0 ? (
          section.data.map((dat) => (
            <div
              key={dat.key}
              className="bg-blue-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <FaClock className="fill-current h-6 w-6 text-teal-500 mr-4" />
                </div>
                <div>
                  <p className="font-bold">{dat.name}</p>

                  <div
                    className="ckEditor"
                    dangerouslySetInnerHTML={{
                      __html: dat.description,
                    }}
                  />
                </div>
              </div>
            </div>
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
                  You are not added in any section yet. Please contact your
                  teacher to add you in the group. Thank you!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
SectionPage.propTypes = {
  loadSectionRequest: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  section: makeSelectSection(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionPage);
