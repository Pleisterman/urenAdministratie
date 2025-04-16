<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api;

require_once '../../vendor/autoload.php';

use php\main\main;
use php\db\projects\projects;
use php\db\projects\projectContacts;
use php\db\contacts\contacts;
use php\db\tasks\tasks;
use php\db\rides\rides;
use php\db\vehicles\vehicles;
use php\db\export\export;

$main = new main();

// get debugger
$debugger = $main->getDebbuger();

$post = json_decode( file_get_contents( 'php://input' ) );

// choose subject
switch ( $post->subject ) {

    case 'contacts': {
        
        // create project data
        $dataController = new contacts( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'projects': {
        
        // create project data
        $dataController = new projects( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'projectContacts': {
        
        // create project data
        $dataController = new projectContacts( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'contacts': {
        
        // create project data
        $dataController = new contacts( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'vehicles': {
        
        // create vehicles data
        $dataController = new vehicles( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'tasks': {
        
        // create tasks data
        $dataController = new tasks( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'taskProject': {
        
        // create project data
        $dataController = new projects( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'rides': {
        
        // create rides data
        $dataController = new rides( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'rideProject': {
        
        // create project data
        $dataController = new projects( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'rideVehicle': {
        
        // create vehicles data
        $dataController = new vehicles( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    case 'export': {
        
        // create export data
        $dataController = new export( $debugger, $main->getDatabase() );
        
        // get data
        $result = $dataController->readData( $post );

        // done
        break;
    
    }
    default: {
        
        // debug info
        $debugger->log( 'message', 'Error Read subject not found ' . $post->subject );
        
        // set error        
        $result = array( 
            'error' => 'SubjectNotFound: ' . $post->subject
        );
        // create result
        
    }
}        

// add proces id
$result['procesId'] = $post->procesId;

// return result
echo json_encode( $result );