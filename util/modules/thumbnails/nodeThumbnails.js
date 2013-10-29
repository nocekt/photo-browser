var fs = require('fs');
var ext = { 'jpg':1 , 'jpeg':1 , 'JPG':1, 'JPEG':1 };
var images = [];

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
	
	runCommand('convert' ,['-thumbnail', 'x120', path + image, path + image+'.temp'], function(result, error) {
		/*var data = fs.readFile(image+'.temp',function (err, data) {
			data = new Buffer(data).toString('base64');
			if(images.length > 0) $("#thumbs ul").append('<li><img src="data:image/png;base64,' + data + '" ></li>');
			runCommand('rm' ,[image + '.temp'], function(result, error) {});
			images.shift();
			if(images.length > 0) callback(images,makeThumb);
		});*/
		if(images.length > 0) $("#thumbs ul").append('<li><img title="' + image + '" src="' + path + image + '.temp' + '" ></li>');
		runCommand('rm' ,[path + image + '.temp'], function(result, error) {});
		images.shift();
		if(images.length > 0) callback(path,images,makeThumb);
	});
}



var thumbs = { 'a': { date: 'x', content: 'foo' } };

function getPhoto(path, callback) {
	var stats = fs.lstatSync(path);
	if(thumbs[path] === undefined || thumbs[path].date.toString() !== stats.mtime.toString()) addThumb(path, stats.mtime, cb);
	else callback(thumbs[path].content);
}

function addThumb(path, fileTime, callback) {
	runCommand('convert' ,['-thumbnail', 'x120', path,path+'.temp'], function(result, error) {
		var data = fs.readFileSync(path+'.temp'); 
		thumbs[path] = { date: fileTime, content: data};
		runCommand('rm' ,[path+'.th'], function(result, error) {
			callback(thumbs[path].content);
		});
	});
}
