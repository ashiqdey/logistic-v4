<?php
/*
this is a helper page
to get token for localhost cookie

*/
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.account.php');
$db = new DB();

//set cookie
if (isset($_GET['set'])) {
	$account = $db->select("*", "account", "email='ashiqdey@gmail.com'", 1);

	customCookie(rand(1111,9999));

	echo "done";
	// echo processLogin($db, $account, true);
	// echo processLogin($db, $account, true);
}
//get token
else if (isset($_GET['user-id'])) {
	$user = $_GET['user-id'];

	$account = $db->select("id,access,email,name,dp", "account", "id='" . $user . "'", 1);
	if (!$account) {
		throwError("Invalid hash");
	}

	$account->token = getToken($account->id, $account->access);

	response($account);
}
//chekc if cookie is set
else {
	if (!isset($_COOKIE[COOKIE])) {
		throwError("Cookie is not set");
	}

	echo $_COOKIE[COOKIE];
}

