<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for tasks data
        Last revision:  29-01-2025
 
*/

namespace php\db\rides;

use php\db\rides\rideList;
use php\db\rides\ridesExport;
use php\db\common\getRow;
use php\db\common\updateUsed;
use php\db\common\getVariables;
use php\db\common\getValues;
use php\db\common\getColumns;
use php\db\common\transform;

class rides {
    
    private $debugger;
    private $database;
    private $table = 'rides';
    private $result = array();
    private $columns = [
        'description' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'projectId' => array( 
            'variable' => 'i', 
            'inInsert' => true 
        ), 
        'vehicleId' => array( 
            'variable' => 'i', 
            'inInsert' => true 
        ), 
        'fromDescription' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'toDescription' => array( 
            'variable' => 's', 
            'inInsert' => true 
        ), 
        'odometerStart' => array( 
            'variable' => 'i', 
            'inInsert' => true 
        ), 
        'odometerEnd' => array( 
            'variable' => 'i', 
            'inInsert' => true 
        ), 
        'date' => array( 
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
                $rideList = new rideList( $this->debugger, $this->database );
                
                // get rows        
                $result['result'] = $rideList->readData( $postOptions );

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
                $this->debugger->log( 'message', 'Error rides what not found ' );

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
    public function export( $postOptions ){
        
        // create export
        $ridesExport = new ridesExport( $this->debugger, $this->database );

        // get rows        
        return $ridesExport->read( $postOptions );

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
               
        // validate odometers
        if( !$this->validateOdometers( $postData->data, 
                                       $postData->selection->id ) ){
            
            // return invalid 
            return false;
            
        }
        // validate odometers
        
        // return valid
        return true;        
        
        
    }
    private function validateInsert( $postData ) {
        
        // validate odometers
        if( !$this->validateOdometers( $postData->data, 
                                       null ) ){
            
            // return invalid
            return false;
            
        }
        // validate odometers
        
        // temp
        
        // return valid
        return true;        
        
    }
    private function validateOdometers( $data, $id ) {

        // validate start before end
        if( !$this->validateStartBeforeEnd( $data ) ){
            
            // return invalid 
            return false;
            
        }
        // validate start before end

        // validate odometer start after vehicle odometer
        if( !$this->validateStartAfterVehicleOdometerStart( $data ) ){
            
            // return invalid 
            return false;
            
        }
        // validate odometer start after vehicle odometer

        // validate interval is free
        if( !$this->validateIntervalIsFree( $data, $id ) ){
            
            // return invalid 
            return false;
            
        }
        // validate interval is free

        // validate interval order
        if( !$this->validateIntervalOrder( $data, $id ) ){
            
            // return invalid 
            return false;
            
        }
        // validate interval order

        // return valid 
        return true;
        
    }
    private function validateStartBeforeEnd( $data ) {
        
        // get start
        $start = intVal( $data->odometerStart );
        
        // get end
        $end = intVal( $data->odometerEnd );
        
        // start after end
        if( $end <= $start ){
            
            // set error
            $this->result['error'] = 'startfterEnd';
            $this->result['errorObject'] = 'odometerStart';
            // set error

            // return invalid
            return false;
            
        }
        // start after end

        // return valid
        return true;
        
    }
    private function validateStartAfterVehicleOdometerStart( $data ) {

        // create project options
        $vehicleOptions = array(
            'action'    => 'select',
            'tables'    => ['vehicles'],
            'columns'   => ['odometerStart'],
            'clauses'   => ['id='],
            'variables' => 'i',
            'values'    => [$data->vehicleId]
        );
        // create options

        // get project row
        $vehicleRow = $this->database->getRow( $vehicleOptions );
        
        // get odometer start
        $odometerStart = intVal( $data->odometerStart );
        
        // get vehicle ododmeter
        $vehicleOdometerStart = intVal( $vehicleRow['odometerStart'] );
        
        $this->debugger->log( 'message','odometerStart: ' . $odometerStart );
        $this->debugger->log( 'message','vehicleOdometerStart: ' . $vehicleOdometerStart );
        
        // start after end
        if( $odometerStart < $vehicleOdometerStart ){
            
        $this->debugger->log( 'message','odometerStart error: ' . $odometerStart );
            // set error
            $this->result['error'] = 'odometerStartBeforeVehicleOdometer';
            $this->result['errorObject'] = 'odometerStart';
            // set error

            // return invalid
            return false;
            
        }
        // start after end

        // return valid
        return true;
                
    }
    private function validateIntervalIsFree( $data, $id ) {

        // get start time
        $vehicleId = $data->vehicleId;
        
        // get start time
        $odometerStart = intVal( $data->odometerStart );
        
        // get end time
        $odometerEnd = intVal( $data->odometerEnd );
        
        // get rides with start in intevral
        $count = $this->getRidesCountInInterval( 'odometerStart', $vehicleId, $odometerStart, $odometerEnd, $id );
      
        // get rides with end in intevral
        $count += $this->getRidesCountInInterval( 'odometerEnd', $vehicleId, $odometerStart, $odometerEnd, $id );
        
        // records found
        if( $count > 0 ){
            
            // set error
            $this->result['error'] = 'IntervalNotFree';
            $this->result['errorObject'] = 'odometerStart';
            // set error

            // return invalid
            return false;
                
        }
        // records found

        // return valid
        return true;
        
    }
    private function getRidesCountInInterval( $column, $vehicleId, $odometerStart, $odometerEnd, $id ) {
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$this->table],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['vehicleId =',$column . '>',$column . '<'],
            'variables' => 'sii',
            'values'    => [$vehicleId, $odometerStart, $odometerEnd]
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

        // execute
        $count = $this->database->getRow( $options );
        
        // return result
        return $count['count'];
        
    }
    private function validateIntervalOrder( $data, $id ) {

        // get start time
        $vehicleId = $data->vehicleId;
        
        // get start time
        $odometerStart = intVal( $data->odometerStart );
        
        // get end time
        $odometerEnd = intVal( $data->odometerEnd );

        // get date
        $date = transform::fromDate( $data->date );
        
        // get rides with start in order before
        $count = $this->getRidesCountInOrderBefore( 'odometerStart', $vehicleId, $odometerStart, $date, $id );
      
        // get rides with end in order before
        $count += $this->getRidesCountInOrderBefore( 'odometerEnd', $vehicleId, $odometerEnd, $date, $id );
        
        // get rides with start in order after
        $count += $this->getRidesCountInOrderAfter( 'odometerStart', $vehicleId, $odometerStart, $date, $id );
        
        // get rides with end in order after
        $count += $this->getRidesCountInOrderAfter( 'odometerEnd', $vehicleId, $odometerEnd, $date, $id );
        
        // records found
        if( $count > 0 ){
            
            // set error
            $this->result['error'] = 'IntervalNotInOrder';
            $this->result['errorObject'] = 'odometerStart';
            // set error

            // return invalid
            return false;
                
        }
        // records found

        // return valid
        return true;
        
    }
    private function getRidesCountInOrderBefore( $column, $vehicleId, $odometer, $date, $id ) {
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$this->table],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['vehicleId =', $column . '>', 'date<'],
            'variables' => 'sis',
            'order'     => ['date ASC'],
            'values'    => [$vehicleId, $odometer, $date]
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

        // execute
        $count = $this->database->getRow( $options );
        
        // return result
        return $count['count'];
        
    }
    private function getRidesCountInOrderAfter( $column, $vehicleId, $odometer, $date, $id ) {
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$this->table],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['vehicleId =', $column . '<', 'date>'],
            'variables' => 'sis',
            'order'     => ['date ASC'],
            'values'    => [$vehicleId, $odometer, $date]
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

        // execute
        $count = $this->database->getRow( $options );
        
        // return result
        return $count['count'];
        
    }
    private function getRow( $postOptions ) {
        
        // get row
        $row = getRow::get( $this->database, $this->table, $postOptions->selection->id );
        
        // get linked project
        $projectRow = $this->getProjectName( $row['projectId'] );
        
        // set project name
        $row['projectName'] = $projectRow['name'];

        // get linked vehicle
        $vehicleRow = $this->getVehicleName( $row['vehicleId'] );
        
        // set vehicle name
        $row['vehicleName'] = $vehicleRow['name'];
                
        // update used
        $this->updateUsed( $row['id'] );
        
        // return result
        return $row;
        
    }
    private function getProjectName( $id ) {
        
        // create project options
        $projectOptions = array(
            'action'    => 'select',
            'tables'    => ['projects'],
            'columns'   => ['name'],
            'clauses'   => ['id='],
            'variables' => 'i',
            'values'    => [$id]
        );
        // create options

        // get project row
        return $this->database->getRow( $projectOptions );
        
    }
    private function getVehicleName( $id ) {
        
        // create vehicle options
        $vehicleOptions = array(
            'action'    => 'select',
            'tables'    => ['vehicles'],
            'columns'   => ['name'],
            'clauses'   => ['id='],
            'variables' => 'i',
            'values'    => [$id]
        );
        // create options

        // get vehicle row
        return $this->database->getRow( $vehicleOptions );
        
    }
    
}

