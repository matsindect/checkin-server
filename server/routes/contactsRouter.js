const express = require('express');
const authController = require('./../controllers/authController');
const contactsController = require('./../controllers/contactsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    contactsController.setIds,
    contactsController.createContacts
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    contactsController.getContacts
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    contactsController.getContact
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    contactsController.updateContact
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    contactsController.deleteContact
  );
module.exports = router;
