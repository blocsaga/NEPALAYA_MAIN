import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectName, makeSelectNameError } from '../selectors';
import { Input, Label } from 'reactstrap';

const NameInput = (props) => {
  const { name, setStoreValue, error } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'name', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <>
      <Label for="name">Full Name</Label>
      <Input
        type="name"
        className="form-control"
        label="Name"
        onChange={handleChange}
        value={name}
        placeholder="Enter FullName"
      />
      {error && error}
    </>
  );
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  error: makeSelectNameError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);
