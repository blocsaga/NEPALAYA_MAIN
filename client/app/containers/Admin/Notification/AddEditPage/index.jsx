import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import { FaArrowLeft } from 'react-icons/fa';
import CKEditor from 'react-ckeditor-component';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectCategory,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import Button from '../../../../components/Basic/Button';

import { FormGroup, Input, Label } from 'reactstrap';

const key = 'notificationManagePage';

function AddEdit(props) {
  const { classes, category, one, match, loading, errors } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
    props.loadCategoryRequest();
  }, []);

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    props.setOneValue({ key: name, value: newContent });
  };

  const handleGoBack = () => {
    navigate('/admin/notification-manage');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{routeID ? 'Edit Notification' : 'Add Notification '}</title>
      </Helmet>

      <PageHeader
        title={routeID ? 'Edit Notification' : 'Add Notification'}
        actions={
          <Button onClick={handleGoBack}>
            <FaArrowLeft className="text-xl" />
          </Button>
        }
      />

      <PageContent>
        <FormGroup className="mb-2">
          <Label id="btnGroupAddon">Question</Label>
          <Input
            id="notification"
            type="text"
            name="Question"
            value={one.question || ''}
            onChange={handleChange('question')}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <Label id="btnGroupAddon" className="full-width">
            Answer
          </Label>

          <CKEditor
            name="Answer"
            content={one && one.title}
            config={{ allowedContent: true }}
            events={{
              change: (e) => handleEditorChange(e, 'title'),
              value: (one && one.title) || '',
            }}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <Label id="btnGroupAddon">Category</Label>
          <select
            className="form-control"
            value={one.category || ''}
            onChange={handleChange('category')}
            inputprops={{
              name: 'category',
              id: 'category-title',
            }}
          >
            <option value="" disabled>
              None
            </option>
            {category &&
              category.length &&
              category.map((each) => (
                <option key={each._id} value={each._id}>
                  {each.title}
                </option>
              ))}
          </select>
        </FormGroup>

        <Button onClick={handleSave}>Save</Button>
      </PageContent>
    </>
  );
}
AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  loadCategoryRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,

  one: PropTypes.object.isRequired,
  category: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
