<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Edit & add new data");

$data = validatePost(["awb"], [
	"courier",
    "vendor",
    "sender",
    "receiver",
    "destination",
    "content",
    "pack",
    "wt",
    "dwt",
    // "status"
], $db);

$awb = $data["awb"];
$fields = [];


$allowedFields = [
	"courier",
    "vendor",
    "sender",
    "receiver",
    "destination",
    "content",
    "pack",
    "wt",
    "dwt",
];

// all other keys
foreach($allowedFields as $key){
	if(isset($data[$key])){
		$fields[$key] = $data[$key];
	}
}

// status
// if(isset($data["status"])){
// 	$status = $data["status"];

// 	if (isset($status_map[$status])) {
// 		$fields["status"] = $status_map[$status];
// 	}
// 	else if (isset($status_map2[$status])) {
// 		$fields["status"] = $status;
// 	}
// 	else{
// 		throwError("Invalid status");
// 	}
// }


if(count($fields) == 0){
	throwError("Nothing to update");
}


// update tracking
if (!$db->update("tracking", $fields, ["awb" => $awb])) {
	throwError("Failed to update");
}

$newData = $db->select("*", "tracking", "awb='" . $awb . "'", 1);
$newData = formatTracking($newData,$status_map3);

// update version, tracking_update



response([
	"message" => "Updated",
	"awb" => $awb,
	"data" => $newData,
]);

