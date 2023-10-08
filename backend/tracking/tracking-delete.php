<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Delete data");

$data = validateGet(["awbs"], [], $db);

[ 'awbs' => $awbs] = $data;

$awbs = explode(",", $data['awbs']);
$errors = [];
$deleted = [];

foreach ($awbs as $awb) {

	// delete status
	if ($db->delete("tracking", "awb='{$awb}'")) {
		$deleted[] = $awb;
	}
	else{
		$errors[] = "Failed to delete {$awb}";
	}

	// delete status
	$db->delete("status", "awb='" . $awb . "'");
}


$total_rows = getTotalCount();


response([
	"message" => "Consignments deleted",
	"errors" => $errors,
	"awbs" => $deleted,
	"total_rows" => $total_rows
]);
