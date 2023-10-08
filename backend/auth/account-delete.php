<?php
require('./helper.account.php');

//validate api request
//check access
$token = validateToken(true, "Super admin");


$data = validateGet(["id"], [], $db);

$id = $data["id"];


// update account
if (!$db->delete("account", "id='" . $id . "'")) {
	throwError("Failed to delete account");
}

response([
	"message" => "Account deleted",
	"id" => $id
]);
