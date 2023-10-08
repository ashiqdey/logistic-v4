<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
$db = new DB();

$token = validateToken(true, "Edit & add new data");




// ---------------------------

$data = validatePost(["consignments"],[], $db);

$data = $data['consignments'];



// ---------end of prepared statment
//prepare and bind sql for inserting consignment
$tracking_stmt = $db->db_conn->prepare("INSERT INTO tracking (`dated`, `awb`, `forwarding_no`, `courier`, `sender`, `receiver`, `destination`, `content`, `pack`, `wt`, `dwt`, `vendor`, `status`, `ts_created`, `ts_updated`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$tracking_stmt->bind_param(
	"sssssssssssssss",
	$dated,
	$awb,
	$forwarding_no,
	$courier,
	$sender,
	$receiver,
	$destination,
	$content,
	$pack,
	$wt,
	$dwt,
	$vendor,
	$status_type,
	$ts_created,
	$ts_updated,
);

//prepare and bind sql for inserting status
$status_stmt = $db->db_conn->prepare("INSERT INTO status (`type`, `awb`, `text`, `location`, `ts`) VALUES (?,?,?,?,?)");
$status_stmt->bind_param(
	"sssss",
	$status_type,
	$awb,
	$text,
	$location,
	$timestamp
);
// ---------end of prepared statment







$awbs = array();
$failed = array();
$skipped = array();
$imported = 0;


//default value for all rows
$ts_created = '0';
$ts_updated = time().'000';



// insert all 
for($i=0;$i<count($data);$i++){

	$awb = $data[$i]['awb'];


	//check duplicate awb
	if (isAwbExists($awb)) {
		$skipped[] = $awb;
		continue;
	}

	

	

	$dated 			= $data[$i]['dated'];
	$timestamp 		= $data[$i]['timestamp'];
	$ts_created 	= $timestamp;

	$forwarding_no 	= $data[$i]['forwarding_no'];
	$sender 		= $data[$i]['sender'];
	$receiver 		= $data[$i]['receiver'];
	$destination 	= $data[$i]['destination'];
	$content 		= $data[$i]['content'];
	$courier 		= $data[$i]['courier'];
	$vendor 		= $data[$i]['vendor'];
	$pack  			= $data[$i]['pack'];
	$wt	   			= $data[$i]['wt'];
	$dwt   			= $data[$i]['dwt'];
	$status_type 	= $data[$i]['status'];

	

	// random updated for mock
	$ts_updated = ($timestamp + (rand(3,6)*86400000));


	// insert tracking
	if (!$tracking_stmt->execute()) {
		$failed[] =  "Failed to add  for AWB {$awb}";
	}

	// status
	$location = '';

	// insert status
	$text = status_text($status_type, $status_map2);
	if (!$status_stmt->execute()) {
		// failed to insert status, do nothing
		$failed[] =  "Failed to add status for AWB {$awb}";
	}

	// make list of awb
	$awbs[] = "awb='{$awb}'";

	$imported++;
}


//update version
$version = updateVersion('tracking_add');
$versions = ['tracking_add'=>$version];

//fetch all
if(count($awbs)>0){
	$consignments = $db->select("*", "tracking", implode(" OR ",$awbs));

	foreach ($consignments as $c) {
		$c = formatTracking($c);
	}
}
else{
	$consignments = [];
}





response([
	"message" => "{$imported} consignments added",
	"imported" => $imported,
	"total_rows" => count($data),
	"skipped" => $skipped,
	"failed" => $failed,
	"version" => $version,
	"consignments" => $consignments
]);


