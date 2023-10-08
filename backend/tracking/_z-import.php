<?php
require('../db.php');
require('../controller.php');
require_once('../vendor/SimpleXLSX.php');
$db = new DB();


function sanit_string($s)
{
	$s = str_replace("–", "-", $s);
	return $s;
}

function getdate($d)
{
	if (empty($d)) {
		return "";
	}

	return date("Y-m-d", strtotime($d));
}


$data = new stdclass();
$data->failed = array();
$data->skipped = array();
$data->total_rows = 0;
$data->imported = 0;

/*
scan the file, read 100 line 
insert into table
insert into status

*/

//validate api request
$user = validateToken();



//read and parse the file
$file_name = "xlsx/freshdata_" . $user . ".xlsx";

if ($xlsx = SimpleXLSX::parse($file_name)) {
	//ok
} else {
	//error in reading/parsing file
	throwError(SimpleXLSX::parseError());
}



//prepare and bind sql for inserting consignment
$tracking_stmt = $db->db_conn->prepare("INSERT INTO tracking (`dated`,`date_number`, `awb`, `forward`, `courier`, `sender`, `rcver`, `dest`, `content`, `pack`, `wt`, `dimnwt`, `vendor`, `status`, `updated`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$tracking_stmt->bind_param(
	"sssssssssssssss",
	$dated,
	$date_number,
	$awb,
	$forward,
	$courier,
	$shipper,
	$consignee,
	$dest,
	$content,
	$no_of_pkt,
	$wt,
	$dwt,
	$vendor,
	$status,
	$updated
);

$updated = (string)time();

//prepare and bind sql for inserting status
$status_stmt = $db->db_conn->prepare("INSERT INTO status (`awb`, `text`, `loc`, `ts`) VALUES (?,?,?,?)");
$status_stmt->bind_param(
	"ssss",
	$awb,
	$text,
	$loc,
	$ts
);



$serial = 0;

//fetch latest 60 days awb
$last_90_days = time() - (86400 * 90);
$awbs = $db->select("awb", "tracking", "ts>$last_90_days LIMIT 2000");

$existing_awb = [];
foreach ($awbs as $row) {
	$existing_awb[] = $row->awb;
}



foreach ($xlsx->rows() as $row) {

	$dated = trim($row[0]);
	if ($serial > 0 && strlen($dated) > 9 && count($row) > 15) {

		$awb 		= (string)trim($row[1]);

		if (in_array($awb, $existing_awb)) {
			$data->skipped[] = $awb;
			continue;
		}

		$dated 		= getdate($dated);
		$dest		= $row[6];
		$vendor 	= $row[11];
		$status 	= "1";
		$forward	= (string)trim($row[2]);
		$courier	= $row[3];
		$shipper	= $row[4];
		$consignee	= $row[5];
		$content 	= strtolower($row[7]);
		$no_of_pkt 	= (string)$h->num($row[8]);
		$wt 	 	= (string)$row[9];
		$dwt 	 	= (string)round($row[10], 2);


		//insert tracking row
		if ($tracking_stmt->execute()) {
			$data->imported++;

			/*------1st status--------*/
			$text = 'Shipment connected';
			$loc = '';
			// insert status
			if (!$status_stmt->execute()) {
				$data->failed[] =  "83 " . $status_stmt->error;
			}
		} else {
			$data->failed[] =  "143 {$awb} " . $tracking_stmt->error;
		}

		$data->total_rows++;
	}

	$serial++;
}

unlink($file_name);
response($data);
