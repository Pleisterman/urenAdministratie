<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

use php\db\userOptions\userOptions;
use php\db\mySql\mySqlDatabase;

class lastUsedList {
    
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
        $this->debug( 'list: ' . $listOptions['subject'] . ' getLastUsedList offset: ' . $listOptions['offset'] );

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
            'order'     => ['used DESC'],
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
            array_push( $options['values'], $offsetRow['used'] );
            
            // add offset
            array_push( $options['clauses'], 'used<=' );
            
            // get from
            $result['from'] = $this->getOffsetCount( $listOptions, $offsetRow['used'] );
            
            // get previous page id
            $result['previousPageId'] = $this->getPreviousPageId( $listOptions, $offsetRow['used'], $rowLimit );
            
            // get next page id
            $result['nextPageId'] = $this->getNextPageId( $listOptions, $offsetRow['used'], $rowLimit );
            
        }
        // offset row exist
        
        // has not in
        if( isset( $listOptions['inRelation'] ) ){

            // add not in
            $options['inRelation'] = $this->getRelationOptions( $listOptions['inRelation'] );
            
            // add variables
            $options['variables'] .= $listOptions['inRelation']['variables'];
            
            // add values
            $this->addInRelationValues( $options['values'], $listOptions['inRelation'] );
            
        }
        // has not in
        
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
            'columns'   => ['id', 'used'],
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
            'columns'   => ['id', 'used'],
            'order'     => ['used DESC'],
            'limit'     => true,
            'variables' => '',
            'values'    => []
        );
        // create options

        // has not in
        if( isset( $listOptions['inRelation'] ) ){

            // add not in
            $options['inRelation'] = $this->getRelationOptions( $listOptions['inRelation'] );
            
            // add variables
            $options['variables'] .= $listOptions['inRelation']['variables'];
            
            // add values
            $this->addInRelationValues( $options['values'], $listOptions['inRelation'] );
            
        }
        // has not in
        
        // add limit variable
        $options['variables'] .= 'i';
        
        // add limit value
        array_push( $options['values'], 1 );
        
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

        // has not in
        if( isset( $listOptions['inRelation'] ) ){

            // add not in
            $options['inRelation'] = $this->getRelationOptions( $listOptions['inRelation'] );
            
            // add variables
            $options['variables'] = $listOptions['inRelation']['variables'];
            
            // add values
            $options['values'] = $listOptions['inRelation']['values'];
            
        }
        // has not in
        
        // get row
        $row = $this->database->getRow( $options );

        // return result
        return $row['count'];
        
    }
    private function getOffsetCount( $listOptions, $used ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getOffsetCount  used: ' . $used );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['used >='],
            'order'     => ['used DESC'],
            'variables' => 's',
            'values'    => [$used]
        );
        // create options

        // has not in
        if( isset( $listOptions['inRelation'] ) ){

            // add not in
            $options['inRelation'] = $this->getRelationOptions( $listOptions['inRelation'] );
            
            // add variables
            $options['variables'] .= $listOptions['inRelation']['variables'];
            
            // add values
            $this->addInRelationValues( $options['values'], $listOptions['inRelation'] );
            
        }
        // has not in
        
        // get data
        $row = $this->database->getRow( $options );
        
        // return result
        return $row['count'];
        
    }
    private function getPreviousPageId( $listOptions, $used, $rowLimit ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getPreviousPageId  used: ' . $used . ' limit: ' . $rowLimit );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id'],
            'clauses'   => ['used >='],
            'order'     => ['used ASC'],
            'limit'     => true,
            'variables' => 's',
            'values'    => [$used]
        );
        // create options

        // has not in
        if( isset( $listOptions['inRelation'] ) ){

            // add not in
            $options['inRelation'] = $this->getRelationOptions( $listOptions['inRelation'] );
            
            // add variables
            $options['variables'] .= $listOptions['inRelation']['variables'];
            
            // add values
            $this->addInRelationValues( $options['values'], $listOptions['inRelation'] );
            
        }
        // has not in
        
        // add limit variable
        $options['variables'] .= 'i';
        
        // add limit value
        array_push( $options['values'], $rowLimit + 1 );
        
        // get data
        $row = $this->database->getRows( $options );
                
        // create id
        $id = $row ? $row[count($row)-1]['id'] : 0;
        
        // return result
        return $id;
        
    }
    private function getNextPageId( $listOptions, $used, $rowLimit ) {
    
        // debug info
        $this->debug( $listOptions['subject'] . ' list: getNextPageId  used: ' . $used . ' limit: ' . $rowLimit );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$listOptions['subject']],
            'columns'   => ['id'],
            'clauses'   => ['used <='],
            'order'     => ['used DESC'],
            'limit'     => true,
            'variables' => 's',
            'values'    => [$used]
        );
        // create options

        // has not in
        if( isset( $listOptions['inRelation'] ) ){

            // add not in
            $options['inRelation'] = $this->getRelationOptions( $listOptions['inRelation'] );
            
            // add variables
            $options['variables'] .= $listOptions['inRelation']['variables'];
            
            // add values
            $this->addInRelationValues( $options['values'], $listOptions['inRelation'] );
            
        }
        // has not in
                
        // add limit variable
        $options['variables'] .= 'i';
        
        // add limit value
        array_push( $options['values'], $rowLimit + 1 );


         $this->debug( ' NextPage  options: ' . json_encode($options) );
        
        // get data
        $row = $this->database->getRows( $options );
        
        // create id
        $id = $row ? $row[count($row)-1]['id'] : 0;
        
        // return result
        return $id;
        
    }
    private function getRelationOptions( $inRelationOptions ){
    
        // return result
        return array(
            'isIn'      =>  $inRelationOptions['isIn'],
            'tables'    =>  $inRelationOptions['tables'],
            'relation'  =>  $inRelationOptions['relation'],
            'columns'   =>  $inRelationOptions['columns'],
            'clauses'   =>  $inRelationOptions['clauses']
        );
        // return result
        
    }
    private function addInRelationValues( &$values, $inRelationOptions ){
    
        foreach ( $inRelationOptions['values'] as $value ) {
            
            // add value
            array_push( $values, $value );
            
        }
        
    }
    private function debug( $message ){
        
        // debug on
        if( $this->debugOn ){
            
            // debug info
            $this->debugger->log( 'message', '      ' . $message );

        }
        
    }
    
}

