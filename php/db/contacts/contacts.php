<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\contacts;

use php\db\contacts\contactlist;
use php\db\common\getRow;
use php\db\common\updateUsed;
use php\db\common\getVariables;
use php\db\common\getValues;
use php\db\common\getColumns;
use php\db\common\nameExists;
use php\db\common\transform;

class contacts {

    private $debugger;
    private $database;
    private $table = 'contacts';
    private $result = array();
    private $columns = [
        'name' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'companyName' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'description' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'email' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'address' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'zipCode' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'place' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'country' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'telephone1' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'telephone2' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'mobile' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'isCustomer' => array( 
            'variable' => 'i', 
            'inInsert' => true 
        ), 
        'telephone2' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'telephone2' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'opened' => array( 
            'transform' => 'fromDate', 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'closed' => array( 
            'transform' => 'fromDate', 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'updated' => array( 
            'transform' => 'date', 
            'variable' => 's', 
            'inInsert' => false 
        )  
    ];
    public function __construct( $debugger, $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function readData( $postOptions ){
        
        // create result
        $result = array();
        
        // choose what
        switch ( $postOptions->what ) {

            // cases
            case 'list': {

                // create list
                $contactList = new contactlist( $this->debugger, $this->database );
                
                // get rows        
                $result['result'] = $contactList->readData( $postOptions );

                // done
                break;
            
            }
            case 'row': {

                // get row
                $result['result'] = $this->getRow( $postOptions );
            
                // done
                break;
            
            }
            default: {

                // debug info
                $this->debugger->log( 'message', 'Error contacs what not found ' );

                // set error        
                $result['error'] = 'WhatNotFound';

            }
            // done cases
            
        }        
        // choose what
        
        // return result
        return $result;
        
    }
    public function update( $postData ) {
        
        $this->debugger->log( 'message','postData: ' . json_encode( $postData ) );

        // switch what
        switch ( $postData->what ) {
            
            //  row
            case 'row': {

                // update row
                $this->updateRow( $postData );
                
            }

        }
        // switch what
        
        // return result
        return $this->result;
                           
    }
    private function updateUsed( $id ) {
        
        // update used
        updateUsed::update( $this->database, $this->table, $id );
        
    }
    public function insert( $postData ) {
        
        // validate insert
        if( !$this->validateInsert( $postData ) ){
            
            // done with error
            return $this->result;
            
        }
        // validate insert
        
        // create options
        $options = array(
            'action'    => 'insert',
            'tables'    => [$this->table],
            'columns'   => getColumns::get( 'insert', $this->columns ),
            'variables' => getVariables::get( 'insert', $this->columns ),
            'values'    => getValues::get( 'insert', $this->columns , $postData )
        );
        // create options

        // execute sql
        $this->database->execute( $options );
        
        // get insert id
        $insertId = $this->database->getInsertId();
        
        // set result
        $this->result = array( 'message' => 'insert ok',
                               'insertId' => $insertId );
        // set result
        
        // return result
        return $this->result;
                           
    }
    private function updateRow( $postData ) {
        
        // validate update
        if( !$this->validateUpdate( $postData ) ){
            
            // done with error
            return;
            
        }
        // validate update
        
        // get values
        $values = getValues::get( 'update', $this->columns, $postData );

        // get project id
        array_push( $values, $postData->selection->id );
        
        // create options
        $options = array(
            'action'    => 'update',
            'tables'    => [$this->table],
            'columns'   => getColumns::get( 'update', $this->columns ),
            'clauses'   => ['id='],
            'variables' => getVariables::get( 'update', $this->columns ) . 'i',
            'values'    => $values
        );
        // create options

        // execute sql
        $this->database->execute( $options );

        // set result
        $this->result['result'] = 'update ok';
        
    }
    private function validateUpdate( $postData ) {
        
        // check name exists
        if( !$this->validateNameNotExists( $postData->data->name, 
                                           $postData->selection->id ) ){
            
            // done 
            return false;
            
        }
        // check name exists
        
        // check opened before closed
        if( !$this->validateOpenedBeforeClosed( $postData->data->opened, 
                                                $postData->data->closed ) ){
        
            // done 
            return false;
            
        }
        // check opened before closed
        
        // return valid
        return true;
        
    }
    private function validateInsert( $postData ) {
        
        // check name exists
        if( !$this->validateNameNotExists( $postData->data->name, 
                                           null ) ){
            
            // done 
            return false;
            
        }
        // check name exists
        
        // return valid
        return true;
        
    }
    private function validateNameNotExists( $name, $id ) {
        
        // name exists
        if( nameExists::get( $this->database, $this->table, $name, $id ) ){
            
            // set error
            $this->result['error'] = 'nameExists';
            $this->result['errorObject'] = 'name';
            // set error
            
            // return invalid
            return false;
            
        }
        // name exists
        
        // return valid
        return true;
            
    }
    private function validateOpenedBeforeClosed( $opened, $closed ) {
        
        // closed ! null
        if( $closed !== null ){
            
            // get opened date
            $openedDate = transform::fromDate( $opened );
            
            // get closed date
            $closedDate = transform::fromDate( $closed );

            // closed before opened 
            if( intval( $openedDate ) >= intval( $closedDate ) ){
                
                // set error
                $this->result['error'] = 'closedBeforeOpened';
                $this->result['errorObject'] = 'closed';
                // set error

                // return valid
                return false;

            }
            // closed before opened 
        
        }
        // closed ! null
        
        // return valid
        return true;
            
    }
    private function getRow( $postOptions ) {
        
        // get row
        $row = getRow::get( $this->database, $this->table, $postOptions->selection->id );
        
        // update used
        $this->updateUsed( $row['id'] );
        
        // return result
        return $row;
        
    }
    
}

