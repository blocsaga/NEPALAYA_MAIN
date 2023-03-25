import { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Button,
  Input,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Feature4 from '../../assets/images/features/img-4.png';

import LogoDark from '../../assets/images/logo-dark.png';
import Usernameinput from './components/Usernameinput';
import PasswordInput from './components/PasswordInput';
import { connect } from 'react-redux';
import * as mapDispatchToProps from './actions';
import {
  makeSelectEmailError,
  makeSelectErrors,
  makeSelectHelperObj,
  makeSelectLoading,
  makeSelectLoadingObj,
  makeSelectPasswordError,
  makeSelectTwoFactor,
} from './selectors';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';

import Modal from '../../components/Modal';

function LoginUserPage(props) {
  const {
    loginRequest,
    loading,
    errors,
    emailErr,
    passwordErr,
    twoFactor,
    loadingObj: { loggingUser, sendingCode },
    helperObj: { showEmailTwoFactor },
    setOpen,
  } = props;
  useInjectReducer({ key: 'loginUserPage', reducer });
  useInjectSaga({ key: 'loginUserPage', saga });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };
  const handleClose = () => {
    props.setValue({
      name: 'helperObj',
      key: 'showEmailTwoFactor',
      value: false,
    });
  };

  useEffect(() => {
    handleClose();
    props.clearStore({ name: 'errors' });
  }, []);
  const handleChange = (e, name) => {
    props.setValue({
      name: 'twoFactor',
      key: 'multi_fa',
      value: {
        ...twoFactor.multi_fa,
        [name]: {
          ...twoFactor.multi_fa[name],
          [e.target.name]: e.target.value,
        },
      },
    });
    props.setValue({
      name: 'errors',
      key: 'multi_fa',
      value: {
        ...errors.multi_fa,
        [name]: { ...errors.multi_fa[name], [e.target.name]: '' },
      },
    });
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    props.addTwoFactorRequest();
  };
  return (
    <>
      <Helmet>
        <title>Log in to your account</title>
      </Helmet>
      <Modal
        open={showEmailTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
        buttonLabel2={
          sendingCode ? (
            <>
              <div className="flex text-center justify-center">
                <div className="loading_wrapper">
                  <span className="font-bold mr-2 my-auto text-white">
                    Sending
                  </span>
                  <div className="dot-elastic" />{' '}
                </div>
              </div>
            </>
          ) : (
            'Continue'
          )
        }
        width="sm"
      >
        {showEmailTwoFactor && (
          <div className="border p-2 m-2">
            <label>Enter the code</label>
            <label className="text-xs">Check inbox for the code</label>
            <input
              id="code"
              name="code"
              value={twoFactor && twoFactor.email && twoFactor.email.code}
              onChange={(e) => handleChange(e, 'email')}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitCode(e)}
            />
            <div className="error">
              {errors && errors.multi_fa && errors.multi_fa.email.code}
            </div>
          </div>
        )}
      </Modal>
      <div className="account-home-btn d-none d-sm-block">
        <Link to="/" className="text-primary">
          <i className="mdi mdi-home h1"></i>
        </Link>
      </div>

      <section className="bg-account-pages vh-100">
        <div className="display-table">
          <div className="display-table-cell">
            <Container>
              <Row className="no-gutters align-items-center">
                <Col lg={12}>
                  <div className="login-box">
                    <Row className="align-items-center no-gutters">
                      <Col lg={6}>
                        <div className="bg-light">
                          <div className="row justify-content-center">
                            <div className="col-lg-10">
                              <div className="home-img login-img text-center d-none d-lg-inline-block">
                                <div className="animation-2"></div>
                                <div className="animation-3"></div>
                                <img
                                  src={Feature4}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Row className="justify-content-center">
                          <Col lg={11}>
                            <div className="p-4">
                              <div className="text-center mt-3">
                                <Link to="#">
                                  <img src={LogoDark} alt="" height="22" />
                                </Link>
                                <p className="text-muted mt-3">
                                  Sign in to continue to Nepalaya.
                                </p>
                              </div>
                              <div className="p-3 custom-form">
                                <Form onSubmit={handleSubmit}>
                                  <FormGroup>
                                    <Usernameinput />
                                  </FormGroup>
                                  <FormGroup>
                                    <PasswordInput />
                                  </FormGroup>
                                  <div className="custom-control custom-checkbox">
                                    <Input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="customControlInline"
                                    />
                                    <Label
                                      className="custom-control-label"
                                      for="customControlInline"
                                    >
                                      Remember me
                                    </Label>
                                  </div>
                                  <div className="mt-3">
                                    <Button
                                      color="primary"
                                      className="btn btn-primary btn-block"
                                      block
                                    >
                                      {loading ? 'Loading' : 'Log In'}
                                    </Button>
                                  </div>
                                  <div className="mt-4 pt-1 mb-0 text-center">
                                    <p className="mb-0">
                                      Forgot your password ?
                                      <Link
                                        to="/forgot-password-user"
                                        className="text-success"
                                      >
                                        {' '}
                                        Click here.
                                      </Link>
                                    </p>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}

LoginUserPage.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  emailErr: makeSelectEmailError(),
  passwordErr: makeSelectPasswordError(),
  twoFactor: makeSelectTwoFactor(),
  helperObj: makeSelectHelperObj(),
  loadingObj: makeSelectLoadingObj(),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginUserPage);
