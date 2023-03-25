import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import { Input, Label } from 'reactstrap';

const PasswordInput = (props) => {
  const { password, setStoreValue, error } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <>
      <Label for="password">Password</Label>
      <Input
        type="password"
        className="form-control"
        label="Password"
        onChange={handleChange}
        value={password}
        placeholder="Enter Password"
      />
      {error && error}
    </>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  error: makeSelectPasswordError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);
