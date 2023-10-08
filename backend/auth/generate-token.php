<?php
require('./helper.account.php');


//validate api request
validateToken(false);


if (!isset($_COOKIE[COOKIE])) {
	throwError("Cookie is not set",401);
}




$hash = md5($_COOKIE[COOKIE]);
// throwError([$_COOKIE[COOKIE], $hash]);

// echo $hash;
// exit();

$loginSession = $db->select("user", "login_sesions", "hash='" . $hash . "'", 1);
if (!$loginSession) {
	throwError("Cookie is invalid");
}

$account = $db->select("id,access,email,name,dp,status", "account", "id='" . $loginSession->user . "'", 1);
if (!$account) {
	throwError("Invalid hash");
} else if (!$account->status) {
	throwError("Account is not active");
}


$account->token = getToken($account->id, $account->access);

$account = format_account($account);


response($account);
