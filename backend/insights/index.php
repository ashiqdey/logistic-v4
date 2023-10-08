<?php
require('../controller.php');
require('../env.php');
require('../db.php');
$db = new DB();

//validate api request
$token = validateToken();

$data = validateGet([], ["counts", "history30", "distrubution30"]);

$res = [];


$time_7days_ago = time_n_days(7);
$time_30days_ago = time_n_days(30);

// $res["time_time_7days_ago"] = $time_7days_ago;
// $res["time_time_30days_ago"] = $time_30days_ago;
$all = $db->select("status,COUNT(id) as counts", "tracking", "ts_created>$time_30days_ago GROUP BY status");


if (isset($data['counts'])) {
	
	$connected7days = last_n_days($db, 0, $time_7days_ago);
	$connected30days = last_n_days($db, 0, $time_30days_ago);


	$res['counts'] = array(
		"all" 	=> $all,
		"connected7"  => $connected7days,
		"connected30" => $connected30days,
	);
}





// last 30 days count
if (isset($data['history30'])) {
	// $res['last_30_history'] = $db->select("dated, COUNT(id) as counts", "tracking", "ts>$time_30days_ago GROUP BY dated");

	$data4 = $db->select("status,ts_created,ts_updated", "tracking", "ts_created>$time_30days_ago");
	foreach ($data4 as $d) {
		$d->ts_created = (int)$d->ts_created;
		$d->ts_updated = (int)$d->ts_updated;
	}

	$res['history30'] = $data4;
}


// prevoius 30 days count (30 days before last)
// if (isset($data['previous_30_history'])) {
// 	$time_60days_ago = time_n_days(60);

// 	$res['previous_30_history'] = $db->select("dated, COUNT(id) as counts", "tracking", "ts>$time_60days_ago AND ts<$time_30days_ago GROUP BY dated");
// }
// last 30 days, distrubution
if (isset($data['distrubution30'])) {
	$res['distrubution30'] = $all;
}

response($res);



function time_n_days($n)
{
	// get date of last n days
	return strtotime(date("Y-m-d 00:00:00", strtotime("-$n day").'000'));
}


function last_n_days($db, $n, $time_ndays_ago = 0)
{
	if ($time_ndays_ago == 0) {
		// get date of last 7 days
		$time_ndays_ago = time_n_days($n);
	}

	$data = $db->select("COUNT(id) as counts", "tracking", "status='1' AND ts_created>$time_ndays_ago", 1);
	return $data->counts;
}
