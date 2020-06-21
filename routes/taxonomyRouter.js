const express = require('express');
const authController = require('./../controllers/authController');
const taxonomyController = require('./../controllers/taxonomyController');

const router = express.Router();
router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createTerm
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getTerms
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getTerm
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateTerm
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteTerm
  );

///////////////////////////////// CATEGORIES ////////////////////////////////////
router
  .route('/categories')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getCategories
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.createCategories
  );

router
  .route('/categories/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getCategory
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteCategory
  );

///////////////////////////////// City ////////////////////////////////////

router
  .route('/city')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getCities
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createCity
  );

router
  .route('/city/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getCity
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateCity
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteCity
  );
///////////////////////////////// Country ////////////////////////////////////

router
  .route('/country')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getCountries
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createCountry
  );

router
  .route('/country/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getCountry
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateCountry
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteCountry
  );

module.exports = router;
