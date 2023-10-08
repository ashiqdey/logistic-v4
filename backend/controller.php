<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Origin: http://localhost:3000');

header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Secret, Accept, Accept-Language");
header('Access-Control-Max-Age: 3600');
header("Content-Type: application/json");
header('Access-Control-Allow-Credentials: true');

// Allow cookie credentials because we're on the same domain
// header('Access-Control-Allow-Credentials: true');

// setcookie(TOKEN_COOKIE_NAME, YOUR_TOKEN_HERE, time()+86400*30, '/', '.'.$_SERVER['HTTP_HOST']);

date_default_timezone_set("Asia/Kolkata");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header("HTTP/1.1 200 OK");
	die();
}





$access_map = [
	"1" => "Viewer",
	"2" => "View & edit",
	"3" => "Edit & add new data",
	"4" => "Delete data",
	// "5" => "-",
	"6" => "Manager",
	// "7" => "Regional Manager",
	"8" => "Admin",
	"9" => "Super admin"
];

$access_map2 = [
	"Viewer" => "1",
	"View & edit" => "2",
	"Edit & add new data" => "3",
	"Delete data" => "4",
	// => "-",
	"Manager" => "6",
	// => "Regional Manager",
	"Admin" => "8",
	"Super admin" => "9",
];


function check_access($access, $key)
{
	if ($access < $GLOBALS["access_map2"][$key]) {
		throwError("You dont have access");
	}
}


function validateToken($parse_token = true, $access_key = false)
{
	if (!isset($_SERVER['HTTP_SECRET']) || ($_SERVER['HTTP_SECRET'] && $_SERVER['HTTP_SECRET'] != API_SECRET)) {
		throwError("Forbidden", 403);
	}

	if ($parse_token) {
		try {
			//check if "Authorization" header exists
			if (!isset($_SERVER['HTTP_AUTHORIZATION'])) throw new Exception("Not authorized");

			//decode the token
			if (!($token = decode($_SERVER['HTTP_AUTHORIZATION']))) throw new Exception("Invalid token");

			// parse json
			if (!($token = json_decode($token, true))) throw new Exception("Invalid token.");

			//check if user key exists
			if (!array_key_exists("user", $token)) throw new Exception("Invalid token..");


			// if ($access_key) {
			// 	check_access($token['access'], $access_key);
			// }

			return $token;
		} catch (Exception $e) {
			throwError($e->getMessage(), 401);
		}
	}

	return false;
}



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
		if (!array_key_exists($key, $data) || ($data[$key]!=0 && empty($data[$key]))) {
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




function encode($string)
{
	return openssl_encrypt($string, "AES-256-CBC", AES_KEY, false, AES_VECTOR);
}
function decode($string)
{
	return openssl_decrypt($string, "AES-256-CBC", AES_KEY, false, AES_VECTOR);
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






// sanitization
function linebr($e)
{
	return str_replace("\r\n", "", $e);
}

function quote($e)
{
	$e = str_replace("\"", "&quot;", $e);
	$e = str_replace(["’", "'"], "&apos;", $e);
	return $e;
}

function script($e)
{
	$e = str_replace("<scr", "&lt;scr", $e);
	$e = str_replace("</scr", "&lt;/scr", $e);
	return $e;
}



//if empty str then send empty array array
function formatResponse($str, $json = false)
{
	if (strlen($str) == 0) return [];

	return $json === true ?  json_decode($str) : explode(",", $str);
}


function getVersion($types){
	for ($i=0;$i<count($types) ;$i++) {
		$types[$i] = "type='{$types[$i]}'";
	}

	$versionsRaw = $GLOBALS['db']->select("type,version", "versions", implode(" OR ", $types));
	if($versionsRaw){
		$versions = [];

		foreach ($versionsRaw as $v) {
			$versions[$v->type] = $v->version;
		}
		return $versions;
	}

	return ['type'=>null];
}


function updateVersion($key){
	$version = time();
	$GLOBALS['db']->update("versions", ['version'=>$version], ['type'=>$key]);
	return $version;
}

