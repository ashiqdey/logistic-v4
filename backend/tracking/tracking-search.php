<?php
require('../db.php');
require('../controller.php');
require('../env.php');
require('./helper.tracking.php');
require_once('../vendor/SimpleXLSX.php');
$db = new DB();

$data = validateGet([], ["awb"], $db);

$id = "0";
$nextId = "0";
$condition = "";

if (count($data) == 0) {
	throwError("No search query found");
}


// id
if (isset($data['awb'])) {
	$awbs = explode(",", $data['awb']);
	$awbArr = [];
	foreach ($awbs as $awb) {
		$awbArr[] = "awb='" . trim($awb) . "'";
	}
	$condition = implode(" OR ", $awbArr);
	// $condition .= " AND (" . $tcondition . ")";
}



define("MAX_RESULT", 100);

$trackings = $db->select("*", "tracking", $condition . " ORDER BY id DESC LIMIT " . MAX_RESULT);
$length = count($trackings);

if ($length == 0) {
	throwError("No data found");
}


// format
foreach ($trackings as $c) {
	$c = formatTracking($c);
}

response([
	"status" => $condition,
	// "status_map" => array_flip($status_map),
	"data" => $trackings
]);
