<?php
require('../controller.php');
require('../env.php');
require('./helper.tracking.php');
require('../db.php');
$db = new DB();

//validate api request
$token = validateToken(true);

$couriers = $db->select("*", "couriers","id>0");
response([
	"courier" => $couriers,
	// "status" => $status_map
]);
