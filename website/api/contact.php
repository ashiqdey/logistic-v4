<?php
require('../php/controller.php');
require('../php/db.php');
$db = new DB();


$data = validatePost(["id", "name", "email", "phone", "message"], [], $db);

if (strlen($data["phone"] > 10)) {
	$data["phone"] = substr($data["phone"], 0, 10);
}
if (strlen($data["message"] > 400)) {
	$data["message"] = substr($data["message"], 0, 400);
}

$data["message"] = str_replace(["\\r\\n", "\\r", "\\n"], "<br/>", $data["message"]);

$fields = [
	"name" => $data["name"],
	"email" => $data["email"],
	"phone" => $data["phone"],
	"message" => $data["message"],
	"ts" => time().'000',
];

$added = $db->insert("contact", $fields);
if (!$added) {
	throwError("Failed to send message");
}


response([
	"message" => "ok",
	"id" => $data["id"]
]);
