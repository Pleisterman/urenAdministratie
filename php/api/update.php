<?php
/*
        @package        Pleisterman/MbAdmin
        function:       update data
        Last revision:  08-02-2025
 
*/

namespace php\api;

require_once '../../vendor/autoload.php';

use php\main\main;
use php\db\userOptions\userOptions;
use php\db\projects\projects;
use php\db\contacts\contacts;
use php\db\vehicles\vehicles;
use php\db\tasks\tasks;
use php\db\rides\rides;

    
$postValues = json_decode( file_get_contents( 'php://input' ) );


$main = new main();


$updateResult = null;

// choose subject
switch ( $postValues->subject ) {

    case 'userOptions': {

        // create user options 
        $userOptions = new userOptions( $main->getDebbuger(), $main->getDatabase() );

        // update
        $userOptions->update( $postValues->id, $postValues->value );

        // done
        break;
    
    }
    case 'projects': {

        // create project data
        $dataController = new projects( $main->getDebbuger(), $main->getDatabase() );
        
        // update
        $updateResult = $dataController->update( $postValues );

        // done
        break;
    
    }
    case 'contacts': {

        // create contact data
        $dataController = new contacts( $main->getDebbuger(), $main->getDatabase() );
        
        // update
        $updateResult = $dataController->update( $postValues );

        // done
        break;
    
    }
    case 'vehicles': {

        // create vehicle data
        $dataController = new vehicles( $main->getDebbuger(), $main->getDatabase() );
        
        // update
        $updateResult = $dataController->update( $postValues );

        // done
        break;
    
    }
    case 'tasks': {

        // create task data
        $dataController = new tasks( $main->getDebbuger(), $main->getDatabase() );
        
        // update
        $updateResult = $dataController->update( $postValues );

        // done
        break;
    
    }
    case 'rides': {

        // create ride data
        $dataController = new rides( $main->getDebbuger(), $main->getDatabase() );
        
        // update
        $updateResult = $dataController->update( $postValues );

        // done
        break;
    
    }
    
}
// done choose subject
                        


// create

$result = '{';
    $result .= '"result" : ' . json_encode( $updateResult ) . ',';
    $result .= '"procesId" : ' . $postValues->procesId;
$result .= '}';

echo $result;