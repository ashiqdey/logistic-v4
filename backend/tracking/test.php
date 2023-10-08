<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.tracking.php');
require_once('../vendor/SimpleXLSX.php');


$db = new DB();


$data = new stdclass();
$data->failed = array();
$data->skipped = array();
$data->total_rows = 0;
$data->imported = 0;
$data->raw = [];



//read and parse the file
$file_name = $_FILES['file']['tmp_name'];

if ($xlsx = SimpleXLSX::parse($file_name)) {
	//ok
} else {
	//error in reading/parsing file
	throwError(SimpleXLSX::parseError());
}



// loop all rows and insert
foreach ($xlsx->rows() as $row) {

	$dated = trim($row[0]);

	//should be 2/5/2022 (2 may 2022)\
	// should have 13 cols 
	if (strlen($dated) > 7 && count($row) > 12) {

		$awb = (string)trim($row[2]);

		$dated         = convert_date($row[0]);
		$status_type   = convert_status($row[1], $status_map);

		$data->raw[] = [
			$row[0],
			$dated,
			$awb,
			$row[1],
			$status_type
		];

		$data->total_rows++;
	}
}

response($data);
