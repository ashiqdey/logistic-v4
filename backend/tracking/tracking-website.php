<?php
require('../db.php');
require('../controller.php');
require('../env.php');
require('./helper.tracking.php');
$db = new DB();

$data = validateGet([], ["awb"], $db);

if (!isset($data['awb'])) {
	throwError("No data found EXAR13");
}


$tracking = $db->select("*", "tracking", "awb='".$data['awb']."'",1);
if (count($tracking)) {
	throwError("No data found");
}

$tracking = formatTracking($tracking,$status_map3);

$status = $db->select("id, text, ts", "status", "awb='".$data['awb']."' ORDER BY id");


response([
	"tracking" => $tracking,
	"status" => $status
]);
