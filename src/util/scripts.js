
// keyboard handler
document.onkeydown = function (e) {
	// disable f5
  	if(e.keyCode === 116) return false;
  	if($("#storage a").data("enable_key") !== true) return;
  	$("#storage a").data("enable_key",false);
  	
  	if(e.keyCode === 27 ) onEscape();
  	else if(e.keyCode === 37 ) onLeft(function() {
		$("#storage a").data("enable_key",true);
	});
  	else if(e.keyCode === 39 ) onRight(function() {
		$("#storage a").data("enable_key",true);
	});
	else if(e.keyCode === 188 ) onRotate(270,function() {
		$("#storage a").data("enable_key",true);
	});
  	else if(e.keyCode === 190 ) onRotate(90,function() {
		$("#storage a").data("enable_key",true);
	});
	else $("#storage a").data("enable_key",true);
};


// auto-resize
function width_resize() {
	var x = $( window ).width() - 350;
	if(x < 200) x=200;
	else x = parseInt(x, 10);
	$('#right').css({
       width: x+'px'
    });
}

function height_resize() {
	var x = $( window ).height();
	$('#tree').css({ height: x-200+'px' });
	$('#exif').css({ height: x-150+'px' });
}


$(document).ready(function () {
    width_resize();
    height_resize();
});

$(window).resize(function () {
    width_resize();
    height_resize();
});


function over_tree() {
	$('#tree').css({
        width: '300px'
    });
	var x = $('#tree')[0].scrollWidth+10;
	$('#tree').css({
        width: x+'px'
    });
}


// file tree
$(document).ready( function() {
    $('#tree').fileTree({ root: '/home/' }, function(file) {
		
    });
});
