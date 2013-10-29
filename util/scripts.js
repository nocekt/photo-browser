
// keyboard handler
document.onkeydown = function (e) {
	// disable f5
  	if(e.keyCode === 116) return false;
  	if(! $("#storage a").data("enable_key")) return;
  	else if(e.keyCode === 27 ) onEscape();
  	else if(e.keyCode === 37 ) onLeft();
  	else if(e.keyCode === 39 ) onRight();
};


// auto-resize
function right_resize() {
	var x = $( window ).width() - 350;
	if(x < 200) x=200;
	else x = parseInt(x, 10);
	$('#right').css({
       width: x+'px'
    });
}

function tree_resize() {
	var x = $( window ).height() - 200;
	$('#tree').css({
        height: x+'px'
    });
}

$(document).ready(function () {
    right_resize();
    tree_resize();
});

$(window).resize(function () {
    right_resize();
    tree_resize();
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
        alert(file);
    });
});
