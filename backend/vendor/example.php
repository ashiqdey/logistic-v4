<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', true);

require_once './SimpleXLSX.php';

echo '<h1>Parse books.xslx</h1><pre>';
if ( $xlsx = SimpleXLSX::parse('Upload format 2.xlsx') ) {
	print_r( $xlsx->rows() );
} else {
	echo SimpleXLSX::parseError();
}
echo '<pre>';