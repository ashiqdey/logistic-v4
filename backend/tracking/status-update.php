<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Edit & add new data");

$data = validatePost(["id", "text", "location", "datetime"], [], $db);

[
	'id' => $id,
	'text' => $text,
	'location' => $location,
	'datetime' => $datetime
] = $data;

// 2022-05-20  13:45:00
$timestamp = strtotime($datetime).'000';
if (!$timestamp) {
	throwError("Invalid datetime");
}


$fields = [
	"text" => $text,
	"location" => $location,
	"ts" => $timestamp
];


// update status
if (!$db->update("status", $fields, ["id" => $id])) {
	throwError("Failed to update");
}
$newStatus = $db->select("*", "status", "id='" . $id . "'", 1);
$newStatus->ts = (int)($newStatus->ts);;


response([
	"message" => "Status updated",
	"id" => $id,
	"data" => $newStatus
]);
