import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';

import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import Table from '../../../components/Table';
import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Button from '../../../components/Basic/Button';

import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectCategory,
} from './selectors';
import DeleteDialog from '../../../components/DeleteDialog';

import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';

const key = 'notificationManagePage';

function NotificationManagePage(props) {
  const {
    setQueryValue,
    loadAllRequest,
    clearQuery,
    clearOne,
    all: { data, page, size, totaldata },
    loading,
  } = props;

  const [state, setState] = useState({
    open: false,
    deleteId: '',
  });
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();

  useEffect(() => {
    clearQuery();
    loadAllRequest(props.query);
  }, []);

  const handlePagination = (paging) => {
    setQueryValue({ key: 'page', value: paging.page });
    setQueryValue({ key: 'size', value: paging.size });
  };

  const handleAdd = () => {
    clearOne();
    navigate('/admin/notification-manage/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/notification-manage/edit/${id}`);
  };

  const handleOpen = (id) => {
    setState({ open: true, deleteId: id });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleDelete = (id) => {
    deleteOneRequest(id);
    setState({ open: false });
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ question, category, added_at, updated_at, _id }) => [
      question,
      (category && category.title) || 'No',
      moment(added_at).format(DATE_FORMAT),
      moment(updated_at).format(DATE_FORMAT),
      <>
        <div className="flex gap-2">
          <span className="icon-edit" onClick={() => handleEdit(_id)}>
            <FaPen />
          </span>
          <span className="icon-trash" onClick={() => handleOpen(_id)}>
            <FaTrash />
          </span>
        </div>
      </>,
    ],
  );

  return (
    <>
      <DeleteDialog
        open={state.open}
        doClose={handleClose}
        doDelete={() => handleDelete(state.deleteId)}
      />
      {loading && loading == true ? <Loading /> : <></>}
      <Helmet>
        <title>Notification Listing</title>
      </Helmet>
      {loading && loading === true ? <Loading /> : <></>}
      <PageHeader title="Notification Manage" />
      <Button className="my-3" onClick={handleAdd}>
        <FaPlus />
        <span className="pl-2">Add New</span>
      </Button>
      <PageContent loading={loading}>
        <Table
          tableHead={[
            'Question',
            'Category',
            'Added At',
            'Updated At',
            'Actions',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
}

NotificationManagePage.propTypes = {
  clearQuery: PropTypes.func.isRequired,
  loadCategoryRequest: PropTypes.func.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  category: makeSelectCategory(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationManagePage);
