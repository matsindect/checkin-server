const express = require('express');
const authController = require('./../controllers/authController');
const projectsController = require('./../controllers/projectsController');
const contactsRouter = require('../routes/contactsRouter');

const router = express.Router();

// POST/api/v1/projects/:projectId/contacts
// GET/api/v1/projects/:projectId/contacts
router.use('/:projectId/contacts', contactsRouter);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    projectsController.uploadProjectImages,
    projectsController.processImages,
    projectsController.createProject
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    projectsController.getProjects
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    projectsController.getProject
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    projectsController.uploadProjectImages,
    projectsController.processImages,
    projectsController.updateProjects
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    projectsController.deleteProjects
  );
module.exports = router;
