<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Delete data");

$data = validateGet(["id"], [], $db);

$id = $data["id"];

// delete status
if (!$db->delete("status", "id='" . $id . "'")) {
	throwError("Failed to delete");
}

response([
	"message" => "Status deleted",
	"id" => $id
]);
