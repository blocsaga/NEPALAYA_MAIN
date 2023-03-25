const httpStatus = require('http-status');
const notificationSch = require('./notificationSchema');
const notificationCatSch = require('./notificationCategorySchema');
const otherHelper = require('../../helper/others.helper');
const notificationConfig = require('./notificationConfig');
const notificationController = {};

notificationController.PostNotification = async (req, res, next) => {
  try {
    const notifications = req.body;
    if (notifications && notifications._id) {
      notifications.updated_at = new Date();
      notifications.updated_by = req.user.id;
      const update = await notificationSch.findByIdAndUpdate(notifications._id, { $set: notifications });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, notificationConfig.notificationsave, null);
    } else {
      notifications.added_by = req.user.id;
      const newnotifications = new notificationSch(notifications);
      const savenotifications = await newnotifications.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, savenotifications, null, notificationConfig.notificationsave, null);
    }
  } catch (err) {
    next(err);
  }
};
notificationController.PostNotificationCat = async (req, res, next) => {
  try {
    const notificationCat = req.body;
    let d = new Date();
    notificationCat.slug_url = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${notificationCat.title}`);
    if (notificationCat && notificationCat._id) {
      notificationCat.updated_at = new Date();
      notificationCat.updated_by = req.user.id;
      const update = await notificationCatSch.findByIdAndUpdate(notificationCat._id, { $set: notificationCat });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, notificationConfig.catSave, null);
    } else {
      notificationCat.added_by = req.user.id;
      const newNotificationCat = new notificationCatSch(notificationCat);
      const saveNotificationCat = await newNotificationCat.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saveNotificationCat, null, notificationConfig.catSave, null);
    }
  } catch (err) {
    next(err);
  }
};
notificationController.GetNotification = async (req, res, next) => {
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
notificationController.GetNotificationById = async (req, res, next) => {
  const id = req.params.id;
  const notification = await notificationSch.findOne({ _id: id, is_deleted: false }, { __v: 0, deleted_at: 0 });
  return otherHelper.sendResponse(res, httpStatus.OK, true, notification, null, notificationConfig.notificationGet, null);
};
notificationController.GetNotificationCat = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.page && req.query.page == 0) {
      selectQuery = 'title is_active';
      const notificationCats = await notificationCatSch.find({ searchQuery }).select(selectQuery);
      return otherHelper.sendResponse(res, httpStatus.OK, true, notificationCats, null, 'all notification category get success!!', null);
    }
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let notificationCat = await otherHelper.getQuerySendResponse(notificationCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, notificationCat.data, notificationConfig.catGet, page, size, notificationCat.totalData);
  } catch (err) {
    next(err);
  }
};
notificationController.GetNotificationCatDropDown = async (req, res, next) => {
  try {
    let selectQuery = 'title is_active';
    const notificationCats = await notificationCatSch.find({ is_deleted: false, is_active: true }).select(selectQuery);
    return otherHelper.sendResponse(res, httpStatus.OK, true, notificationCats, null, 'all notification category get success!!', null);
  } catch (err) {
    next(err);
  }
};
notificationController.GetNotificationCatById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notificationCats = await notificationCatSch.findOne({
      _id: id,
      is_deleted: false,
    });
    return otherHelper.sendResponse(res, httpStatus.OK, true, notificationCats, null, notificationConfig.catGet, null);
  } catch (err) {
    next(err);
  }
};

notificationController.GetNotificationByCat = async (req, res, next) => {
  try {
    let page;
    let size;
    let searchQuery;
    const size_default = 10;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    const id = req.params.id;
    searchQuery = {
      is_deleted: false,
      category: id,
    };
    const categoryNotification = await notificationSch.find(searchQuery);
    const totalData = await notificationSch.countDocuments(searchQuery);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, categoryNotification, notificationConfig.notificationGet, page, size, totalData);
  } catch (err) {
    next(err);
  }
};
notificationController.DeleteNotification = async (req, res, next) => {
  const id = req.params.id;
  const notification = await notificationSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, notification, null, notificationConfig.notificationDelete, null);
};

notificationController.DeleteNotificationCat = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delCat = await notificationCatSch.findByIdAndUpdate(id, {
      $set: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
    await notificationSch.updateMany({ category: id, is_deleted: false }, { $set: { is_deleted: true } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delCat, null, 'notification category deleted!!', null);
  } catch (err) {
    next(err);
  }
};

notificationController.GetNotificationAndCat = async (req, res, next) => {
  const cat = await notificationCatSch.find().select('title');
  const notification = await notificationSch.find({ is_deleted: false }).select('title question category');
  return otherHelper.sendResponse(res, httpStatus.OK, true, { cat, notification }, null, null, null);
};

notificationController.GetCatByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const cat = await notificationCatSch.findOne({
      key,
      is_deleted: false,
    });
    if (!cat) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Key not Found', null);

    const notification = await notificationSch.find({ is_deleted: false, category: cat }).select('title question category');

    return otherHelper.sendResponse(res, httpStatus.OK, true, { cat, notification }, null, notificationConfig.catGet, null);
  } catch (err) {
    next(err);
  }
};

notificationController.CountNotificationByCat = async (req, res, next) => {
  const id = req.params.id;
  const notificationCount = await notificationSch.countDocuments({ category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, notificationCount, null, 'notification count by category', null);
};

module.exports = notificationController;
