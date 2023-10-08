<?php
require('./helper.account.php');



//validate api request
validateToken(false);

// check key data exists in json
// type = google, password

$data = validatePost(["email", "type"], ["password", "image"], $db);



[
	'email' => $email,
	'type' => $type
] = $data;

//for google login just check email
if ($type === "google") {
	$account = $db->select("id,access,dp,status,id,email,name", "account", "email='" . $email . "' AND google='1'", 1);
	if (!$account) {
		throwError("This email is not authorised to login",403);
	} else {
		//if image is empty then set
		if (empty($account->dp) && isset($data["image"])) {
			$db->update("account", ["dp" => $data["image"]], ["id" => $account->id]);
		}

		processLogin($db, $account);
	}
} else {
	//assume login by password
	if (!isset($data["password"]) || $data["password"] === "") {
		throwError("password is required");
	}


	$account = $db->select("password,id,access,email,name,dp,status", "account", "email='" . $email . "'", 1);

	if (!$account) {
		throwError("This email is not authorised to login");
	} else if ($account->password !== passwordHash($data["password"])) {
		throwError("Invalid credentials");
	} else {
		// process login
		processLogin($db, $account);
	}
}


