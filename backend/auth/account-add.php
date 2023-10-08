<?php
require('./helper.account.php');



function booleanValue($data,$key){
	return isset($data[$key]) && $data[$key] ? "1" : "0";
}

//validate api request
//check access
$token = validateToken(true, "Super admin");


$data = validatePost(["name", "email", "password"], ["access", "google", "status"], $db);

[
	'name' => $name,
	'email' => $email,
	'password' => $password
] = $data;





//check if same email exists
$exists = $db->select("id", "account", "email='{$email}' LIMIT 1", 1);
if ($exists) {
	throwError("Email is linked to another account");
}
if (strlen($data["email"]) < 6) {
	throwError("Email should be atleast 10 charracters");
}

//check password
if (strlen($password) < 6) {
	throwError("Password should be atleast 6 charracters");
}


// set fields
$fields = [
	"access" 	=> "1",
	"email" 	=> $email,
	"name" 		=> $name,
	"password" 	=> passwordHash($password),
	"google" 	=> booleanValue($data,'google'),
	"status" 	=> booleanValue($data,'status'),
	"ts" 		=> time().'000',
];



if (isset($data["access"])) {
	if ($data["access"] < 1 && $data["access"] > 9) {
		throwError("Access is invalid");
	}

	$fields["access"] = (string)$data["access"];
}



// update account
$id = $db->insert("account", $fields);
if (!$id) {
	throwError("Failed to add account");
}

$account = $db->select("*", "account", "id='{$id}'", 1);
$account = format_account($account);

response([
	"message" => "Account added",
	"data" => $account
]);
