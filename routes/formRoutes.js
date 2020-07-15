// const formService = require('../controllers/formService');
const authController = require('../controllers/authController');
const formController = require('../controllers/formsController');
let routes = {
  get: {
    listings: {
      params: [],
      controller: formController.getListings
    },
    listingtype: {
      params: [':id'],
      controller: formController.getSingleListing
    }
  },
  post: {
    listingtype: {
      params: [],
      controller: formController.createListing
    }
  },
  patch: {
    listingtype: {
      params: [':id'],
      controller: formController.getSingleListing
    }
  },
  delete: {
    listingtype: {
      params: [':id'],
      controller: formController.getSingleListing
    }
  }
};

/*
 *  Export a router with paths
 *  GET:  /dynamic1
 *  GET:  /dynamic2/:param1
 *  POST: /dynamic3/:param1/:param1
 **/

var formRouter = function(customRoutes) {
  let express = require('express');

  let router = express.Router();
  let methods = Object.keys(customRoutes); // getting methods ('get', 'post'... etc)

  for (i in methods) {
    let routesMethod = Object.keys(customRoutes[methods[i]]);
    for (j in routesMethod) {
      let url = '/:' + routesMethod[j];
      url += '/' + customRoutes[methods[i]][routesMethod[j]].params.join('/:');
      console.log(url);
      router[methods[i]](
        url,
        authController.protect,
        formController.uploadPostImages,
        formController.processImages,
        customRoutes[methods[i]][routesMethod[j]].controller
      );
    }
  }

  return router;
};
module.exports = formRouter(routes);
