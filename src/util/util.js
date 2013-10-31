function runCommand(cmd, args, callback) {
	var spawn = require('child_process').spawn;
	var command = spawn(cmd,args);
	var result = '';
	var error = '';
	command.stdout.on('data', function(data) {
		result += data.toString();
	});
	command.stderr.on('data', function(data) {
		error += data.toString();
	});
	command.on('close', function(code) {
		return callback(result, error);
	});
}
