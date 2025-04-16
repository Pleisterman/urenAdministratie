<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

use php\db\mySql\mySqlDatabase;

class dayList {
    
    private $debugOn = true;
    private $debugger;
    private $database;
    public function __construct( $debugger, mySqlDatabase $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function get( $listOptions ) {

        // debug info
        $this->debug( 'list: ' . $listOptions['subject'] . ' getDayList date: ' . $listOptions['offset'] );

        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => $listOptions['columns'],
            'clauses'   => ['date='],
            'order'     => ['startTime ASC'],
            'variables' => 's',
            'values'    => [$listOptions['offset']]
        );
        // create options

        // get rows
        $result['rows'] = $this->database->getRows( $options );
        
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

