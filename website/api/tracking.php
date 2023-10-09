<?php
require('../php/controller.php');
require('../php/db.php');
$db = new DB();

$status_map2 = [
	"1" => "Shipment connected",
	"2" => "Shipment is on transit",
	"3" => "Out for delivery",
	"4" => "Delivery attempt failed",
	"5" => "Delivered",
	"6" => "Returned"
];


$data = validateGet(["awb"],[], $db);

$condition = "awb='".$data['awb']."'";

$tracking = $db->select("*", "tracking", $condition . " LIMIT 1",1);

if (!$tracking) {
	throwError("No data found for the AWB number.");
}

$tracking->status = (int)$tracking->status;
$tracking->status_label = $status_map2[$tracking->status];


$statuses = $db->select("id,text,ts", "status", $condition . " ORDER BY id");
foreach ($statuses as $s) {
	$s->ts = (int)($s->ts);
}


response([
	"tracking" => $tracking,
	"statuses" => $statuses,
]);
