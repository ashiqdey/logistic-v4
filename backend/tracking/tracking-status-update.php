<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Edit & add new data");

$data = validatePost(["awb","status"], [], $db);

[
	'awb' => $awb,
	'status' => $status
] = $data;



// "1" => "Shipment connected",
if (!isset($status_map2[$status])) {
	throwError("Invalid status");
}


$field = [
	"status" => $status,
	"ts_updated" => time()."000"
];


// update tracking
if (!$db->update("tracking", $field, ["awb" => $awb])) {
	throwError("Failed to update");
}

// $newData = $db->select("*", "tracking", "awb='" . $awb . "'", 1);
// $newData = formatTracking($newData,$status_map3);

// update version, tracking_update


response([
	"message" => "Updated",
	"awb" => $awb,
	"status" => $status,
]);

