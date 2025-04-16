<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for export
        Last revision:  03-03-2025
 
*/

namespace php\db\export;

use php\db\common\allList;

class exportlist {
    private $debugOn = true;
    private $debugger;
    private $database;
    public function __construct( $debugger, $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function readData( $postOptions ){
        
        // create result
        $result = array();

        // get last used
        $result['rows'] = $this->getRows( $postOptions );
        
        // return result
        return $result;
        
    }
    private function getRows( $postOptions ) {
        
        // create last used
        $lastUsed = new allList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'export',
            'columns'   =>  ['id', 'name'],
            'offset'    =>  $postOptions->selection->offset
        );
        // create list options

        // get list call
        $result = $lastUsed->get( $listOptions );

        // add titles
        $this->addTitles( $result );

        // return result
        return $result;
        
    }
    private function addTitles( &$result ){
        
        $this->debug( 'addTitles' );
        
        // loop over rows
        foreach ( $result['rows'] as $key => $row ) {

            // get title
            $result['rows'][$key]['title'] = $this->getTitle( $row );
            
        }
        // loop over rows
        
    }
    private function getTitle( $row ){
        
        // create title
        $title = substr( $row['name'], 0, 32 );
        
        // return result
        return $title;
        
    }
    private function debug( $message ){
        
        // debug on
        if( $this->debugOn ){
            
            // debug info
            $this->debugger->log( 'message', '      ' . $message );

        }
        
    }
    
}

