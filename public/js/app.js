angular.module('app', ['ngRoute'])
        .factory('sessionFactory', sessionFactory)
        .service('userService', userService)
        .service('todoService', todoService)
        .controller('mainController', mainController)
        .controller('loginController', loginController)
        .config(routes)
        .run(loginStatus)
        ;
