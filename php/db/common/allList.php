<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

use php\db\userOptions\userOptions;
use php\db\mySql\mySqlDatabase;

class allList {
    
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
        $this->debug( 'list: ' . $listOptions['subject'] . ' getAllList offset: ' . $listOptions['offset'] );

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
            'clauses'   => array( ),
            'order'     => ['name ASC'],
            'limit'     => array( 'value' => $rowLimit ),
            'variables' => '',
            'values'    => []
        );
        // create options

        // offset row exist
        if( $offsetRow ){
        
            // add string variable
            $options['variables'] .= 's';

            // add value
            array_push( $options['values'], $offsetRow['name'] );
            
            // add offset
            array_push( $options['clauses'], 'name>=' );
            
            // get from
            $result['from'] = $this->getOffsetCount( $listOptions, $offsetRow['name'] );
            
            // get previous page id
            $result['previousPageId'] = $this->getPreviousPageId( $listOptions, $offsetRow['name'], $rowLimit );
            
            // get next page id
            $result['nextPageId'] = $this->getNextPageId( $listOptions, $offsetRow['name'], $rowLimit );
            
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
            'columns'   => ['id', 'name'],
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
            'columns'   => ['id', 'name'],
            'order'     => ['name ASC'],
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
    private function getOffsetCount( $listOptions, $name ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getOffsetCount  name: ' . $name );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['name <='],
            'order'     => ['name ASC'],
            'variables' => 's',
            'values'    => [$name]
        );
        // create options

        // get data
        $row = $this->database->getRow( $options );
        
        // return result
        return $row['count'];
        
    }
    private function getPreviousPageId( $listOptions, $name, $rowLimit ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getPreviousPageId  name: ' . $name . ' limit: ' . $rowLimit );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id'],
            'clauses'   => ['name <='],
            'order'     => ['name DESC'],
            'limit'     => true,
            'variables' => 'si',
            'values'    => [$name, $rowLimit + 1]
        );
        // create options

        // get data
        $row = $this->database->getRows( $options );
                
        // create id
        $id = $row ? $row[count($row)-1]['id'] : 0;
        
        // return result
        return $id;
        
    }
    private function getNextPageId( $listOptions, $name, $rowLimit ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getNextPageId  name: ' . $name . ' limit: ' . $rowLimit );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id'],
            'clauses'   => ['name >='],
            'order'     => ['name ASC'],
            'limit'     => true,
            'variables' => 'si',
            'values'    => [$name, $rowLimit + 1]
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

