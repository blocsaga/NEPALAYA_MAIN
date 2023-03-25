import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';
import Button from '../../../../components/Basic/Button';

import { Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';

const key = 'adminNotificationCategoryManagePage';

function AddEdit(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    classes,
    one,
    match,
    loading,
    errors,
    addEditRequest,
    loadOneRequest,
    clearErrors,
    setOneValue,
  } = props;
  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    clearErrors();
    if (routeID) {
      loadOneRequest(routeID);
    }
  }, []);

  // componentDidMount() {
  //   clearErrors();
  //   if (match.params && match.params.id) {
  //     loadOneRequest(match.params.id);
  //   }
  // }

  const handleChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleSave = () => {
    addEditRequest();
  };
  const handleGoBack = () => {
    navigate('/admin/blog-cat-manage');
  };
  return loading && loading == true ? (
    <Loading />
  ) : (
    <div>
      <Helmet>
        <title>
          {routeID ? 'Edit Notification Category' : 'Add Notification Category'}
        </title>
      </Helmet>
      <PageHeader
        title={
          routeID ? 'Edit Notification Category' : 'Add Notification Category'
        }
        actions={
          <Button variant="primary" onClick={handleGoBack}>
            <FaArrowLeft className="text-xl" />
          </Button>
        }
      />
      <PageContent>
        <FormGroup>
          <Label> Title</Label>
          <Input
            id="title"
            name="Title"
            type="text"
            value={one.title}
            onChange={handleChange('title')}
            invalid={!!(errors && errors.title && errors.title.trim() !== '')}
          />
          {errors && errors.title && errors.title.trim() !== '' && (
            <FormFeedback>{errors && errors.title}</FormFeedback>
          )}
        </FormGroup>

        <FormGroup className="my-3">
          <Label> Key</Label>
          <Input
            id="key"
            name="key"
            type="text"
            value={one.key}
            onChange={handleChange('key')}
            invalid={!!(errors && errors.key && errors.key.trim() !== '')}
          />
          {errors && errors.key && errors.key.trim() !== '' && (
            <FormFeedback>{errors && errors.key}</FormFeedback>
          )}
        </FormGroup>

        <FormGroup check inline className="my-3">
          <Input
            label=" Is Active"
            checked={one.is_active || false}
            onChange={handleCheckedChange('is_active')}
            id="is_active"
            type="checkbox"
          />
          <Label check>Is Active</Label>
        </FormGroup>

        <Button onClick={handleSave}>Save</Button>
      </PageContent>
    </div>
  );
}

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  classes: PropTypes.object,
  one: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
