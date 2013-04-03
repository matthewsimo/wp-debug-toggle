(function() {

  //Declaring variables  
  var wdt, fileList;

  // Files to look for and parse for WP_DEBUG constant
  var fileList = [
    'wp-config.php',
    'local-config.php',
    'wp-local-config.php'
  ];
  
  //Requiring files
  wdt = require('./wp-debug-toggle');

  // Check current directory for any files matching an item in our fileList
  wdt.hunt(fileList, 5);

}).call(this)
