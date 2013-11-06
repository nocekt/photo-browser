$(document).ready(function () {
	$("#thumbs ul").click(function(event) {
		$(event.target).parent().attr('id', 'curr_img');
		$("#storage").append('<a data-enable_key="true" data-scroll="' + $(document).scrollTop() + '"></a>');
		$('#thumbs').css({  display: 'none' });
		showBig();
	});
});

function getPath(src) {
	var i = src.lastIndexOf('?');
	if(i !== -1) src = src.substr(0,i);
	i = src.lastIndexOf('.');
	if(i === -1) return src;
	var base = src.substr(0,i);
	var ext = src.substr(i+1,src.length);
	if(ext === 'temp') return base;
	else return src;
}

function smoothLoad(src) {
	$('<img/>').attr('src', src).load(function() {
		$(this).remove(); 
		$("#big").css({ "background-image": 'url("' + src + '")' });
	});
}

function showBig() {
	var src = $("#curr_img").find('img').attr('src');
	if(typeof src !== 'undefined') src = getPath(src);
	smoothLoad(src);
	showExif(src);
}


// functions called in /util/scripts.js


function onEscape() {
	hideExif();
	var scroll = $("#storage a").data("scroll");
	$("#curr_img").removeAttr('id');
	$("#storage a").remove();
	$("#big").css({ "background-image": 'url("")' });
	$('#thumbs').css({  display: 'inline' });
	$('body').scrollTo(scroll,{duration:0});
}

function onLeft(cb) {
	var curr = $("#curr_img");
	curr.prev().attr('id', 'curr_img');
	curr.removeAttr('id');
	
	var src = $("#curr_img").find('img').attr('src');
	if(typeof src !== 'undefined') {
		src = getPath(src);
		smoothLoad(src);
		showExif(src,cb);
	}
	else {
		curr.attr('id', 'curr_img');
		cb();
	}
}

function onRight(cb) {
	var curr = $("#curr_img");
	curr.next().attr('id', 'curr_img');
	curr.removeAttr('id');
	
	var src = $("#curr_img").find('img').attr('src');
	if(typeof src !== 'undefined') {
		src = getPath(src);
		smoothLoad(src);
		showExif(src, cb);
	}
	else {
		curr.attr('id', 'curr_img');
		cb();
	}
}

function onRotate(arg,cb) {
	var src = $("#big").css('background-image');
	src = src.replace('url(','').replace('file://','').replace(')','');
	src = getPath(src.toString());
	runCommand('convert' ,['-rotate', arg, src, src], function(result, error) {
		smoothLoad(src + '?' + new Date().getTime());
		reloadCurrThumb(src,cb);
	});
}

function deletePhoto(curr, cb) {
	var src = curr.find('img').attr('src');
	src = getPath(src);
	runCommand('rm' ,[src], function(result, error) {
		$('a[rel="' + src + '"]').parent().remove();
		curr.remove();
		cb();
	});
}

function onDelete(cb) {
	if(confirm("Are you sure ?")) {
		var curr = $("#curr_img");
		if(curr.next().find('img').attr('src') !== undefined) onRight(deletePhoto(curr,cb));
		else if(curr.prev().find('img').attr('src') !== undefined) onLeft(deletePhoto(curr,cb));
		else onEscape(deletePhoto(curr,cb));
	}
	else cb();
}

