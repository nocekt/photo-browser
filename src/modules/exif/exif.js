function showExif(src, cb) {
	$('#path').css({ display: 'none' });
	$('#tree').css({  display: 'none' });
	$('#exif').css({  display: 'inline' });
	
	var ExifImage = require('exif').ExifImage;
	new ExifImage({ image : src }, function (error, exifData) {
        if(error) {
			if(cb !== undefined) cb();
			return;
		}
        var contents = [];
        contents.push(exifData.image.Model);
        var date = exifData.exif.CreateDate.split(' ');
        contents.push(date[0].replace(/:/g,'.') + ' ,\xa0\xa0\xa0' + date[1].substr(0,date[1].lastIndexOf(':')));
        contents.push(src.substr(src.lastIndexOf('/')+1,src.length));
        contents.push(exifData.exif.ExifImageWidth + ' x ' + exifData.exif.ExifImageHeight);
        contents.push(exifData.exif.FocalLength + 'mm');
        contents.push( parseFloat(exifData.exif.ExposureTime).toFixed(3) + ' s');
        contents.push('f/' + exifData.exif.FNumber);
        contents.push(exifData.exif.ISO);
        contents.push(exifData.exif.ExposureCompensation + ' EV');
        
		var table = document.getElementById('exif_table');
		var rowLength = table.rows.length;
		for(var i=0; i<rowLength; i+=1) {
			var row = table.rows[i];
			row.cells[1].innerHTML = contents[i];
		}
		if(cb !== undefined) cb();
    });
}

function hideExif() {
	$('#exif').css({ display: 'none' });
	$('#path').css({ display: 'inline' });
	$('#tree').css({ display: 'inline' });
	
	var table = document.getElementById('exif_table');
	var rowLength = table.rows.length;
	for(var i=0; i<rowLength; i+=1) {
		var row = table.rows[i];
		row.cells[1].innerHTML = '';
	}
}
