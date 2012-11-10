fs = require('fs');

var notFound = [];

wpDebugToggle = function(text, file){

  // array to hold result, [0] - message [1] - file text
  var result = [];
  // regex to fine "define('WP_DEBUG', false)" ignoring whitespace
  var re = new RegExp(/define\((\s)*?'WP_DEBUG'(\s)*?,(\s)*?(true|false)(\s)*?\)/gi);
  if(re.test(text)) {
    result[1] = text.replace(re, function(full, g1, g2, g3, g4, g5){
      if(g4.toLowerCase() == "false"){
        result[0] = "WP_DEBUG Constant toggled to TRUE in " + file;
        return "define('WP_DEBUG', true)";
      } else {
        result[0] = "WP_DEBUG Constant toggled to FALSE in " + file;
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
processFile = function(file){
  // Open file
  fs.readFile(file,'utf8',function(err,data){
    if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
   }

   // Call wpDebugToggle function on the file data
   toggleResult = wpDebugToggle(data, file);
   
   //Writing replaced text into a new file
  if(toggleResult[0] !== 0)
    fs.writeFile(file, toggleResult[1], function(err){
          if(err) {
          console.error("Error saving file", err);
          process.exit(1);
          }
        console.log(toggleResult[0]);
      });
   
  });
}


exports.hunt = function(filename, index, array){

  fs.exists("" + filename, function(exists){
    exists? processFile(filename) : notFound.push(filename);
  });

  if(array === notFound)
    console.log("No config file found, sorry!");

}
