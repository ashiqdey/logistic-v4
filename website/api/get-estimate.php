<?php
require('../php/controller.php');
require('../php/db.php');
$db = new DB();


$data = validatePost([
	"phone", 
	"destination", 
	"weight",
	"height", 
	"width",
	"fragile",
	"insurance",
	"packing",
	"express"
	], [], $db);

if (strlen($data["phone"] > 10)) {
	$data["phone"] = substr($data["phone"], 0, 10);
}


$fields = [
	"phone" => $data["phone"],
	"destination" => $data["destination"],
	"weight" => $data["weight"],
	"height" => $data["height"],
	"width" => $data["width"],
	"fragile" => $data["fragile"],
	"insurance" => $data["insurance"],
	"packing" => $data["packing"],
	"express" => $data["express"],
	"ts" => time().'000',
	"resolved" => '0',
];

$added = $db->insert("get_estimate", $fields);
if (!$added) {
	throwError("Failed to get estimate");
}


response(["message" => "Our representative will call you shortly with the calculated estimation."]);
