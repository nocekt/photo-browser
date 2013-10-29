$(document).ready(function () {
	$("#thumbs ul").click(function(event) {
		$(event.target).parent().attr('id', 'curr_img');
		showBig();
	});
});

function getPath(src) {
	var i = src.lastIndexOf('.');
	if(i === -1) return src;
	var base = src.substr(0,i);
	var ext = src.substr(i+1,src.length);
	if(ext === 'temp') return base;
	else return src;
}

function showBig() {
	var src = $("#curr_img").find('img').attr('src');
	if(src !== 'undefined') src = getPath(src);
	
	$("#storage").append('<a data-enable_key="true" data-scroll="' + $(document).scrollTop() + '"></a>');
	$('#thumbs').css({  display: 'none' });
	$("#big").css({ "background-image": 'url("' + src + '")' });
}

function onEscape() {
	var scroll = $("#storage a").data("scroll");
	$("#curr_img").removeAttr('id');
	$("#storage a").remove();
	$("#big").css({ "background-image": 'url("")' });
	$('#thumbs').css({  display: 'inline' });
	$('body').scrollTo(scroll,{duration:0});
}

function normal_load(src) {
	$("#big").css({ "background-image": 'url("' + src + '")' });
}

function onLeft() {
	var curr = $("#curr_img");
	curr.prev().attr('id', 'curr_img');
	curr.removeAttr('id');
	
	var src = $("#curr_img").find('img').attr('src');
	if(typeof src !== 'undefined') {
		src = getPath(src);
		normal_load(src);
	}
	else curr.attr('id', 'curr_img');
}

function onRight() {
	var curr = $("#curr_img");
	curr.next().attr('id', 'curr_img');
	curr.removeAttr('id');
	
	var src = $("#curr_img").find('img').attr('src');
	if(typeof src !== 'undefined') {
		src = getPath(src);
		normal_load(src);
	}
	else curr.attr('id', 'curr_img');
}
