var fs = require('fs');
var ext = { 'jpg':1 , 'jpeg':1 , 'JPG':1, 'JPEG':1, 'png':1, 'img':1 };
var images = [];
var thumbH = '120';

function getThumbs(path) {
	
	images.length = 0;  // abort previous load
	images = [];        // new array for new load
	$("#thumbs ul li").remove();
	
	var stats = fs.lstatSync(path);
	if(stats.isDirectory()) {
		var files = fs.readdirSync(path);
		for(var i = 0; i < files.length; i++) {
			stats = fs.lstatSync(path + files[i]);
			if(!stats.isDirectory()) {
				var fileExt = files[i].slice(files[i].lastIndexOf('.')+1);
				if(ext[fileExt] === 1) images.push(files[i]);
			}
		}
		if(images.length > 0) makeThumb(path,images,makeThumb);
	}
}

var makeThumb = function(path, images, callback) {
	var image = images[0];
	if(image === 'undefined') return;
	
	runCommand('identify' ,['-format', '%h',  path + image ], function(result, error) {
		// images smaller than given thumbnail size
		if(parseInt(result,10) < parseInt(thumbH,10)) {
			if(images.length > 0) $("#thumbs ul").append('<li><img title="' + image + '" src="' + path + image + '" ></li>');
			images.shift();
			if(images.length > 0) callback(path,images,makeThumb);
			return;
		}
		runCommand('convert' ,['-thumbnail', 'x' + thumbH, path + image, path + image+'.temp'], function(result, error) {
			if(images.length > 0) $("#thumbs ul").append('<li><img title="' + image + '" src="' + path + image + '.temp' + '" ></li>');
			runCommand('rm' ,[path + image + '.temp'], function(result, error) {});
			images.shift();
			if(images.length > 0) callback(path,images,makeThumb);
		});
	});
}
