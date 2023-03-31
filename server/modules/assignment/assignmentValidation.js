const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const assignmentConfig = require('./assignmentConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const assignmentSch = require('./assignmentSchema');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'key',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validation = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: assignmentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: assignmentConfig.validation.nameLength,
        },
      ],
    },
    {
      field: 'key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: assignmentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: assignmentConfig.validation.keyLength,
        },
        {
          condition: 'IsProperKey',
          msg: 'not Valid Input',
        },
      ],
    },
    {
      field: 'image',
      validate: [
        {
          condition: 'IsMongoId',
          msg: assignmentConfig.validation.IsMongoId,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: assignmentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: assignmentConfig.validation.descriptionLength,
        },
      ],
    },
  ];
  let errors = validateHelper.validation(data, validateArray);

  let key_filter = { is_deleted: false, key: data.key };
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } };
  }
  const already_key = await assignmentSch.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, key: 'key already exist' };
  }

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, assignmentConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
module.exports = validations;
