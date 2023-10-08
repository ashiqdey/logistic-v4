<?php
require('../controller.php');
require('../env.php');
require('../db.php');
require('./helper.estimation.php');
$db = new DB();

//validate api request
$token = validateToken();

$data = validateGet([], ["id"]);

$next_id=0;

if(isset($data["id"])){
	$condition = "id<".$data["id"]." ORDER BY id DESC";
}
else{
	$condition = "id>0 ORDER BY id DESC";
}

$queries = $db->select("*", "get_estimate", $condition." LIMIT 50");


if(count($queries) > 0){
	$first_id = $db->select("id", "get_estimate", "id>0 ORDER BY id LIMIT 1",1);

	$next_id = (int)$queries[count($queries) - 1]->id;

	if($first_id->id == $next_id){
		$next_id=0;
	}
}


foreach ($queries as $s) {
	$s = format_estimate($s);
}

$res = [
	"data" => $queries, 
	"next_id" => $next_id, 
];

response($res);
