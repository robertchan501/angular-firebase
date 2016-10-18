(function () {
  "use strict";

  function FirebaseStorageDirective($firebaseStorage, firebase) {
    return {
      restrict: 'A',
      priority: 99, // run after the attributes are interpolated
      scope: {},
      link: function (scope, element, attrs) {
        // $observe is like $watch but it waits for interpolation 
        // Ex: <img firebase-src="{{ myUrl }}"/> 
        attrs.$observe('firebaseSrc', function (newVal) {
          if (newVal !== '' && newVal !== null && newVal !== undefined) {
            var storageRef = firebase.storage().ref().child(attrs.gsUrl);
            var storage = $firebaseStorage(storageRef);
            storage.$getDownloadURL().then(function getDownloadURL(url) {
              element[0].src = url;
            });
          }
        });
      }
    };
  }
  FirebaseStorageDirective.$inject = ['$firebaseStorage', 'firebase'];

  angular.module('firebase.storage')
    .directive('firebaseSrc', FirebaseStorageDirective);
})();