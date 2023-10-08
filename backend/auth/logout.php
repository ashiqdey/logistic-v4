<?php
require('./helper.account.php');

//validate api request
validateToken(false);


try {
	if (!isset($_COOKIE[COOKIE])) {
		response(["message" => "Logged out."]);
	}

	//delete hash from table
	$hash = md5($_COOKIE[COOKIE]);
	$db->delete("login_sesions", "hash='" . $hash . "'");


	//unset cookie
	customCookie("", false);
}
catch(Exception $e) {
	// throwError($e->getMessage());
}


response(["message" => "Logged out"]);
