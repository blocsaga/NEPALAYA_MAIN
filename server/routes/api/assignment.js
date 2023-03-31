const express = require('express');
const router = express.Router();

const assignmentValidation = require('../../modules/assignment/assignmentValidation');
const dModule = require('../../modules/assignment/assignmentController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, dModule.GetAssignment);
router.post('/', authentication, authorization, assignmentValidation.sanitize, assignmentValidation.validation, dModule.SaveAssignment);
router.get('/:id', authentication, authorization, dModule.GetAssignmentDetail);
// router.get('/assignmentsbyuser', authentication, authorization, dModule.GetAssignmentByUser);
router.get('/key/:key', dModule.GetAssignmentByKey);
router.delete('/:id', authentication, authorization, dModule.DeleteAssignment);
router.post('/multiple', authentication, authorization, dModule.selectMultipleData);

module.exports = router;
