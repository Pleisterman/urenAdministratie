<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for options data
        Last revision:  29-01-2025
 
*/

namespace php\db\userOptions;

use php\db\mySql\mySqlDatabase; 

class userOptions {
    private $debug = true;
    private $database = null;
    private $debugger = null;
    public function __construct( $debugger, mySqlDatabase $database ) {

        $this->debugger = $debugger;
        $this->database = $database;
 
    }
    public function getAll(){
        
        // debug info
        $this->debug( 'UserOptions GetAll' );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => ['options'],
            'columns'   => ['name', 'value']
        );
        // create options
        
        // get user options
        $userOptions = $this->database->getRows( $options );
        
        // debug info
        $this->debug( 'options result: ' . json_encode( $userOptions ) );

        // return result
        return $userOptions;
        
    }
    public function get( $name ){
            
        // debug info
        $this->debug( 'UserOptions get name: ' . $name );
        
        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => ['options'],
            'columns'   => ['name', 'value'],
            'clauses'   => ['name='],
            'variables' => 's',
            'values'    => [$name]
        );
        // create options
        
        // get option
        $option = $this->database->getRow( $options );
        
        // debug info
        $this->debug( 'option result: ' . json_encode( $option ) );
        
        // retrun result
        return $option['value'];
        
    }
    public function update( $name, $value ){
        
        // debug info
        $this->debug( 'UserOptions update name: ' . $name . ' value: ' . $value );

        // create options
        $options = array(
            'action'    => 'update',
            'tables'    => ['options'],
            'columns'   => ['value'],
            'clauses'   => ['name='],
            'variables' => 'ss',
            'values'    => [$value, $name]
        );
        // create options
        
        // call database
        $result = $this->database->execute( $options );
        
        // return result
        return $result;
        
    }
    public function debug( $message ){
            
        // ! debug
        if( !$this->debug ){
            
            // done
            return;
            
        }
        // ! debug
        
        // debug info
        $this->debugger->log( 'message', $message );
        
    }
    
}

