<?php
require('./helper.account.php');


//validate api request
$token = validateToken(true);


$accounts = $db->select("id,access,name,email,dp,status,google", "account", "id>0");

foreach ($accounts as $a) {
	$a = format_account($a);
}



response([
	"access_map" => $access_map,
	"data" => $accounts
]);
