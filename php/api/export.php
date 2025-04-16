<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api;

require_once '../../vendor/autoload.php';

use php\main\main;
use php\db\export\export;
use php\api\export\getData;
use php\api\export\html;
use php\api\export\csv;
use php\api\export\excel;
//use mbAdmin\php\api\export\excel;

$main = new main();

// get debugger
$debugger = $main->getDebbuger();

$postValues = json_decode( file_get_contents( 'php://input' ) );

// is tasks or rides
if( $postValues->subject === 'tasks' ||
    $postValues->subject === 'rides' ){

    // create export data
    $exportController = new export( $main->getDebbuger(), $main->getDatabase() );

    // update
    $exportController->update( $postValues );

}
// is tasks or rides

// create rides data
$dataController = new getData( $main->getDebbuger(), $main->getDatabase() );

// read
$data = $dataController->get( $postValues );

// create result
$result = array();

// has error
if( isset( $data['error'] ) ){

    // set result
    $result['error'] = $data['error'];

    // add proces id
    $result['procesId'] = $postValues->procesId;

    // return result
    echo json_encode( $result );    

    // done
    exit();
    
}
// has error

// no data
if( !isset( $data['data'] ) ){

    // set result
    $result['result'] = 'no-data';

    // add proces id
    $result['procesId'] = $postValues->procesId;

    // return result
    echo json_encode( $result );    

    // done
    exit();
    
}
// has error

// choose type
switch ( $postValues->data->type ) {

    // cases
    case 'html': {

        // create html
        $html = new html( $main->getDebbuger() );
        
        // create html
        $result = $html->create( $data );
        
        // done
        break;
    
    }
    case 'csv': {

        // get delimiter
        $delimiter = $postValues->data->delimiter;
        
        // create csv
        $csv = new csv( $main->getDebbuger() );
        
        // create csv
        $result = $csv->create( $delimiter, $data );
        
        // done
        break;
    
    }
    case 'excel': {
        
        // create excel
        $excel = new excel( $main->getDebbuger() );
        
        // create excel
        $result = $excel->create( $data );
        
        // done
        break;
    
        // done
        break;
    
    }
    default: {
        
        // debug info
        $debugger->log( 'message', 'Error Export output type not found ' . $postValues->type );
        
        // set error        
        $result = array( 
            'error' => 'OutputTypeNotFound: ' . $postValues->type
        );
        // create result
        
    }
    // done cases
    
}
// done switch output type

// add proces id
$result['procesId'] = $postValues->procesId;

// return result
echo json_encode( $result );