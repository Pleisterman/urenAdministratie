<?php
/*
        @package        Pleisterman/MbAdmin
        function:       delete data
        Last revision:  25-03-2025
 
*/

namespace php\api;

require_once '../../vendor/autoload.php';


use php\main\main;
use php\db\projects\projectContacts;

    
$postValues = json_decode( file_get_contents( 'php://input' ) );


$main = new main();


// choose subject
switch ( $postValues->subject ) {

    //  user options
    case 'projectContacts': {

        // create user options 
        $projectContacts = new projectContacts( $main->getDebbuger(), $main->getDatabase() );

        // call project contacts
        $projectContacts->delete( $postValues );

    }

}
// done choose subject
                        


// create

$result = '{';
    $result .= '"result" : "Delete ok",';
    $result .= '"procesId" : ' . $postValues->procesId;
$result .= '}';

echo $result;