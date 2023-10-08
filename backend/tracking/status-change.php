<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Edit & add new data");

$data = validatePost(["awb", "status"], [], $db);

[
	'awb' => $awb,
	'status' => $status,
] = $data;



$status_map = [
	"CONNECTED" => "1",
	"TRANSIT" => "2",
	"OUT_FOR_DEL" => "3",
	"UNDELIVERED" => "4",
	"DELIVERED" => "5",
	"RTO" => "6"
];
$status_codes = ["1","2","3","4", "5","6"];



if (isset($status_map[$status])) {
	$status = $status_map[$status];
}
else if(in_array($status, $status_codes)) {
	$status = $status;
}
else{
	throwError("Invalid status");
}



// update status
if (!$db->update("tracking", ["status" => $status], ["awb" => $awb])) {
	throwError("Failed to update");
}
$newStatus = $db->select("*", "status", "id='" . $id . "'", 1);
$newStatus->ts = (int)($newStatus->ts);;


response([
	"message" => "Status updated",
	"id" => $id,
	"data" => $newStatus
]);
