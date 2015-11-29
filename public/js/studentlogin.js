/**
 * Created by lexy on 11/10/15.
 */


$('#studentLoginForm').on('submit', function(evt) {
	evt.preventDefault();

	var $userName = $('#userName');
	var nameEntered = $userName.val();
	console.log(nameEntered);
	var $password = $('#password');
	var passwordEntered = $password.val();
	console.log(passwordEntered);

	$.ajax({
		url: '/login?username=' + nameEntered + '&password=' + passwordEntered,
		success: function(data) {
			console.log('success-got the data', data);
			// TODO: look at `data` to see what the server actually sent back
		},
		error: function() {
			console.log('error');
		}
	});
})