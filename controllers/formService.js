exports.formRouter = (function(customRoutes) {
  let express = require('express');
  const authController = require('./authController');
  const formController = require('./formsController');
  let router = express.Router();
  let methods = Object.keys(customRoutes); // getting methods ('get', 'post'... etc)

  for (i in methods) {
    let routesMethod = Object.keys(customRoutes[methods[i]]);
    for (j in routesMethod) {
      let url = '/' + routesMethod[j];
      url += '/:' + customRoutes[methods[i]][routesMethod[j]].params.join('/:');
      console.log(url);
      router[methods[i]](
        url,
        authController.protect,
        formController.uploadPostImages,
        formController.pprocessImages,
        customRoutes[methods[i]][routesMethod[j]].controller
      );
    }
  }

  return router;
})();
