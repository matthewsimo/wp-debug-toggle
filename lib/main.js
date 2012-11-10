(function() {

  //Declaring variables  
  var fs, reptxt, filedata;

  // Files to look for and parse for WP_DEBUG constant
  var fileList = [
    'wp-config.php',
    'local-config.php',
    'wp-local-config.php'
  ];
  
  //Requiring files
  fs = require('fs');
  wdt = require ('./wp-debug-toggle');

  // Check current directory for any files matching an item in our fileList
  fileList.forEach(wdt.hunt);

}).call(this)
