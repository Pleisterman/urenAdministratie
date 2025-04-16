<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api\export;

use php\db\mySql\mySqlDatabase;
use php\db\rides\rides;
use php\db\tasks\tasks;

class getData {

    private $debugOn = true;
    private $debugger;
    private $database;
    public function __construct( $debugger, mySqlDatabase $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function get( $postValues ) {
 
        // create result
        $result = array();
        
        // choose subject
        switch ( $postValues->subject ) {

            // cases
            case 'tasks': {

                // create tasks data
                $dataController = new tasks( $this->debugger, $this->database );

                // read
                $result = $dataController->export( $postValues );

                // done
                break;

            }
            case 'rides': {

                // create rides data
                $dataController = new rides( $this->debugger, $this->database );

                // read
                $result = $dataController->export( $postValues );

                // done
                break;

            }
            default: {

                // debug info
                $this->debug( 'Error Export subject not found ' . $postValues->subject );

                // set error        
                $result['error'] = 'SubjectNotFound: ' . $postValues->subject;

            }
            // done cases
            
        }        
        // done switch

        // return result
        return $result;
        
    }        
    private function debug( $message ){
        
        // debug on
        if( $this->debugOn ){
            
            // debug info
            $this->debugger->log( 'message', '      ' . $message );

        }
        
    }
    
}

