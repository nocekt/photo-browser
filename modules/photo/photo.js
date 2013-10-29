$(document).ready(function () {
	$("#thumbs ul").click(function(event) {
		$(event.target).parent().attr('id', 'curr_img');
		showBig();
	});
});

function showBig() {
	var src = $("#curr_img").find('img').attr('src');
	if(src !== 'undefined') src = src.substr(0,src.length -5);
	
	$("#storage").append('<a data-scroll="' + $(document).scrollTop() + '"></a>');
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
		src = src.substr(0,src.length -5);
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
		src = src.substr(0,src.length -5);
		normal_load(src);
	}
	else curr.attr('id', 'curr_img');
}
