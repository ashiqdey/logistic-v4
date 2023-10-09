<?php
/*
header('Access-Control-Allow-Origin: http://localhost');
// header('Access-Control-Allow-Origin: *');

header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Secret, Accept, Accept-Language");
header('Access-Control-Max-Age: 2');
header("Content-Type: application/json");
header('Access-Control-Allow-Credentials: true');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header("HTTP/1.1 200 OK");
	return;
}

*/



date_default_timezone_set("Asia/Kolkata");



define('ENV', 'dev');
define('DB_NAME', 'atn');
define('DB_USER', 'root');
define('DB_PASS', '');


// define('API_SECRET', 'SDe64-hjuy81-opO9sH');
// define('SALT', 'SaL7phds9NiG0zp87njSDps9SsdTw943');
// define("AES_KEY", "d4H6sx-yod48F-ikaQZ4");
// define("AES_VECTOR", "9art1ld0XeoGehD0");


define('API_SECRET', 'SL098-hjuy81-opO9sH');

// define('ENV','production');
// define('DB_NAME','u708687426_atn57');
// define('DB_USER','u708687426_atn57u');
// define('DB_PASS','8088Xr3s58HQd@Atn57');
// define('ROOT','https://atnwx.in/admin/backend');






//validate GET request
function validateGet($reqFields = [], $optionalFields = [], $db = false)
{
	if ($_SERVER['REQUEST_METHOD'] != "GET") {
		throwError("Invalid method");
	}

	$data = $_GET;

	// check for all required keys
	foreach ($reqFields as $key) {
		//if not exists the error
		if (!array_key_exists($key, $data)) {
			throwError($key . " is required");
		}

		//if empty then error
		if (empty($data[$key])) {
			throwError($key . " is empty");
		}

		if ($db && is_string($data[$key])) {
			$data[$key] = $db->escape($data[$key]);
		}
	}


	// check for all optional  keys
	foreach ($optionalFields as $key) {
		//if empty then remove
		if (isset($data[$key])) {
			if ($data[$key] != "0" && empty($data[$key])) {
				unset($data[$key]);
			} else {
				if ($db && is_string($data[$key])) {
					$data[$key] = $db->escape($data[$key]);
				}
			}
		}
	}

	return $data;
}


//validate POST request
function validatePost($reqFields = [], $optionalFields = [], $db = false)
{
	if ($_SERVER['REQUEST_METHOD'] != "POST") {
		throwError("Invalid method");
	}

	$json = file_get_contents('php://input');
	$data = json_decode($json, true);


	if (!$data) {
		throwError("No data posted");
	}

	// check for all required keys
	foreach ($reqFields as $key) {
		if (!array_key_exists($key, $data)) {
			throwError($key . " is required");
		}

		if ($db && is_string($data[$key])) {
			$data[$key] = $db->escape($data[$key]);
		}
	}



	// check for all optional  keys
	foreach ($optionalFields as $key) {
		//if empty then remove
		if (isset($data[$key])) {
			if ($data[$key] != "0" && empty($data[$key])) {
				unset($data[$key]);
			} else {
				if ($db && is_string($data[$key])) {
					$data[$key] = $db->escape($data[$key]);
				}
			}
		}
	}

	return $data;
}



//log json for dev env
function logger($mgs)
{
	if (ENV != "production") {
		echo json_encode($mgs);
	}
}



// throw error reponse
function throwError($mgs, $code = 400)
{
	header("HTTP/1.1 $code Bad request");
	header('content-type: application/json');

	if (is_array($mgs)) {
		die(json_encode(array_merge($mgs, ["error" => $code])));
	}

	die(json_encode(array("error" => $code, "message" => $mgs)));
}


// renpode success message
function response($data)
{
	header('content-type: application/json');
	die(json_encode($data));
}
