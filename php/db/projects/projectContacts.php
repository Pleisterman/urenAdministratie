<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for project contacts data
        Last revision:  29-01-2025
 
*/

namespace php\db\projects;

use php\db\projects\projectContactsList;

class projectContacts {
    
    private $debugger;
    private $database;
    private $table = 'projectContacts';
    private $columns = ['projectId', 'contactId'];
    private $deleteClauses = ['projectId=', 'contactId='];
    public function __construct( $debugger, $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function readData( $postOptions,  ){
        
        // create result
        $result = array();
        
        // choose what
        switch ( $postOptions->what ) {

            // cases
            case 'list': {

                // create list
                $projectList = new projectContactsList( $this->debugger, $this->database );
                
                // get rows        
                $result['result'] = $projectList->readData( $postOptions );

                // done
                break;
            
            }
            default: {

                // debug info
                $this->debugger->log( 'message', 'Error project contacts what not found ' );

                // set error        
                $result['error'] = 'WhatNotFound';

            }
            // done cases
            
        }        
        // choose what
        
        // return result
        return $result;
        
    }
    public function delete( $postValues  ){
        
        $projectId = $postValues->id;
        $contactId = $postValues->linkedId;       
        
        // debug info
        $this->debugger->log( 'message', 'delete projectId: ' . $projectId . ' contactId: ' . $contactId );

            
        // create options
        $options = array(
            'action'    => 'delete',
            'tables'    => [$this->table],
            'clauses'   => $this->deleteClauses,
            'variables' => 'ii',
            'values'    => [$projectId, $contactId]
        );
        // create options

        
        // get sql
        $this->database->execute( $options );    
        
    }
    public function insert( $postValues  ){
        
        $projectId = $postValues->id;
        $contactId = $postValues->linkId;       
        
        // debug info
        $this->debugger->log( 'message', 'insert projectId: ' . $projectId . ' contactId: ' . $contactId );
        
        // create options
        $options = array(
            'action'    => 'insert',
            'tables'    => [$this->table],
            'columns'   => $this->columns,
            'variables' => 'ii',
            'values'    => [$projectId, $contactId]
        );
        // create options

        // get sql
        $this->database->execute( $options );    
        
    }
}

