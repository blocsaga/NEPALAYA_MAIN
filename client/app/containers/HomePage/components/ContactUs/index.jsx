import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import { RECAPTCHA_SITE_KEY } from '../../../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectContactDetail,
  makeSelectError,
  makeSelectErrorMsg,
  makeSelectIsRequesting,
  makeSelectSuccess,
} from './selectors';
import {
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback,
} from 'reactstrap';
import HomeUrl from '../../../../assets/images/home-border.png';
import Feature from '../../../../assets/images/features/img-3.png';
const ContactUs = (props) => {
  useInjectReducer({ key: 'contactUs', reducer });
  useInjectSaga({ key: 'contactUs', saga });

  const recaptchaRef = useRef(null);
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reCaptcha: '',
  });

  const handleChange = (name) => (event) => {
    setState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  useEffect(() => {
    if (props.success) {
      setState({ name: '', email: '', subject: '', message: '' }, () => {
        window.grecaptcha && window.grecaptcha.reset();
      });
    }
  }, [props.success]);

  const handleSave = () => {
    props.saveContactRequest(state);
  };

  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    props.onSubmit(recaptchaValue);
  };

  const onChange = (e) => {
    setState((prev) => ({ ...prev, reCaptcha: e }));
  };

  const { isRequesting, contactDetail, errors, errorMsg } = props;
  const { name, email, subject, message } = state;

  return (
    <div className="">
      <Helmet>
        <title>Contact</title>
      </Helmet>

      <section className="section" id="contact">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="title-box text-center">
                <h3 className="title-heading mt-4">
                  Let's talk about everything!
                </h3>
                <p className="text-muted f-17 mt-3">
                  Help us by filing the form below. One of our officer will get
                  reach to you. <br />
                  Please write your queries in short.
                </p>
                <img src={HomeUrl} height="15" className="mt-3" alt="" />
              </div>
            </Col>
          </Row>
          <Row className="mt-5 pt-4">
            <Col lg={6}>
              <div className="mt-4 home-img text-center">
                <div className="animation-2"></div>
                <div className="animation-3"></div>
                <img src={Feature} className="img-fluid" alt="" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="custom-form mt-4">
                <div id="message"></div>
                <div name="contact-form" id="contact-form">
                  <Row>
                    <Col lg={6}>
                      <FormGroup className="mt-3">
                        <Label className="contact-lable">Full Name</Label>
                        <Input
                          onChange={handleChange('name')}
                          value={name}
                          id="name"
                          name="name"
                          className="form-control"
                          type="text"
                          invalid={errors && errors.name}
                        />
                        {errors && errors.name && (
                          <FormFeedback>{errors.name}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup className="mt-3">
                        <Label className="contact-lable">Subject</Label>
                        <Input
                          value={subject}
                          onChange={handleChange('subject')}
                          id="subject"
                          name="subject"
                          className="form-control"
                          type="text"
                          invalid={errors && errors.subject}
                        />
                        {errors && errors.subject && (
                          <FormFeedback>{errors.subject}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <FormGroup className="mt-3">
                        <Label className="contact-lable">Email Address</Label>
                        <Input
                          name="email"
                          className="form-control"
                          value={email}
                          onChange={handleChange('email')}
                          id="email"
                          type="text"
                          invalid={errors && errors.email}
                        />
                        {errors && errors.email && (
                          <FormFeedback>{errors.email}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <FormGroup className="mt-3">
                        <Label className="contact-lable">Your Message</Label>
                        <Input
                          value={message}
                          onChange={handleChange('message')}
                          id="message"
                          type="textarea"
                          name="comments"
                          rows="5"
                          className="form-control"
                          invalid={errors && errors.message}
                        />
                        {errors && errors.message && (
                          <FormFeedback>{errors.message}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} className="mt-3 text-left">
                      {/* <Input
                          id="submit"
                          name="send"
                          color="primary"
                          className="submitBnt btn btn-primary btn-round"
                          value="Send Message"
                          type="submit"
                          style={{ width: 'auto', color: '#fff' }}
                        /> */}

                      <div className="mb-4">
                        {isRequesting && isRequesting == true ? (
                          <>Loading</>
                        ) : (
                          <form onSubmit={onSubmit}>
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={RECAPTCHA_SITE_KEY}
                              onChange={onChange}
                            />
                          </form>
                        )}
                        {errorMsg && errorMsg !== '' && (
                          <div className="error">{errorMsg}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="submitBnt btn btn-primary btn-round"
                        // className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
                        disabled={isRequesting}
                        onClick={handleSave}
                      >
                        Send Message
                      </button>
                      <div id="simple-msg"></div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <div className="container mx-auto py-10 px-5 sm:px-0">
        <div className="max-w-xl">
          <h1 className="text-2xl">Contact</h1>
          <div className="mt-4">
            <div>
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                htmlFor="name"
              >
                Name
              </label>
              <input
                onChange={handleChange('name')}
                value={name}
                id="name"
                className="inputbox"
               
                type="text"
              />
              {errors && errors.name && (
                <FormFeedback>
               {errors.name}
              </FormFeedback>
              )}


            </div>
            <div className="mt-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={handleChange('email')}
                className="inputbox"
                id="email"
                type="text"
              />
              {errors && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              value={subject}
              onChange={handleChange('subject')}
              className="inputbox"
              id="subject"
              type="text"
            />
            {errors && errors.subject && (
              <div className="error">{errors.subject}</div>
            )}
          </div>
          <div className="w-full mt-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
              htmlFor="subject"
            >
              Message
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={handleChange('message')}
              className="inputbox"
              id="message"
              type="text"
            />
            {errors && errors.message && (
              <div className="error">{errors.message}</div>
            )}
          </div>
          <div className="mt-4">
            {isRequesting && isRequesting == true ? (
              <>Loading</>
            ) : (
              <form onSubmit={onSubmit}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                />
              </form>
            )}
            {errorMsg && errorMsg !== '' && (
              <div className="error">{errorMsg}</div>
            )}
          </div>
          <button
            type="button"
            className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            disabled={isRequesting}
            onClick={handleSave}
          >
            Send Message
          </button>
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  success: makeSelectSuccess(),
  errorMsg: makeSelectErrorMsg(),
  errors: makeSelectError(),
  contactDetail: makeSelectContactDetail(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
