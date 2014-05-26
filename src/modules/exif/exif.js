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
        
		if(exifData.image.Model !== undefined) contents.push(exifData.image.Model);
		else contents.push('');
		
        if(exifData.exif.CreateDate !== undefined) {
			var date = exifData.exif.CreateDate.split(' ');
			contents.push(date[0].replace(/:/g,'.') + ' ,\xa0\xa0\xa0' + date[1].substr(0,date[1].lastIndexOf(':')));
        }
        else contents.push('');
        
        contents.push(src.substr(src.lastIndexOf('/')+1,src.length));
        
        if(exifData.exif.ExifImageWidth !== undefined) contents.push(exifData.exif.ExifImageWidth + ' x ' + exifData.exif.ExifImageHeight);
        else contents.push('');
        
        if(exifData.exif.FocalLength !== undefined) contents.push(exifData.exif.FocalLength + 'mm');
        else contents.push('');
        
        if(exifData.exif.ExposureTime !== undefined) contents.push( parseFloat(exifData.exif.ExposureTime).toFixed(3) + ' s');
        else contents.push('');
        
        if(exifData.exif.FNumber !== undefined) contents.push('f/' + exifData.exif.FNumber);
        else contents.push('');
        
        if(exifData.exif.ISO !== undefined) contents.push(exifData.exif.ISO);
        else contents.push('');
        
        if(exifData.exif.ExposureCompensation !== undefined) contents.push(exifData.exif.ExposureCompensation + ' EV');
        else contents.push('');
        
        
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
