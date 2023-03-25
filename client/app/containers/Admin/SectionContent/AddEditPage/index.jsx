import moment from 'moment';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { push } from 'redux-first-history';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import TextField from '../../../../components/Basic/TextField';
import WECkEditior from '../../../../components/CkEditor';
import SelectField from '../../../../components/Basic/Select';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import { DATE_FORMAT } from '../../../App/constants';
import { makeSelectToken } from '../../../App/selectors';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectUsers,
  makeSelectErrors,
  makeSelectLoading,
  makeSelectMetaTag,
  makeSelectOne,
} from '../selectors';

const AddEdit = (props) => {
  const { one, match, users, loading, errors, tempMetaTag, edit_id } = props;

  useInjectReducer({ key: 'contentsListingPage', reducer });
  useInjectSaga({ key: 'contentsListingPage', saga });
  const { id: routeID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
      props.loadUsersRequest(props.query);
    }
  }, []);

  useEffect(() => {
    props.loadUsersRequest(props.query);
  }, []);

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    props.setOneValue({ key: name, value: newContent });
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleDateChange = (name) => (date) => {
    props.setOneValue({
      key: name,
      value: moment(date).format(DATE_FORMAT),
    });
  };

  const handleGoBack = () => {
    navigate('/admin/section-content');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleTempMetaTag = (e) => {
    e.persist();
    props.setMetaTagValue(e.target.value);
  };

  const insertMetaTags = (event) => {
    event.preventDefault();
    if (props.tempMetaTag.trim() !== '') {
      if (props.one.meta_tag.indexOf(props.tempMetaTag) === -1) {
        props.setOneValue({
          key: 'meta_tag',
          value: [...props.one.meta_tag, props.tempMetaTag],
        });
        props.setMetaTagValue('');
      }
    }
    return { tempMetaTag: props.setMetaTagValue('') };
  };

  const handleMetaTagDelete = (index) => () => {
    const chipData = [...props.one.meta_tag];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'meta_tag', value: chipData });
  };

  const handleMultipleSelectUsersChange = (e) => {
    props.setUserValue({ value: e && e.map((each) => each.value) });
  };

  let listUsersNormalized = {};
  const listUsers = users.map((each) => {
    const obj = {
      label: each.name,
      value: each._id,
    };
    listUsersNormalized = {
      ...listUsersNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {edit_id && edit_id !== '' ? 'Edit Section' : 'Add Section'}
        </title>
      </Helmet>
      <PageHeader
        title={routeID ? 'Edit Section' : 'Add Section'}
        back={`/admin/section-content`}
        actions={
          <>
            <Button onClick={handleGoBack} variant="secondary">
              <FaTimes className="mr-1" /> Cancel
            </Button>
            <Button onClick={handleSave} variant="success">
              <FaCheck className="mr-1" /> Save
            </Button>
          </>
        }
      ></PageHeader>

      <PageContent className="bg-white border- p-4">
        <TextField
          label={'Content Title'}
          type="text"
          value={one.name}
          onChange={handleChange('name')}
          error={errors.name}
        />

        <TextField
          className="mt-4"
          label={'Content Key'}
          type="text"
          value={one.key}
          onChange={handleChange('key')}
          error={errors.key}
        />

        <SelectField
          className="md:w-1/2 mt-4"
          label="Users"
          id="Users"
          options={listUsers}
          value={
            (one.users &&
              one.users.map((each, index) => {
                const userObj = listUsersNormalized[each];
                if (!userObj) {
                  return {
                    label: 'loading',
                    value: index,
                  };
                }
                return userObj;
              })) ||
            []
          }
          name="users"
          placeholder="Add users to the section"
          onChange={handleMultipleSelectUsersChange}
          isSearchable
          isMulti
        />
        <WECkEditior
          className="my-4"
          description={one.description}
          setOneValue={props.setOneValue}
          label={'Description'}
          error={errors.description}
        />
        <Checkbox
          label="Is Active"
          name="is_active"
          handleChange={handleCheckedChange('is_active')}
          checked={one.is_active || false}
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  users: makeSelectUsers(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
  tempMetaTag: makeSelectMetaTag(),
});

export default connect(mapStateToProps, {
  ...mapDispatchToProps,
  push,
})(AddEdit);
