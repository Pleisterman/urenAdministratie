<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\export;

use php\db\export\exportlist;
use php\db\common\getRow;
use php\db\common\transform;

class export {

    private $debugger;
    private $database;
    private $table = 'export';
    private $result = array();
    private $columns = [
        'type' => array( 
            'variable' => 's'
        ), 
        'fromDate' => array( 
            'transform' => 'fromDate', 
            'variable' => 's'
        ), 
        'toDate' => array( 
            'transform' => 'fromDate', 
            'variable' => 's' 
        ), 
        'delimiter' => array( 
            'variable' => 's' 
        ), 
        'addHeaders' => array( 
            'variable' => 'i', 
            'inInsert' => true 
        ), 
        'addTotals' => array( 
            'variable' => 'i', 
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
                $exportList = new exportlist( $this->debugger, $this->database );
                
                // get rows        
                $result['result'] = $exportList->readData( $postOptions );

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
                $this->debugger->log( 'message', 'Error export what not found ' );

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
        
        $this->debugger->log( 'message','update export ' . 'postData: ' . json_encode( $postData ) );

        // update row
        $this->updateRow( $postData );
        
    }
    private function updateRow( $postData ) {
        
        // get values
        $values = $this->getValues( $postData );

        // get project id
        array_push( $values, $postData->data->name );
        
        // create options
        $options = array(
            'action'    => 'update',
            'tables'    => [$this->table],
            'columns'   => $this->getColumns( ),
            'clauses'   => ['name='],
            'variables' => $this->getVariables( ) . 's',
            'values'    => $values
        );
        // create options

        // execute sql
        $this->database->execute( $options );
        
    }
    private function getColumns( ) {
        
        // create result
        $result = [];
        
        // loop over columns
        foreach( $this->columns as $index => $column ) {

            // add column
            array_push( $result, $index );
            
        }
        // loop over columns
        
        // return result
        return $result;
        
    }
    private function getVariables( ) {
        
        // create result
        $result = '';
        
        // loop over columns
        foreach( $this->columns as $index => $column ) {

            // add column
            $result .= $column['variable'];


            
        }
        // loop over columns
        
        // return result
        return $result;
        
    }
    private function getValues( $postData ) {
        
        // create values
        $values = [];
        
        // loop over columns
        foreach( $this->columns as $index => $column ) {

            // transform data
            $postData->data->$index = transform::transform( $column, $postData->data->$index );

            // add value
            array_push( $values, $postData->data->$index );
                
            
        }
        // loop over columns
        
        // return result
        return $values;
        
    }
    private function getRow( $postOptions ) {
        
        // get row
        $row = getRow::get( $this->database, $this->table, $postOptions->selection->id );
        
        // return result
        return $row;
        
    }
    
}

