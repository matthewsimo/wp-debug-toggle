fs = require('fs');

var notFound = [],
    files = [],
    currentDepth = 0,
    maxDepth;

wpDebugToggle = function(text, file, pathPrefix){

  // array to hold result, [0] - message [1] - file text
  var result = [];
  // regex to fine "define('WP_DEBUG', false)" ignoring whitespace
  var re = new RegExp(/define\((\s)*?'WP_DEBUG'(\s)*?,(\s)*?(true|false)(\s)*?\)/gi);
  if(re.test(text)) {
    result[1] = text.replace(re, function(full, g1, g2, g3, g4, g5){
      if(g4.toLowerCase() == "false"){
        result[0] = "WP_DEBUG Constant toggled to TRUE in " + pathPrefix + file;
        return "define('WP_DEBUG', true)";
      } else {
        result[0] = "WP_DEBUG Constant toggled to FALSE in " + pathPrefix + file;
        return "define('WP_DEBUG', false)";
      }
    });
  } else { // No match found, move along
    notFound.push(file); 
    result[0] = 0;
    result[1] = text; 
  }
  return result;
}


// Process file
processFile = function(file, pathPrefix){
  // Open file
  fs.readFile(pathPrefix + file,'utf8',function(err,data){
    if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
   }

   // Call wpDebugToggle function on the file data
   toggleResult = wpDebugToggle(data, file, pathPrefix);
   
   //Writing replaced text into a new file
  if(toggleResult[0] !== 0)
    fs.writeFile(pathPrefix + file, toggleResult[1], function(err){
      if(err) {
        console.error("Error saving file", err);
        process.exit(1);
      }
      console.log(toggleResult[0]);
    });
   
  });
}


checkDir = function(pathPrefix) {

  files.forEach(function(filename){

    fs.exists( pathPrefix + filename, function(exists){

      if( exists ){
        processFile(filename, pathPrefix);
      } else {
        notFound.push(filename);

        if( files.toString() == notFound.toString() ) { // We have checked this directory and haven't found any of our files
          notFound = []; // re init notFound array

          if(currentDepth < maxDepth) {
            currentDepth += 1;
            checkDir("../" + pathPrefix); // Check Parent for our files..
          } else {
            console.log("We looked, but couldn't file any wp config files at least 6 directories up.");
          }

        }
      }

    });

  });

}


// Expose the .hunt method - looks & executes based on file name passed in
exports.hunt = function(fileArray, maxParentDirectory){

  files = fileArray;
  maxDepth = maxParentDirectory; 
  checkDir("");

}
