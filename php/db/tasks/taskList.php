<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  03-03-2025
 
*/

namespace php\db\tasks;

use php\db\common\lastUsedList;
use php\db\common\dayList;
use php\db\common\dateDescList;
use php\db\common\dateAscList;

class taskList {
    
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

            // cases
            case 'lastUsed': {

                // get last used
                $result['rows'] = $this->getLastUsedList( $postOptions );
                
                // done
                break;
            
            }
            case 'day': {

                // get day list
                $result['rows'] = $this->getDayList( $postOptions );
                
                // done
                break;
            
            }
            case 'dateAsc': {

                // get date asc list
                $result['rows'] = $this->getDateAscList( $postOptions );
                
                // done
                break;
            
            }
            case 'dateDesc': {

                // get day list
                $result['rows'] = $this->getDateDescList( $postOptions );
                
                // done
                break;
            
            }
            default: {

                // debug info
                $this->debug( 'message', 'Error tasklist selection not found ' );

                // set error        
                $result['error'] = 'SelectionNotFound';

            }
            // done cases
            
        }        
        // done switch selection
        
        // return result
        return $result;
        
    }
    private function getLastUsedList( $postOptions ) {
        
        // create last used list
        $lastUsedList = new lastUsedList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'tasks',
            'columns'   =>  ['id', 'date', 'startTime', 'endTime', 'description'],
            'offset'    =>  $postOptions->selection->offset
        );
        // create list options

        // get list call
        $result = $lastUsedList->get( $listOptions );

        // add titles
        $this->addTitles( $result );

        // return result
        return $result;
        
    }
    private function getDayList( $postOptions ) {
        
        // create last used
        $dayList = new dayList( $this->debugger, $this->database );

        // get offset
        $offset = json_decode( $postOptions->selection->offset );
        
        // create date
        $date = $offset->year;
        $date .= str_pad( $offset->month, 2, "0", STR_PAD_LEFT );
        $date .= str_pad( $offset->day, 2, "0", STR_PAD_LEFT );
        // create date
        
        // create list options
        $listOptions = array(
            'subject'   =>  'tasks',
            'columns'   =>  ['id', 'date', 'startTime', 'endTime', 'description'],
            'offset'    =>  $date
        );
        // create list options

        // get list call
        $result = $dayList->get( $listOptions );

        // add titles
        $this->addTitles( $result );

        // return result
        return $result;
        
    }
    private function getDateDescList( $postOptions ) {
        
        // create date desc list
        $dateDescList = new dateDescList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'tasks',
            'columns'   =>  ['id', 'date', 'startTime', 'endTime', 'description'],
            'offset'    =>  $postOptions->selection->offset
        );
        // create list options

        // get list call
        $result = $dateDescList->get( $listOptions );

        // add titles
        $this->addTitles( $result );

        // return result
        return $result;
        
    }
    private function getDateAscList( $postOptions ) {
        
        // create date asc list
        $dateAscList = new dateAscList( $this->debugger, $this->database );

        // create list options
        $listOptions = array(
            'subject'   =>  'tasks',
            'columns'   =>  ['id', 'date', 'startTime', 'endTime', 'description'],
            'offset'    =>  $postOptions->selection->offset
        );
        // create list options

        // get list call
        $result = $dateAscList->get( $listOptions );
        
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
        $title = substr( $row['date'], 6, 2 );
        $title .= '-';
        $title .= substr( $row['date'], 4, 2 );
        $title .= '-';
        $title .= substr( $row['date'], 2, 2 );
        $title .= ' ';
        $title .= substr( $row['startTime'], 0, 2 );
        $title .= ':';
        $title .= substr( $row['startTime'], 2, 2 );
        $title .= ' ';
        $title .= substr( $row['endTime'], 0, 2 );
        $title .= ':';
        $title .= substr( $row['endTime'], 2, 2 );
        $title .= ' ';
        $title .= substr( $row['description'], 0, 32 );
        // done create title
        
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

