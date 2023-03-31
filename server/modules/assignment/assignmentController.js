const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const assignmentSch = require('./assignmentSchema');
const assignmentConfig = require('./assignmentConfig');
const assignmentController = {};

assignmentController.GetAssignment = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_from) {
      searchQuery = { publish_from: { $regex: req.query.find_publish_from, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_to) {
      searchQuery = { publish_to: { $regex: req.query.find_publish_to, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    }
    populate = [{ path: 'image' }];
    let pulledData = await otherHelper.getQuerySendResponse(assignmentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, assignmentConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

assignmentController.GetAssignmentForUsers = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_from) {
      searchQuery = { publish_from: { $regex: req.query.find_publish_from, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_to) {
      searchQuery = { publish_to: { $regex: req.query.find_publish_to, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    }
    populate = [{ path: 'image' }, { path: 'users' }];
    let pulledData = await otherHelper.getQuerySendResponse(assignmentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, AssignmentConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

assignmentController.SaveAssignment = async (req, res, next) => {
  try {
    const assignments = req.body;
    // console.log('assignments try block', assignments);

    if (assignments && assignments._id) {
      const update = await assignmentSch.findByIdAndUpdate(assignments._id, { $set: assignments }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, assignmentConfig.save, null);
    } else {
      // console.log('assignments', assignments);
      assignments.added_by = req.user.id;
      const newassignment = new assignmentSch(assignments);
      const assignmentsSave = await newassignment.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, assignmentsSave, null, assignmentConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
assignmentController.GetAssignmentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const assignments = await assignmentSch.findOne({ _id: id, is_deleted: false }).populate([{ path: 'image' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, assignments, null, assignmentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
assignmentController.GetAssignmentForCounter = async (req, res, next) => {
  try {
    var doc = 0;
    assignmentSch.findByIdAndUpdate({ _id: 'visitor_counter' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, assignmentSch) {
      if (error) return next(error);
      doc = (assignmentSch && assignmentSch.seq) || 1;
      const assignments = { description: '<div>Visitor : <span class="visitor_counter">' + doc + '</span></div>', key: 'counter', name: 'counter' };
      return otherHelper.sendResponse(res, httpStatus.OK, true, assignments, null, assignmentConfig.get, null);
    });
  } catch (err) {
    next(err);
  }
};
assignmentController.GetAssignmentByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const assignments = await assignmentSch.findOne({ key, is_deleted: false, is_active: true }).populate([{ path: 'image' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, assignments ? assignments : { key: req.params.key, description: `<div class="text-sm border border-red-100 bg-red-50 rounded px-2 py-1 text-red-600 inline-block m-4">assignment not found [key=${req.params.key}]</div>` }, null, assignmentConfig.get, null);
  } catch (err) {
    next(err);
  }
};

// assignmentController.GetAssignmentByUser = async (req, res, next) => {
//   const _id = req.user;
//   console.log(_id);
//   console.log('_id');
//   try {
//     let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
//     if (req.query.find_name) {
//       searchQuery = { users: _id, ...searchQuery };
//     }

//     populate = [{ path: 'image' }];
//     let pulledData = await otherHelper.getQuerySendResponse(assignmentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
//     return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, AssignmentConfig.gets, page, size, pulledData.totalData);
//   } catch (err) {
//     next(err);
//   }
// };

assignmentController.DeleteAssignment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await assignmentSch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    if (del && del._id) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'assignment delete success!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'cannot delete', 'cannot delete', null);
    }
  } catch (err) {
    next(err);
  }
};

assignmentController.selectMultipleData = async (req, res, next) => {
  const { assignment_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await assignmentSch.updateMany({ _id: { $in: assignment_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await assignmentSch.updateMany(
      { _id: { $in: assignment_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};
module.exports = assignmentController;
