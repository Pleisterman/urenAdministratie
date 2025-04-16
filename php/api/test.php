<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api;


class test {


    // Constructor to initialize connection details
    public function __construct( $debugger ) {

        $this->debugger = $debugger;
        
    }
    
}

$post = json_decode( file_get_contents( 'php://input' ) );

$resulr = '{';
    $resulr .= '"result" : "test ok",';
    $resulr .= '"procesId" : ' . $post->procesId;
$resulr .= '}';

echo $resulr;