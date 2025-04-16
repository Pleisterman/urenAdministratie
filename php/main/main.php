<?php
/*
        @package        Pleisterman/MbAdmin
        function:       main controller for index route
        Last revision:  29-01-2025
 
*/

namespace php\main;

use php\common\debugger;
use php\db\mySql\mySqlDatabase; 

class main {
    private $debugger = null;
    private $database = null;
    public function __construct(  ) {

        $this->createDebugger();
        $this->createDatabase();
        
    }
    public function getDatabase() {
        
        return $this->database;
        
    }
    public function getDebbuger() {
        
        return $this->debugger;
        
    }
    public function clearDebuggerLog() {
        
        $this->debugger->clearLog();
        
    }
    private function createDebugger() {
        
        $this->debugger = new debugger(); 
        
    }
    private function createDatabase() {
        
        $this->database = new mySqlDatabase( $this->debugger );
        
    }
    
}

