<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for vehicle data
        Last revision:  22-03-2025
 
*/

namespace php\db\vehicles;

use php\db\vehicles\vehiclelist;
use php\db\common\getRow;
use php\db\common\updateUsed;
use php\db\common\getVariables;
use php\db\common\getValues;
use php\db\common\getColumns;
use php\db\common\nameExists;
use php\db\common\transform;

class vehicles {
    
    private $debugger;
    private $database;
    private $table = 'vehicles';
    private $result = array();
    private $columns = [
        'name' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'description' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'identification' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'odometerStart' => array( 
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
                $vehicleList = new vehiclelist( $this->debugger, $this->database );
                
                // get rows        
                $result['result'] = $vehicleList->readData( $postOptions );

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
                $this->debugger->log( 'message', 'Error vehicles what not found ' );

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
        
        // validate name exists
        if( !$this->validateNameNotExists( $postData->data->name, 
                                           $postData->selection->id ) ){
            
            // done 
            return false;
            
        }
        // validate name exists
        
        // validate identification exists
        if( !$this->validateIdentificationNotExists( $postData->data->identification , 
                                                     $postData->selection->id ) ){
            
            // done 
            return false;
            
        }
        // validate identification exists
        
        // validate odometer start
        if( !$this->validateOdometerStart( $postData->data->odometerStart , 
                                           $postData->selection->id ) ){
            
            // done 
            return false;
            
        }
        // validate identification exists
        
        // validate opened before closed
        if( !$this->validateOpenedBeforeClosed( $postData->data->opened, 
                                                $postData->data->closed ) ){
        
            // done 
            return false;
            
        }
        // validate opened before closed
        
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
    private function validateIdentificationNotExists( $identification , $id ) {

        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$this->table],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['identification ='],
            'variables' => 's',
            'values'    => [$identification ]
        );
        // create options

        // id exists
        if( $id ){
            
            // add select options
            array_push( $options['clauses'], 'id<>' );
            $options['variables'] .= 'i';
            array_push( $options['values'], $id );
            
        }
        // id exists
        
        // get count
        $count = $this->database->getRow( $options );
        
        // record found
        if( $count['count'] > 0 ){
            
            // set error
            $this->result['error'] = 'identificationExists';
            $this->result['errorObject'] = 'identification';
            // set error
            
            // return identification exists / invalid
            return false;
            
        }
        // get count
        
        // return identification ! exists / valid
        return true;        

    }
    private function validateOdometerStart( $odometerStart , $id ) {

        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => ['rides'],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['odometerStart <','vehicleId='],
            'variables' => 'ii',
            'values'    => [$odometerStart, $id ]
        );
        // create options

        // get count
        $count = $this->database->getRow( $options );
        
        // record found
        if( $count['count'] > 0 ){
            
            // set error
            $this->result['error'] = 'odometerStartBeforeFirstRide';
            $this->result['errorObject'] = 'odometerStart';
            // set error
            
            // return odometer start before first ride
            return false;
            
        }
        // get count
        
        // return odometer start / valid
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

