<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.query.php');
$db = new DB();



//validate api request
$token = validateToken(true, "Edit & add new data");

$data = validatePost(["id"], [ "resolved"], $db);

$id = (string)$data["id"];


// update status
if (!$db->update("contact", ["resolved" => ($data["resolved"] ? "1":"0")], ["id" => $id])) {
	throwError("Failed to update query");
}
$newQuery = format_query($db->select("*", "contact", "id='" . $id . "'", 1));


response([
	"message" => "Query updated",
	"id" => $id,
	"data" => $newQuery
]);

