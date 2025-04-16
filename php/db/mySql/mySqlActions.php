<?php
/*
        @package        Pleisterman/MbAdmin
        function:       handles the mySql connection and transactions
        Last revision:  02-03-2025
 
*/

namespace php\db\mySql;

use php\common\debugger;

class mySqlActions {
    
    private $debugger = null;
    private $connection = null;
    public function __construct(debugger $debugger ) {

        // set debugger
        $this->debugger = $debugger;
        
    }
    public function connect( $host, $username, $password, $dbname ) {
        
        // try / catch
        try {
            
            // create connection
            $this->connection = new \mysqli( $host, $username, $password, $dbname );
            
        } 
        catch( \mysqli_sql_exception $error ) {
            
            // debug info
            $this->debugger->dbException( "Database connection failed: " . $error->getMessage() );

            
        }
        // done try / catch
        
    }
    public function execute( $sql, $options ) {
    
        // prepare statement
        $statement = $this->prepare( $sql );
        
        // bind parameter
        $this->bindParameters( $statement, $options );
        
        // execute
        $this->executeAfterPrepare( $statement, $sql );
        
        // return result
        return $statement;
        
    }
    public function getRow( $sql, $options ) {

        // prepare and execute 
        $statement = $this->execute( $sql, $options );
        
        // try / catch
        try {

            // get result
            $result = $statement->get_result();
            
        } 
        catch( \mysqli_sql_exception $error ) {
            
            $this->debugger->dbException( "Failed to get result: " . $error->getMessage() );
            
        }
        // done try / catch

        // result ! exists
        if ( $result === false ) {
            
            // debug info
            throw new Exception( "Failed to get result: " . $statement->error );
            
        }
        // done result ! exists

        // return result
        return $result->fetch_assoc();
        
    }
    public function getRows( $sql, $options ) {

        
        // prepare and execute
        $statement = $this->execute( $sql, $options );
                    
        // try / catch
        try {
           
            // get result
            $result = $statement->get_result();
            
        } 
        catch( \mysqli_sql_exception $error ) {
            
            // debug info
            $this->debugger->dbException( "Failed to get result: " . $error->getMessage() );
            
        }
        // done try / catch

        // result ! exists
        if ( $result === false ) {
            
            // debug info
            $this->debugger->dbException( "Failed to get result: " . $statement->error );
            
        }
        // done result ! exists

        // return result
        return $result->fetch_all( MYSQLI_ASSOC );
        
    }
    private function prepare( $sql ) {

        // try / catch
        try {
            
            // prepare statement
            $statement = $this->connection->prepare( $sql );
            
        } 
        catch( \mysqli_sql_exception $error ) {
            
                        // debug info
            $this->debugger->dbException( "Failed to prepare statement: " . $error->getMessage() );
            
        }
        // done try / catch

        // statement ! exists
        if ( !$statement ) {
            
            // debug info
            $this->debugger->dbException( "Failed to prepare statement: " . $sql );
            
        }
        // done statement ! exists
        
        // return result
        return $statement;
        
    }
    private function bindParameters( $statement, $options ) {               
        
        // no values
        if( !isset( $options['values'] ) ){
            
            // done
            return;
            
        }
        // no values
        
        // try / catch
        try {
            
            // bind parameters
            $bound = $statement->bind_param( $options['variables'], ...$options['values'] );
            
        } 
        catch( \mysqli_sql_exception $error ) {
            
            // debug info
            $this->debugger->dbException( "Failed to prepare statement: " . $error->getMessage() );
            
        }
        // done try / catch

        // bound ! exists
        if ( !$bound ) {
            
            // debug info
            $this->debugger->dbException( "Failed to bind parameters: " . $statement->error );
            
        }
        // bound ! exists
        
    }
    private function executeAfterPrepare( $statement ) {               

        // try / catch
        try {
            
            $executed = $statement->execute( );
            
        } 
        catch( \mysqli_sql_exception $error ) {
            
            // dbug info
            $this->debugger->dbException( "Failed to execute statement: " . $error->getMessage() );
            
        }
        // done try / catch

        // executed ! exists
        if ( !$executed ) {
            
            // debug info
            $this->debugger->dbException( "Failed to execute statement " . $statement->error );
            
        }
        // done executed ! exists
        
    }
    public function getInsertId() {
        
        // return result
        return $this->connection->insert_id;
        
    }
    public function __destruct() {
        
        // close the connection
        $this->connection->close();
        
    }
    
}

