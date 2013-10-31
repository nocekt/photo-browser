var util = require('util');
var fs = require('fs');

var stringHeader = "<ul class='jqueryFileTree' style='display: none;'>";
var stringFooter = "</ul>";
var formatDirectory = "<li class='directory collapsed'><a rel='%s/'>%s</a></li>";
var formatFile = "<li class='file ext_%s'><a rel='%s'>%s</a></li>";
var ext = { 'jpg':1 , 'jpeg':1 , 'JPG':1, 'JPEG':1, 'png':1, 'img':1 };


function nodeCreateTree(dir, callback) {
	fs.readdir(dir, function(err, files) {
		var data = stringHeader;
		var fstring = '', dstring = '';
		
		if(files && files.length) {
			for(var i = 0; i < files.length; i++) {
		    	var fileName = files[i];
			    var path = util.format('%s%s', dir, fileName);
		 		var stats = fs.statSync(path);
		 		
		 		if(path.indexOf('/.') === -1) {
					if(stats.isDirectory())	dstring += util.format(formatDirectory, path, fileName);
					else {
						var fileExt = fileName.slice(fileName.lastIndexOf('.')+1);
						if(ext[fileExt] === 1) fstring += util.format(formatFile, fileExt, path, fileName);
					}
				}
		    }
		}
		data += dstring + fstring + stringFooter;
		callback(data);
 	});
};
