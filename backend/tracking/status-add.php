<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

//validate api request
//check access
$token = validateToken(true, "Edit & add new data");

$data = validatePost(["awb", "text", "location", "datetime", "status"], [], $db);

[
	'awb' => $awb,
	'text' => $text,
	'location' => $location,
	'datetime' => $datetime,
	'status' => $status
] = $data;

// 2022-05-20  13:45:00
$timestamp = strtotime($datetime).'000';
if (!$timestamp) {
	throwError("Invalid datetime");
}





// if (isset($status_map[$status])) {
// 	$type = $status_map[$status];
// }
// else if (isset($status_map2[$status])) {
// 	$type = $status;
// }
// else{
// 	throwError("Invalid status");
// }





$conditionAwb = ["awb" => $awb];
$newStatus = [
	"awb" => $awb,
	"text" => $text,
	"location" => $location,
	"ts" => $timestamp,
];

// if delivered or RTO, prevent 
$tracking = $db->select("*", "tracking", "awb='$awb' LIMIT 1", 1);
if (!$tracking) {
	throwError("Invalid AWB");
} 
else if ($tracking->status ===  5) {
	throwError("Delivered consignment can't be changed");
}
else if ($tracking->status === 6) {
	throwError("RTO consignment can't be changed");
}


// add type
$newStatus["type"] = $tracking->status;


// add new status
$added = $db->insert("status", $newStatus);
if (!$added) {
	throwError("Failed to add status");
}

// update status
$status_changed = $status && $tracking->status != $status;
if ($status_changed) {
	$db->update("tracking", ["status" => $status,"ts_updated" => $timestamp], $conditionAwb);

	// add new status
	$tracking->status = $status;

	// format
	$tracking = formatTracking($tracking);
}


//fetch new data
$newStatus = $db->select("*", "status", "id='" . $added . "'", 1);
$newStatus  = formatStatus($newStatus);


response([
	"message" => "New Status added",
	"awb" => $awb,
	"status" => $status,
	"tracking_row" => ($status_changed ? $tracking : false),
	"status_changed" => $status_changed,
	"data" => $newStatus
]);
