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
use php\db\projects\projects;
use php\db\contacts\contacts;
use php\db\vehicles\vehicles;
use php\db\tasks\tasks;
use php\db\rides\rides;

$postValues = json_decode( file_get_contents( 'php://input' ) );


$main = new main();

$insertResult = array();

// choose subject
switch ( $postValues->subject ) {

    case 'projects': {
        
        // create project data
        $dataController = new projects( $main->getDebbuger(), $main->getDatabase() );
        
        // get data
        $insertResult = $dataController->insert( $postValues );

        // done
        break;
    
    }
    case 'projectContacts': {

        // create user options 
        $projectContacts = new projectContacts( $main->getDebbuger(), $main->getDatabase() );

        // call project contacts
        $projectContacts->insert( $postValues );

        // done
        break;
    
    }
    case 'contacts': {
        
        // create contact data
        $dataController = new contacts( $main->getDebbuger(), $main->getDatabase() );
        
        // get data
        $insertResult = $dataController->insert( $postValues );

        // done
        break;
    }
    case 'vehicles': {
        
        // create vehicle data
        $dataController = new vehicles( $main->getDebbuger(), $main->getDatabase() );
        
        // get data
        $insertResult = $dataController->insert( $postValues );

        // done
        break;
    }
    case 'tasks': {
        
        // create task data
        $dataController = new tasks( $main->getDebbuger(), $main->getDatabase() );
        
        // get data
        $insertResult = $dataController->insert( $postValues );

        // done
        break;
    }
    case 'rides': {
        
        // create ride data
        $dataController = new rides( $main->getDebbuger(), $main->getDatabase() );
        
        // get data
        $insertResult = $dataController->insert( $postValues );

        // done
        break;
    }

}
// done choose subject
                        


// create

$result = '{';
    $result .= '"result" : ' . json_encode( $insertResult ) . ',';
    $result .= '"procesId" : ' . $postValues->procesId;
$result .= '}';

echo $result;