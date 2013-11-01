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

function showBig() {
	var src = $("#curr_img").find('img').attr('src');
	if(typeof src !== 'undefined') src = getPath(src);
	$("#big").css({ "background-image": 'url("' + src + '")' });
	showExif(src);
}


// functions called in /util/util.js


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
		$("#big").css({ "background-image": 'url("' + src + '")' });
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
		$("#big").css({ "background-image": 'url("' + src + '")' });
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
		$("#big").css({ "background-image": 'url("' + src + '?' + new Date().getTime() + '")' });
		reloadCurrThumb(src,cb);
	});
}

