<?php
require('../controller.php');
require('../env.php');
require('../db.php');
$db = new DB();

//validate api request
$token = validateToken(true, "Delete data");

$data = validateGet(["id"], [], $db);

$id = $data["id"];


$courier = $db->select("*", "couriers", "id='" . $id . "'",1);
if (!$courier) {
	throwError("Invalid courier");
}

//now check in tracking
$courierExists = $db->select("id", "tracking", "courier='" . $courier->name . "' OR vendor='" . $courier->name . "' LIMIT 1",1);
if ($courierExists) {
	throwError("Can't delete this courier");
}


// delete status
if (!$db->delete("couriers", "id='" . $id . "'")) {
	throwError("Failed to delete courier");
}

response([
	"message" => "Courier deleted",
	"id" => $id
]);
