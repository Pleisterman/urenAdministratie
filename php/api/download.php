<?php
/*
        @package        Pleisterman/MbAdmin
        function:       download a file
        Last revision:  06-04-2025
 
*/

namespace php\api;

require_once '../../vendor/autoload.php';


use php\main\main;
use php\config\config;

    
$postValues = json_decode( file_get_contents( 'php://input' ) );


$main = new main();

// get export config
$config = config::getExportConfig();

// get export path
$path = $config['path'];

// get file
$file = $path . $_POST['fileName'];

header('Content-Description: File Transfer');

header('Content-Type: application/octet-stream');

header('Content-Disposition: attachment; filename=' . basename( $file ) );

flush();

readfile($file);

exit;
