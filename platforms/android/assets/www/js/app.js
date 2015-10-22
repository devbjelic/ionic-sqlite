// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var db = null;

var app = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });



    if(window.cordova) {
      // App syntax
    db = $cordovaSQLite.openDB("populated.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    }

$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)")

  console.log("called Insert");
  
  var query = "INSERT INTO people (firstname, lastname) VALUES ('Haris','Bjelic')";
  //$cordovaSQLite.db(db, query, [firstname, lastname]).then(function(result){
$cordovaSQLite.execute(db, query).then(function(result){
    console.log(result.insertId);
      alert(result.insertId);

  }, function(error){
    alert(error);
  })



});

app.controller("StartCtrl", function($scope, $cordovaSQLite ){

$scope.insert = function(firstname, lastname){

  console.log("called Insert");
  var query = "INSERT INTO people (firstname, lastname) VALUES(?,?)"
  // var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
  //$cordovaSQLite.db(db, query, [firstname, lastname]).then(function(result){
$cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(result){
    console.log(result.insertId);
      alert(result.insertId);

  }, function(error){
    alert(error);
  })
}

});


