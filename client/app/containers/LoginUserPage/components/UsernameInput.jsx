import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';
import { Input, Label } from 'reactstrap';

const EmailInput = (props) => {
  const { email, setStoreValue, error } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'email', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <>
      <Label for="email">Email</Label>
      <Input
        type="email"
        className="form-control"
        label="Email"
        onChange={handleChange}
        value={email}
        placeholder="Enter Email"
      />
      {error && error}
    </>
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailInput);
