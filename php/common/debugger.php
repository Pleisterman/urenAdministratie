<?php
/*
        @package        Pleisterman/MbAdmin
        function:       javascript debugger
        Last revision:  29-01-2025
 
*/


namespace php\common;

use php\config\config;

class debugger {
    private $debugOn = false;
    private $levels = array(
        'system'    => 0,
        'error'     => 1,
        'message'   => 2
    );    
    private $level = null;
    private $path = null;
    private $fileName = null;
    private $file = null;
    private $startedAt = null;
    private $ipReplace = array(
        'replace'   =>  array( ":", ";", "..", ".", "/", "\\" ),
        'with'      =>  array( "_", "_", "_", "_", "_", "_" )
    );    
    // Constructor to initialize connection details
    public function __construct() {

        $this->getConfig();
        $this->openFile();
        
    }
    function __destruct() {
        
        // no debugging
        if( !$this->debugOn ){


            // done
            return;
            
        }
        // no debugging
        
        // write closing statement
        $this->log( 'system', PHP_EOL . "program ended at: " . date("H:i:s:u", time()) . PHP_EOL );
        // calculate duration
        $duration = microtime( true ) - $this->startedAt;
        // write duration
        $this->log( 'system', 'program busy for: ' . $duration . ' seconds' );
        // add separation
        $this->log( 'system', '' );
        
    }
    public function clearLog() {

        // create file
        $this->file = fopen( $this->path . $this->fileName . ".txt", "w" );   
        
        // add opening statement
        fwrite( $this->file, "program started at" . date("H:i:s:u", time()) . PHP_EOL );

        // remember start time
        $this->startedAt = microtime( true );    
        
    }
    private function getConfig() {
        
        $config = config::getDebugConfig();
        $this->debugOn = $config['on'];
        $this->level = $config['level'];
        $this->path = $config['path'];
        $this->fileName = $config['fileName'];
        
    }
    private function openFile( ){

        // create file
        $this->file = fopen( $this->path . $this->fileName . ".txt", "a" );    
        
        // add opening statement
        fwrite( $this->file, "program started at" . date("H:i:s:u", time()) . PHP_EOL );

        // remember start time
        $this->startedAt = microtime( true );    
        
    }    
    public function log( $level, $message ) {
                
        // no debugging
        if( !$this->debugOn ){
            
            // done
            return;
        }
        // no debugging
        
        if( $this->level >= $this->levels[$level] ){
            
            // write the message
            fwrite( $this->file, $message . PHP_EOL );
            
        }        
        
    }
    public function dbException( $message ) {
        
        // write the message
        fwrite( $this->file, $message . PHP_EOL );
        print_r( $message );
        die();
        
    }
    
}