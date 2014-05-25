$(document).ready(function () {
    $('#cam').click(function() {
		
		runCommand('gphoto2' ,["--auto-detect"], function(message, error) {
			var res = message.toString().split('\n');
			if(res.length == 3) {
				camera_off();
				return;
			}
			$("#status").text(res[2]);
			camera_on();
		});
	});
});

function camera_on() {
	$('#list').css({  display: 'inline-block' });
	$('#thumbs').css({  display: 'none' });
	$('#big').css({  display: 'none' });
    
	runCommand('gphoto2', [ "-L" ], function(data, error) {
		var res = data.toString().split('\n#');
		runCommand('gphoto2', [ "--show-info=1-"+(res.length-1) ], function( data, error ) {
			var res2 = data.toString().split('Time:');
			for(var i=1;i<res.length;i++) {
				var x = res[i].replace(/ +/g, " ");
				var date = res2[i].substr(0,res2[i].indexOf('\n'));
				x = x.split(' ');
				$('#myTable > tbody:last').append('<tr>\n<td>' + x[0] + '</td>\n<td>' + x[1] + '</td>\n<td>' + date + '</td>\n<td>' + x[3] + ' KB</td>\n</tr>\n');
			}
			//list_handler();
		});
	});
}

function camera_off() {
	$("#status").text('status: no camera detected');
	$('#list').css({  display: 'none' });
	$('#thumbs').css({  display: 'auto' });
}
