const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const userSch = require('./../user/userSchema');
const bugSch = require('./../bug/bugSchema');
const roleSch = require('./../role/roleSchema');
const contentSch = require('./../content/contentSchema');
const assignmentSch = require('./../assignment/assignmentSchema');

const notificationSch = require('./../notification/notificationSchema');
const notificationConfig = require('../notification/notificationConfig');

const contentConfig = require('../content/contentConfig');
const assignmentConfig = require('../assignment/assignmentConfig');

const adminDashboardController = {};

adminDashboardController.getNoOfCustomerByRegistration = async (req, res, next) => {
  try {
    const data = await userSch.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: `$register_method`,
          amt: { $sum: 1 },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.GetErrorsGroupBy = async (req, res, next) => {
  try {
    const bugs = await bugSch.aggregate([{ $group: { _id: '$error_type', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
    let totalData = 0;
    bugs.forEach((each) => {
      totalData = totalData + each.count;
    });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs, 'errors by group by get success!', 1, 1, totalData);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getLastXDayUserRegistration = async (req, res, next) => {
  try {
    const days = req.params.day;
    var d = new Date();
    d.setDate(d.getDate() - days);
    const data = await userSch.aggregate([
      {
        $match: {
          added_at: { $gte: d },
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$added_at' },
            day: { $dayOfMonth: '$added_at' },
            year: { $year: '$added_at' },
          },
          amt: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.rm': 1 },
      },
      { $project: { _id: '$_id.year', month: '$_id.month', day: '$_id.day', rm: '$_id.rm', amt: '$amt' } },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getLatestFiveUsers = async (req, res, next) => {
  try {
    let top = 5;
    top = Number.parseInt(top);
    const fiveUsers = await userSch.find({ is_deleted: false }).select('name email image').sort({ _id: -1 }).limit(top);
    return otherHelper.sendResponse(res, httpStatus.OK, true, fiveUsers, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getSectionsByUser = async (req, res, next) => {
  const _id = req.user.id;
  console.log(_id);
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.user.id) {
      searchQuery = { users: _id, ...searchQuery };
    }
    populate = [{ path: 'image' }];
    let pulledData = await otherHelper.getQuerySendResponse(contentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, contentConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getAssignmentsByUser = async (req, res, next) => {
  const _id = req.user.id;
  console.log(_id);
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.user.id) {
      searchQuery = { users: _id, ...searchQuery };
    }
    populate = [{ path: 'image' }];
    let pulledData = await otherHelper.getQuerySendResponse(assignmentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, assignmentConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getNotifications = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_category) {
      searchQuery = { category: req.query.find_category, ...searchQuery };
    }
    if (req.query.find_question) {
      searchQuery = {
        question: {
          $regex: req.query.find_question,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    populate = [{ path: 'category', select: '_id title' }];
    let notification = await otherHelper.getQuerySendResponse(notificationSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, notification.data, notificationConfig.notificationGet, page, size, notification.totalData);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.GetAllUserGroupBy = async (req, res, next) => {
  try {
    let role = await roleSch.find({ is_deleted: false }).select('role_title').lean();
    let totalData = await userSch.countDocuments({ is_deleted: false });
    for (var j = 0; j < role.length; j++) {
      role[j].count = await userSch.countDocuments({ roles: { $in: [role[j]._id] }, is_deleted: false });
    }
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { role }, 'users by group by get success!', 1, 1, totalData);
  } catch (err) {
    next(err);
  }
};

module.exports = adminDashboardController;
