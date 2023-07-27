angular.module('Mycart', []);
angular.module('my-App', []);
angular.module('signin', []);
angular.module('signup', []);
angular.module('buy', []);
angular.module('order', []);
angular.module('view', []);
angular.module('myApp', ['ngRoute', 'Mycart', 'my-App', 'signin', 'signup', 'buy', 'order', 'view'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'Module/view/signin.html',
        controller: 'sigin'
      })
      .when('/signup', {
        templateUrl: 'Module/view/signup.html',
        controller: 'signup'
      })
      .when('/cart', {
        templateUrl: 'Module/view/cart.html',
        controller: 'cartController'
      })
      .when('/index', {
        templateUrl: 'Module/view/indexitems.html',
        controller: 'indexcontroller'
      })
      .when('/buy', {
        templateUrl: 'Module/view/buy.html',
        controller: 'buy'
      })
      .when('/order', {
        templateUrl: 'Module/view/orderhistory.html',
        controller: 'order'
      })
      .when('/view', {
        templateUrl: 'Module/view/vieworder.html',
        controller: 'view'
      })
      .otherwise({
        redirectTo: '/signin'
      })
  })
