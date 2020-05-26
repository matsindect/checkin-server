const express = require('express');
const authController = require('./../controllers/authController');
const taxonomyController = require('./../controllers/taxonomyController');

const router = express.Router();

///////////////////////////// SPECIFIER TYPES ///////////////////////////////////

router.get(
  '/specifier-types',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.getSpecifierTypes
);
router.post(
  '/specifier-types',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.uploadIcon,
  taxonomyController.resizeIcon,
  taxonomyController.createSpecifierTypes
);

router.get(
  '/specifier-types/:id',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.getSpecifierType
);
router.patch(
  '/specifier-types/:id',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.uploadIcon,
  taxonomyController.resizeIcon,
  taxonomyController.updateSpecifierType
);
router.delete(
  '/specifier-types/:id',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.deleteSpecifierType
);

///////////////////////////// SUPPLIER TYPES ///////////////////////////////////

router.get(
  '/supplier-types',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.getSupplierTypes
);
router.post(
  '/supplier-types',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.uploadIcon,
  taxonomyController.resizeIcon,
  taxonomyController.createSupplierTypes
);

router.get(
  '/supplier-types/:id',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.getSupplierType
);
router.patch(
  '/supplier-types/:id',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.uploadIcon,
  taxonomyController.resizeIcon,
  taxonomyController.updateSupplierType
);
router.delete(
  '/supplier-types/:id',
  authController.protect,
  authController.restrictTo('admin'),
  taxonomyController.deleteSupplierType
);
///////////////////////// PROJECT TYPES ///////////////////////////////

router
  .route('/project-types')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getProjectTypes
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.createProjectTypes
  );

router
  .route('/project-types/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getProjectType
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.updateProjectType
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteProjectType
  );
///////////////////////////////// SPECIFIER CONTACTS //////////////////////////

router
  .route('/specifier-contacts')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getSpecifierContacts
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createSpecifierContacts
  );

router
  .route('/specifier-contacts/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getSpecifierContact
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateSpecifierContact
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteSpecifierContact
  );
///////////////////////////////// PROJECT CONTACTS ////////////////////////////////////

router
  .route('/project-contacts')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getProjectContacts
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createProjectContacts
  );

router
  .route('/project-contacts/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getProjectContact
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateProjectContact
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteProjectContact
  );
///////////////////////////////// CATEGORIES ////////////////////////////////

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
///////////////////////////// SECTORS //////////////////////////////////////////

router
  .route('/sectors')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getSectors
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.createSector
  );

router
  .route('/sectors/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getSector
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.updateSector
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteSector
  );
///////////////////////////////// PRODUCTS ////////////////////////////////////

router
  .route('/products')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getProducts
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.createProducts
  );

router
  .route('/products/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getProduct
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteProduct
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
//////////////// KEY PROJECTS /////////////////////////////////

router
  .route('/key-projects')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getKeyProjects
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.createKeyProjects
  );

router
  .route('/key-projects/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getKeyProject
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.uploadIcon,
    taxonomyController.resizeIcon,
    taxonomyController.updateKeyProject
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteKeyProject
  );
/////////////////////// KEY CLIENTS //////////////////////////////////

router
  .route('/key-clients')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getKeyClients
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createKeyClients
  );

router
  .route('/key-clients/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getKeyClient
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateKeyClient
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteKeyClient
  );
////////////////////////////// STACKHOLDERS /////////////////////////////////

router
  .route('/stackholders')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getStackholders
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.createStackholder
  );

router
  .route('/stackholders/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.getStackholder
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.updateStackholder
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    taxonomyController.deleteStackholder
  );

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
module.exports = router;
