<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

//validate api request
$token = validateToken(true);

$data = validateGet([], ["id", "status"], $db);

$id = "0";
$nextId = 0;
$condition = "id>0";


// id
if (isset($data['id'])) {
	$id = $data['id'];
	$condition = "id<" . $id;
}

// status
if (isset($data['status'])) {
	$condition .= " AND status='" . $data['status'] . "'";
}




$trackings = $db->select("*", "tracking", $condition . " ORDER BY id DESC LIMIT " . MAX_RESULT);
$length = count($trackings);

if ($length == 0) {
	throwError("No data found");
}


// $existing_awb = [];
// foreach ($awbs as $row) {
// 	$existing_awb[] = $row->awb;
// }


// get next id
$first_id = $db->select("id", "tracking", "id>0 ORDER BY id LIMIT 1",1);
$nextId = $trackings[$length - 1]->id;

if($first_id->id == $nextId){
	$nextId=0;
}

// get total rows
// rebuild total_rows
$total_rows = getTotalCount();


// foreach ($trackings as $s) {
// 	$s = formatTracking($s,$status_map3);
// }



$version = getVersion(['tracking_add','tracking_update']);

// format
foreach ($trackings as $c) {
	$c = formatTracking($c);
}

response([
	"id" => $id,
	"nextId" => $nextId,
	"total_rows" => $total_rows,
	"version" => $version,
	"data" => $trackings,
]);
