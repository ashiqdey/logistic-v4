<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

//validate api request
$token = validateToken(true);

$data = validateGet(["awb"], [], $db);

$awb = $data['awb'];
$condition = "awb='" . $awb . "'";



$statuses = $db->select("*", "status", $condition . " ORDER BY id");
foreach ($statuses as $s) {
	$s = formatStatus($s);
}

response([
	"awb" => $awb,
	"data" => $statuses
]);
