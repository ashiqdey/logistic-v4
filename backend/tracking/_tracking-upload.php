<?php
require('../controller.php');
require('../db.php');
require('./helper.tracking.php');
require_once('../vendor/SimpleXLSX.php');
$db = new DB();

$token = validateToken(true, "Edit & add new data");




if (!isset($_POST)) {
	throwError("File not uploaded.");
}

//chekc if file uplaoded
if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
	throwError('File missing');
}

$mimetype = mime_content_type($_FILES['file']['tmp_name']);
// only .xlsx
if ($mimetype != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
	throwError('Only .xlsx file is supported');
}
//check file size < 500MB
if (($_FILES['file']['size'] > 512000) || ($_FILES["file"]["size"] == 0)) {
	throwError("File must be less than 500KB");
}


$data = new stdclass();
$data->failed = array();
$data->skipped = array();
$data->total_rows = 0;
$data->imported = 0;



//read and parse the file
$file_name = $_FILES['file']['tmp_name'];

if ($xlsx = SimpleXLSX::parse($file_name)) {
	//ok
} else {
	//error in reading/parsing file
	throwError(SimpleXLSX::parseError());
}



//prepare and bind sql for inserting consignment
$tracking_stmt = $db->db_conn->prepare("INSERT INTO tracking (`dated`, `awb`, `forwarding_no`, `courier`, `sender`, `receiver`, `destination`, `content`, `pack`, `wt`, `dwt`, `vendor`, `status`, `ts`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
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
	$updated
);

//prepare and bind sql for inserting status
$status_stmt = $db->db_conn->prepare("INSERT INTO status (`type`, `awb`, `text`, `location`, `ts`) VALUES (?,?,?,?,?)");
$status_stmt->bind_param(
	"sssss",
	$status_type,
	$awb,
	$text,
	$location,
	$updated
);

//default value for all rows
$updated = time().'000';
$location = '';
$text = 'Shipment connected';



// ------- fetch latest 90 days awb to filter
$last_90_days = (time() - (86400 * 90)).'000';
$awbs = $db->select("awb", "tracking", "ts>$last_90_days LIMIT 2000");

$existing_awb = [];
foreach ($awbs as $row) {
	$existing_awb[] = $row->awb;
}
// ------- latest 90 days awb to filter


// loop all rows and insert
foreach ($xlsx->rows() as $row) {

	$dated = trim($row[0]);

	//should be 2/5/2022 (2 may 2022)\
	// should have 13 cols 
	if (strlen($dated) > 7 && count($row) > 12) {
		$data->total_rows++;

		$awb = (string)trim($row[2]);

		//if awb found in existing data, then skip
		if (in_array($awb, $existing_awb)) {
			$data->skipped[] = $awb;
			continue;
		}


		$dated         = convert_date($row[0]);
		$status_type   = convert_status($row[1], $status_map);
		$forwarding_no = (string)trim($row[3]);
		$courier	   = $row[4];
		$vendor	       = $row[5];
		$sender	       = $row[6];
		$receiver	   = $row[7];
		$destination   = sanit_string(($row[8]));
		$content	   = $row[9];
		$pack	       = (string) num($row[10]);
		$wt	           = (string) $row[11];
		$dwt	       = (string)round($row[12], 2);
		// $ts_dated      = (string) strtotime($dated." 10:00:00");

		//insert tracking row
		if ($tracking_stmt->execute()) {
			$data->imported++;

			$text = status_text($status_type, $status_map2);

			// insert status
			if (!$status_stmt->execute()) {
				$data->failed[] =  "DFS " . $status_stmt->error;
			}
		} else {
			$data->failed[] =  "DFT {$awb} " . $tracking_stmt->error;
		}

		$existing_awb[] = $awb;
	}
}

// unlink($file_name);
response($data);
