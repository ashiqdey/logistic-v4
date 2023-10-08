<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.estimation.php');
$db = new DB();



//validate api request
$token = validateToken(true, "Edit & add new data");

$data = validatePost(["id"], [ "resolved"], $db);

$id = (string)$data["id"];


// update status
if (!$db->update("get_estimate", ["resolved" => ($data["resolved"] ? "1":"0")], ["id" => $id])) {
	throwError("Failed to update estimation");
}
$newQuery = format_estimate($db->select("*", "get_estimate", "id='" . $id . "'", 1));


response([
	"message" => "Estimation updated",
	"id" => $id,
	"data" => $newQuery
]);

