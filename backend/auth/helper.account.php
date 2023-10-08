<?php
require('../controller.php');
require('../env.php');
require('../db.php');
$db = new DB();



define("COOKIE", "atn_ah");

function processLogin($db, $account, $return_hash = false)
{
    if (!$account->status) {
        throwError("Account is not active");
    }

    //set cookie
    $hash = loginHash($account->id, $db);
    if ($return_hash) {
        return $hash;
    }


   
    unset($account->password);
    $account->token = getToken($account->id, $account->access);

    $account = format_account($account);

    //respond back
    response($account);
}





function passwordHash($password)
{
    //generate password hash, 
    return  md5($password . SALT);
}




function loginHash($id, $db)
{
    //generat cookie hash, 
    $hash = md5($id . rand(0, 99999) . time());

    // set cookie
    customCookie($hash);

    // insert to login session table
    $db->insert("login_sesions", [
        "user"     => (string)$id,
        "hash" => md5($hash),
        "last_login" => time().'000'
    ]);

    return $hash;
}



function customCookie($hash, $set = true, $key = COOKIE)
{
    if ($set) {
        if(ENV == "production"){
            setcookie($key, $hash, [
                'expires' => time() + (3600 * 240),
                'path' => '/',
                'domain' => '.'.DOMAIN,
                'secure' => true,
                'httponly' => true,
                'samesite' => 'None',
            ]);
        }
        else{
            setcookie($key, $hash, [
                'expires' => time() + 86400,
                'path' => '/',
                'domain' => 'localhost',
                // 'secure' => false,
                // 'httponly' => false,
                // 'samesite' => 'Lax',
            ]);
        }
    }
    //unset
    else {
        unset($_COOKIE[$key]);

        if(ENV == "production"){
            setcookie($key, $hash, [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => '.'.DOMAIN,
                'secure' => true,
                'httponly' => true,
                'samesite' => 'None',
            ]);
        }
        else{
            setcookie($key, $hash, [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => 'localhost',
                'secure' => false,
                'httponly' => false,
                'samesite' => 'Lax',
            ]);
        }
    }
}


// create auth token for user
function getToken($user, $access = 1)
{
    return encode(json_encode([
        'user' => $user,
        'access' => $access,
        "exp" => time() + (3600 * 5) //expiry time
    ]));
}



function format_account($account)
{
    if (property_exists($account, 'password')) {
        unset($account->password);
    }
    if (property_exists($account, 'phone')) {
        unset($account->phone);
    }
    if (property_exists($account, 'ts')) {
        $account->ts = (int)$account->ts;
    }
    if (property_exists($account, 'access')) {
        $account->access = (int)$account->access;
    }
    if (property_exists($account, 'google')) {
        $account->google = (bool)$account->google;
    }
    if (property_exists($account, 'access')) {
        $account->status = (bool)$account->status;
    }

    return $account;
}


