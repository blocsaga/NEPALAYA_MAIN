const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const notificationConfig = require('./notificationConfig');
const notificationValidation = {};
notificationValidation.Sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'question',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

notificationValidation.Validation = (req, res, next) => {
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: notificationConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: notificationConfig.validate.isLength,
        },
      ],
    },
    {
      field: 'question',
      validate: [
        {
          condition: 'IsEmpty',
          msg: notificationConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: notificationConfig.validate.isLength,
        },
      ],
    },
    {
      field: 'category',
      validate: [
        {
          condition: 'IsMongoId',
          msg: notificationConfig.validate.isMongoId,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(req.body, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, notificationConfig.errorIn.inputError, null);
  } else {
    next();
  }
};
module.exports = notificationValidation;
