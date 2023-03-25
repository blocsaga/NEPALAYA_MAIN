/**
 *
 * NotificationCategory
 *
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import Table from '../../../components/Table';

import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';

import { FaPen, FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectCount,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import Button from '../../../components/Basic/Button';

const key = 'adminNotificationCategoryManagePage';

/* eslint-disable react/prefer-stateless-function */
export function NotificationCategory(props) {
  const {
    all: { data, page, size, totalData },
    loading,

    deleteCatRequest,
    getCountRequest,
    clearOne,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    deleteId: '',
    confirmOpen: false,
  });
  useEffect(() => {
    props.loadAllRequest(props.query);
  }, [props.query.size, props.query.page]);

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const handleEdit = (id) => {
    navigate(`/admin/notification-cat-manage/edit/${id}`);
  };

  const handleOpen = (id) => {
    setState({ open: true, deleteId: id });
    getCountRequest(id);
  };

  const handleConfirmClose = () => {
    setState({ confirmOpen: false });
  };

  const handleDelete = (id) => {
    deleteCatRequest(id);
  };

  const handleAdd = () => {
    clearOne();
    navigate('/admin/notification-cat-manage/add');
  };

  const tablePagination = { page, size, totaldata: totalData };
  const tableData = data.map(
    ({ title, key, is_active, added_at, updated_at, _id }) => [
      title,
      key,
      `${is_active}`,
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
        ,
      </>,
    ],
  );

  return (
    <>
      {/* <DeleteDialog
        open={state.open}
        doClose={handleClose}
        doDelete={() => handleConfirmOpen()}
        body={`You have ${count} dependent with this Notification category, if you delete this category all notifications including this category will be deleted. are you sure to delete?`}
        closeButton="No"
        confirmButton="Yes"
      /> */}

      <DeleteDialog
        open={state.open}
        doClose={handleConfirmClose}
        doDelete={() => handleDelete(state.deleteId)}
      />
      <Helmet>
        <title>Notification Listing</title>
      </Helmet>
      {loading && loading === true ? <Loading /> : <></>}
      <PageHeader title="Notification Category Manage" />
      <Button onClick={handleAdd} className="my-3">
        <FaPlus />
        <span className="pl-2">Add New</span>
      </Button>
      <PageContent loading={loading}>
        <Table
          tableHead={[
            'Title',
            'Key',
            'Is Active',
            'Added At',
            'Updated At',
            'Actions',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          loading={loading}
        />
      </PageContent>
    </>
  );
}

NotificationCategory.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  deleteCatRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totalData: PropTypes.number.isRequired,
  }),
};
const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  count: makeSelectCount(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationCategory);
