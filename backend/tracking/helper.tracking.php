<?php
$status_map = [
	"CONNECTED" => "1",
	"TRANSIT" => "2",
	"OUT_FOR_DEL" => "3",
	"UNDELIVERED" => "4",
	"DELIVERED" => "5",
	"RTO" => "6"
];
$status_map2 = [
	"1" => "Shipment connected",
	"2" => "Shipment is on transit",
	"3" => "Out for delivery",
	"4" => "Delivery attempt failed",
	"5" => "Delivered",
	"6" => "Returned"
];
$status_map3 = [
	"1"=>"CONNECTED",
	"2"=>"TRANSIT",
	"3"=>"OUT_FOR_DEL",
	"4"=>"UNDELIVERED",
	"5"=>"DELIVERED",
	"6"=>"RTO"
];


function getTotalCount(){
	return $GLOBALS['db']->selectNoWhere("status,COUNT(id) as count", "tracking", "GROUP BY status");
}

function isAwbExists($awb){
	return $GLOBALS['db']->select("id", "tracking", "awb='$awb' LIMIT 1",1);
}

function num($n)
{
	return preg_replace('/[^0-9.]/', '', $n);
}

function convert_date($d)
{
	if (empty($d)) {
		return "";
	}

	return date("Y-m-d", strtotime($d));
}
function convert_status($s, $status_map)
{
	if (empty($s) || !isset($status_map[$s])) {
		return "1";
	}
	return $status_map[$s];
}

// get text for status title
function status_text($s, $status_map)
{
	if (empty($s) || !isset($status_map[$s])) {
		return "Shipment connected";
	}
	return $status_map[$s];
}

function sanit_string($s)
{
	return str_replace("–", "-", trim($s));
}


function formatTracking($s, $status_map3=null){
	$s->ts_created = (int)($s->ts_created);
	$s->ts_updated = (int)($s->ts_updated);

	return $s;
}

function formatStatus($s){
	$s->ts = (int)($s->ts);
	return $s;
}

