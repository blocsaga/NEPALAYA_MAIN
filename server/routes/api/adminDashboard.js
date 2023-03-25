const express = require('express');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const router = express.Router();
const adminDashboardController = require('./../../modules/adminDashboard/adminDashboardController');

router.get('/error', authentication, authorization, adminDashboardController.GetErrorsGroupBy);
router.get('/user/days/:day', authentication, authorization, adminDashboardController.getLastXDayUserRegistration);
router.get('/user/registration', authentication, authorization, adminDashboardController.getNoOfCustomerByRegistration);
router.get('/user/recent', authentication, authorization, adminDashboardController.getLatestFiveUsers);
router.get('/user/roles', authentication, authorization, adminDashboardController.GetAllUserGroupBy);
router.get('/user/sections', authentication, authorization, adminDashboardController.getSectionsByUser);
router.get('/user/notifications', authentication, authorization, adminDashboardController.getNotifications);

module.exports = router;
