const multer = require("multer");
module.exports = function() {
  multer({
    dest: "./uploads/",
    rename: function(fieldname, filename) {
      return filename;
    }
  });
};
