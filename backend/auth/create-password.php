<?php
require('./helper.account.php');

if(isset($_GET['password'])){
	echo passwordHash($_GET['password']);
}
else{
	echo 'GET password';
}