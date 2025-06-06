<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\rides;

use php\db\userOptions\userOptions;
use php\db\mySql\mySqlDatabase;

class dateAscList {
    
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
        $this->debug( 'list: ' . $listOptions['subject'] . ' getDateAscList offset: ' . $listOptions['offset'] );

        // create user options
        $userOptions = new userOptions( $this->debugger, $this->database );
        
        // get row limit
        $rowLimit = $userOptions->get( 'listLength' );
        
        // get offset row
        $offsetRow = $this->getOffsetRow( $listOptions );
        
        // create result
        $result = array(
           'total'  =>  $this->getCount( $listOptions ),
        );
        // create result
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => $listOptions['columns'],
            'clauses'   => [],
            'order'     => ['date ASC, odometerStart ASC'],
            'limit'     => true,
            'variables' => '',
            'values'    => []
        );
        // create options

        // offset row exist
        if( $offsetRow ){
        
            // add string variable
            $options['variables'] .= 's';

            // add value
            array_push( $options['values'], $offsetRow['date'] . $offsetRow['odometerStart'] );
            
            // add offset
            array_push( $options['clauses'], 'CONCAT( date, odometerStart ) >=' );
            
            // get from
            $result['from'] = $this->getOffsetCount( $listOptions, $offsetRow['date'], $offsetRow['odometerStart'] );
            
            // get previous page id
            $result['previousPageId'] = $this->getPreviousPageId( $listOptions, $offsetRow['date'], $offsetRow['odometerStart'], $rowLimit );
            
            // get next page id
            $result['nextPageId'] = $this->getNextPageId( $listOptions, $offsetRow['date'], $offsetRow['odometerStart'], $rowLimit );
            
        }
        // offset row exist
        
        // add limit variable
        $options['variables'] .= 'i';
        
        // add limit value
        array_push( $options['values'], $rowLimit );

        // get rows
        $result['rows'] = $this->database->getRows( $options );
        
        // return result
        return $result;        
        
    }
    private function getOffsetRow( $listOptions ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getOffsetRow id: ' . $listOptions['offset'] );
    
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id', 'date', 'odometerStart'],
            'clauses'   => ['id='],
            'variables' => 'i',
            'values'    => [$listOptions['offset']]
        );
        // create options

        // get row
        $row = $this->database->getRow( $options );
        
        // row found
        if( $row ){
            
            // return result
            return $row;
        
        }
        // row found

        // return result
        return $this->getFirstRow( $listOptions );
        
    }
    private function getFirstRow( $listOptions ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getFirstRow' );

        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id', 'date', 'odometerStart'],
            'order'     => ['date ASC, odometerStart ASC'],
            'limit'     => true,
            'variables' => 'i',
            'values'    => [1]
        );
        // create options

        // get row
        $row = $this->database->getRow( $options );
        
        // return result
        return $row;
        
    }
    private function getCount( $listOptions ) {

        // debug info
        $this->debug( $listOptions['subject'] . ' list: getCount' );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['count(*) as count']
        );
        // create options

        // get row
        $row = $this->database->getRow( $options );

        // return result
        return $row['count'];
        
    }
    private function getOffsetCount( $listOptions, $date, $odometerStart ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getOffsetCount  date: ' . $date . ' odometerStart: ' . $odometerStart  );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['CONCAT( date, odometerStart ) <='],
            'order'     => ['date ASC, odometerStart ASC'],
            'variables' => 's',
            'values'    => [$date . $odometerStart]
        );
        // create options

        // get data
        $row = $this->database->getRow( $options );
        
        // return result
        return $row['count'];
        
    }
    private function getPreviousPageId( $listOptions, $date, $odometerStart, $rowLimit ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getPreviousPageId  date: ' . $date . ' odometerStart: ' . $odometerStart  . ' limit: ' . $rowLimit );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id'],
            'clauses'   => ['CONCAT( date, odometerStart ) <='],
            'order'     => ['date DESC, odometerStart DESC'],
            'limit'     => true,
            'variables' => 'si',
            'values'    => [$date . $odometerStart, $rowLimit + 1]
        );
        // create options

        // get data
        $row = $this->database->getRows( $options );
                
        // create id
        $id = $row ? $row[count($row)-1]['id'] : 0;
        
        // return result
        return $id;
        
    }
    private function getNextPageId( $listOptions, $date, $odometerStart, $rowLimit ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getNextPageId  date: ' . $date . ' odometerStart: ' . $odometerStart  . ' limit: ' . $rowLimit );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id'],
            'clauses'   => ['CONCAT( date, odometerStart ) >='],
            'order'     => ['date ASC, odometerStart ASC'],
            'limit'     => true,
            'variables' => 'si',
            'values'    => [$date . $odometerStart, $rowLimit + 1]
        );
        // create options

        // get data
        $row = $this->database->getRows( $options );
        
        // create id
        $id = $row ? $row[count($row)-1]['id'] : 0;
        
        // return result
        return $id;
        
    }
    private function debug( $message ){
        
        // debug on
        if( $this->debugOn ){
            
            // debug info
            $this->debugger->log( 'message', '      ' . $message );

        }
        
    }
    
}

