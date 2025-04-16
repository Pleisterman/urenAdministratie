<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  03-03-2025
 
*/

namespace php\db\contacts;

use php\db\common\lastUsedList;
use php\db\common\openList;
use php\db\common\closedList;

class contactlist {
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

        // choose selection
        switch ( $postOptions->selection->listType ) {

            case 'lastUsed': {

                // get last used
                $result['rows'] = $this->getLastUsed( $postOptions );
                
                // done
                break;
            
            }
            case 'open': {

                // get open
                $result['rows'] = $this->getOpen( $postOptions );
                
                // done
                break;
            
            }
            case 'closed': {

                // get closed
                $result['rows'] =$this->getClosed( $postOptions );
                
                // done
                break;
            
            }
            default: {

                // debug info
                $this->debugger->log( 'message', 'Error contactlist selection not found ' );

                // set error        
                $result['error'] = 'SelectionNotFound';

            }
        }        
        
        // return result
        return $result;
        
    }
    private function getLastUsed( $postOptions ) {
        
        // create last used
        $lastUsed = new lastUsedList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'contacts',
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
    private function getOpen( $postOptions ) {
        
        // create last open
        $open = new openList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'contacts',
            'columns'   =>  ['id', 'name'],
            'offset'    =>  $postOptions->selection->offset
        );
        // create list options

        // get list call
        $result = $open->get( $listOptions );

        // add titles
        $this->addTitles( $result );

        // return result
        return $result;
        
    }
    private function getClosed( $postOptions ) {
        
        // create last closed
        $closed = new closedList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'contacts',
            'columns'   =>  ['id', 'name'],
            'offset'    =>  $postOptions->selection->offset
        );
        // create list options

        // get list call
        $result = $closed->get( $listOptions );

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

