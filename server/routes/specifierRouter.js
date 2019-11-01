const express = require('express');
const authController = require('/server/controllers/authController');
const specifierController = require('/server/controllers/specifiersController');
const contactsRouter = require('/server/routes/contactsRouter');

const router = express.Router();

// POST/api/v1/specifiers/:specifierId/contacts
// GET/api/v1/specifiers/:specifierId/contacts
router.use('/:specifierId/contacts', contactsRouter);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    specifierController.createSpecifier
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    specifierController.getSpecifiers
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    specifierController.getSpecifier
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    specifierController.updateSpecifier
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    specifierController.deleteSpecifier
  );
module.exports = router;
