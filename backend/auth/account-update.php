<?php
require('./helper.account.php');

//validate api request
//check access
$token = validateToken(true, "Super admin");


$data = validatePost(["id",], ["email", "password", "name", "access", "google", "status"], $db);

$id = $data["id"];

$fields = [
	"ts" => (string)time()
];

if (isset($data["access"])) {
	if ($data["access"] < 1 && $data["access"] > 9) {
		throwError("Access is invalid");
	}

	$fields["access"] = $data["access"];
}
if (isset($data["name"])) {
	$fields["name"] = $data["name"];
}

if (isset($data["email"])) {
	//check if same email exists
	$exists = $db->select("id", "account", "email='" . $data["email"] . "' LIMIT 1", 1);
	if (!$exists) {
		if (strlen($data["email"]) < 6) {
			throwError("Email should be atleast 10 charracters");
		}

		$fields["email"] = $data["email"];
	} else if ($exists && $exists->id == $id) {
		//skip email
	} else {
		throwError("Email is linked to another account");
	}
}

if (isset($data["password"]) && $data["password"] != "") {
	if (strlen($data["password"]) < 6) {
		throwError("Password should be atleast 6 charracters");
	}
	$fields["password"] = passwordHash($data["password"]);
}

if (isset($data["google"])) {
	$fields["google"] = $data["google"] ? "1" : "0";
}
if (isset($data["status"])) {
	$fields["status"] = $data["status"] ? "1" : "0";
}


if (count($fields) == 1) {
	throwError("There's nothing to update");
}

// update account
if (!$db->update("account", $fields, ["id" => $id])) {
	throwError("Failed to update account");
	// throwError([$fields, $id]);
}
$account = $db->select("*", "account", "id='" . $id . "'", 1);
$account = format_account($account);

response([
	"message" => "Account updated",
	"data" => $account
]);
