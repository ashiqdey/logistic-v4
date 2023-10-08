<?php
require('../controller.php');
require('../env.php');
require('../db.php');
$db = new DB();


//validate api request
//check access
$token = validateToken(true, "Edit & add new data");

$data = validatePost(["courier"], [], $db);

$courier = $data["courier"];


$exists = $db->select("id", "couriers", "name='" . $courier . "'", 1);
if ($exists) {
	throwError("Courier already exists");
}


// add new status
$added = $db->insert("couriers", ["name" => $courier]);
if (!$added) {
	throwError("Failed to add courier");
}

//fetch new data
$newData = $db->select("*", "couriers", "id='" . $added . "'", 1);

response([
	"message" => "New courier added",
	"data" => $newData
]);



