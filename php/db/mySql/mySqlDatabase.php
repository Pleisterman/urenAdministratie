<?php
/*
        @package        Pleisterman/MbAdmin
        function:       handles the mySql connection and transactions
        Last revision:  29 -01-2025
 
*/

namespace php\db\mySql;

use php\config\config;
use php\db\mySql\mySqlScripts;
use php\db\mySql\mySqlActions;

class mySqlDatabase {
    
    private $host;
    private $username;
    private $password;
    private $dbname;
    private $debugger;
    private $sqlScipts = null;
    private $sqlActions = null;
    public function __construct( $debugger ) {

        // set cdebugger
        $this->debugger = $debugger;
        
        // get config
        $this->getConfig();
        
        // create scripts
        $this->sqlScipts = new mySqlScripts( $debugger );
        
        // create actions
        $this->sqlActions = new mySqlActions( $debugger );
        
        // connect database
        $this->sqlActions->connect( $this->host, $this->username, $this->password, $this->dbname );
        
    }
    private function getConfig() {
        
        // get config
        $config = config::getDbConfig();
        
        // set values
        $this->host = $config['host'];
        $this->username = $config['user'];
        $this->password = $config['password'];
        $this->dbname = $config['database'];
        // done set values
        
    }
    public function getRows( $options ) {
        
        // get sql
        $sql = $this->sqlScipts->createSql( $options );
        
        // return actions call
        return $this->sqlActions->getRows( $sql, $options );
        
    }
    public function getRow( $options ) {
        
        // get sql
        $sql = $this->sqlScipts->createSql( $options );
        
        // return actions call
        return $this->sqlActions->getRow( $sql, $options );
        
    }
    public function execute( $options ) {
        
        // get sql
        $sql = $this->sqlScipts->createSql( $options );
        
        // return actions call
        return $this->sqlActions->execute( $sql, $options );
        
    }
    public function getInsertId( ) {
        
        // return actions call
        return $this->sqlActions->getInsertId(  );
        
    }
    public function getSql( $options ) {
        
        // get sql
        $sql = $this->sqlScipts->createSql( $options );
        
        // return actions call
        return $sql;
        
        
    }
    public function __destruct() {
        
        
    }
    
}

