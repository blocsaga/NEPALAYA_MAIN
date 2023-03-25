const express = require('express');
const router = express.Router();

const notificationValidations = require('../../modules/notification/notificationValidation');
const notificationCatValidations = require('../../modules/notification/notificationCatValidation');
const notificationModule = require('../../modules/notification/notificationController');
const { authorization, authentication } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, notificationModule.GetNotification);
router.get('/all', notificationModule.GetNotificationAndCat);
router.get('/cat', notificationModule.GetNotificationCat);
router.get('/category/all', notificationModule.GetNotificationCatDropDown);
router.get('/:id', notificationModule.GetNotificationById);
router.get('/cat/:id', authentication, notificationModule.GetNotificationCatById);
router.get('/bycat/:id', notificationModule.GetNotificationByCat);
router.get('/key/:key', notificationModule.GetCatByKey);
router.post('/', authentication, authorization, notificationValidations.Sanitize, notificationValidations.Validation, notificationModule.PostNotification);
router.post('/cat', authentication, authorization, notificationCatValidations.Sanitize, notificationCatValidations.Validation, notificationModule.PostNotificationCat);
router.delete('/cat/:id', authentication, authorization, notificationModule.DeleteNotificationCat);
router.delete('/:id', authentication, authorization, notificationModule.DeleteNotification);

router.get('/count/category/:id', authentication, authorization, notificationModule.CountNotificationByCat);

module.exports = router;
