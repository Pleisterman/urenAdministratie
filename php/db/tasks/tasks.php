<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for tasks data
        Last revision:  29-01-2025
 
*/

namespace php\db\tasks;

use php\db\tasks\taskList;
use php\db\tasks\tasksExport;
use php\db\common\getRow;
use php\db\common\updateUsed;
use php\db\common\getVariables;
use php\db\common\getValues;
use php\db\common\getColumns;
use php\db\common\transform;

class tasks {
    
    private $debugger;
    private $database;
    private $table = 'tasks';
    private $result = array();
    private $columns = [
        'projectId' => array( 
            'variable' => 'i', 
            'inInsert' => true
        ), 
        'description' => array( 
            'variable' => 's', 
            'inInsert' => true
        ), 
        'longDescription' => array( 
            'variable' => 's', 
            'inInsert' => true
        ), 
        'date' => array( 
            'transform' => 'fromDate', 
            'variable' => 's', 
            'inInsert' => true
        ), 
        'startTime' => array( 
            'variable' => 's', 
            'inInsert' => true
        ), 
        'endTime' => array( 
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
                $taskList = new taskList( $this->debugger, $this->database );
                
                // get rows        
                $result['result'] = $taskList->readData( $postOptions );

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
                $this->debugger->log( 'message', 'Error tasks what not found ' );

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
        $tasksExport = new tasksExport( $this->debugger, $this->database );

        // get rows        
        return $tasksExport->read( $postOptions );

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
        
        // validate period
        if( !$this->validatePeriod( $postData->data, 
                                    $postData->selection->id ) ){
            
            // done 
            return false;
            
        }
        // validate period
        
        // return valid
        return true;
        
    }
    private function validateInsert( $postData ) {
        
        // validate period
        if( !$this->validatePeriod( $postData->data, 
                                    null ) ){
            
            // done 
            return false;
            
        }
        // validate period
        
        // return valid
        return true;
        
    }
    private function validatePeriod( $data, $id ) {        
        
        // validate start before end
        if( !$this->validateStartBeforeEnd( $data ) ){
            
            // done 
            return false;
            
        }
        // validate start before end

        // validate period is free
        if( !$this->validatePeriodIsFree( $data, $id ) ){
            
            // done 
            return false;
            
        }
        // validate period is free
        
        // return valid
        return true;
            
    }
    private function validateStartBeforeEnd( $data ) {
        
        // get start time
        $startTime = intVal( $data->startTime );
        
        // get end time
        $endTime = intVal( $data->endTime );
        
        // start after end
        if( $endTime <= $startTime ){
            
            // set error
            $this->result['error'] = 'startTimeAfterEndTime';
            $this->result['errorObject'] = 'startTime';
            // set error

            // return invalid
            return false;
            
        }
        // start after end

        // return valid
        return true;
        
    }
    private function validatePeriodIsFree( $data, $id ) {

        // get date
        $date = transform::fromDate( $data->date );
        
        // get start time
        $startTime = intVal( $data->startTime );
        
        // get end time
        $endTime = intVal( $data->endTime );
        
        // get tasks with start in period
        $count = $this->getTasksCountInPeriod( 'startTime', $date, $startTime, $endTime, $id );
      
        // get tasks with end in period
        $count += $this->getTasksCountInPeriod( 'endTime', $date, $startTime, $endTime, $id );
        
        // records found
        if( $count > 0 ){
            
            // set error
            $this->result['error'] = 'periodNotFree';
            $this->result['errorObject'] = 'startTime';
            // set error

            // return invalid
            return false;
                
        }
        // records found

        // return valid
        return true;
                
    }
    private function getTasksCountInPeriod( $column, $date, $startTime, $endTime, $id ) {
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$this->table],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['date =',$column . '>',$column . '<'],
            'variables' => 'sss',
            'values'    => [$date, $startTime, $endTime]
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
        
        // create project options
        $projectOptions = array(
            'action'    => 'select',
            'tables'    => ['projects'],
            'columns'   => ['name'],
            'clauses'   => ['id='],
            'variables' => 'i',
            'values'    => [$row['projectId']]
        );
        // create options
         
        // get project row
        $projectRow = $this->database->getRow( $projectOptions );
        
        // set project name
        $row['projectName'] = $projectRow['name'];

        // update used
        $this->updateUsed( $row['id'] );
        
        // return result
        return $row;
        
    }
    
}

