<?php
/*
        @package        Pleisterman/MbAdmin
        function:       handles the mySql connection and transactions
        Last revision:  29-01-2025
 
*/

namespace php\db\mySql;

use php\common\debugger;

class mySqlScripts {
    
    private $debugger;
    public function __construct(debugger $debugger ) {

        // debug info
        $this->debugger = $debugger;
        
    }
    public function createSql( $options ) {
        
        // action is select
        if( $options['action'] === 'select' ){
            
            // create select sql
            return $this->createSelectSql( $options );
            
        }
        // action is select
        
        // action is update
        if( $options['action'] === 'update' ){
            
            // create select sql
            return $this->createUpdateSql( $options );
            
        }
        // action is update
        
        // action is insert
        if( $options['action'] === 'insert' ){
            
            // create select sql
            return $this->createInsertSql( $options );
            
        }
        // action is insert
        
        // action is delete
        if( $options['action'] === 'delete' ){
            
            // create select sql
            return $this->createDeleteSql( $options );
            
        }
        // action is delete
        
    }
    public function createSelectSql( $options ) {
        
        $sql = 'SELECT ';

        // add columns
        $sql .= $this->getColumnsSql( $options );

        $sql .= 'FROM ';

        // add tables
        $sql .= $this->getTablesSql( $options );

        // add clauses
        $sql .= $this->getClausesSql( $options );

        // add relations
        $sql .= $this->getRelationsSql( $options );

        // add in relation
        $sql .= $this->getInRelationsSql( $options );

        // add order
        $sql .= $this->getOrderSql( $options );

        // add limit
        $sql .= $this->getLimitSql( $options );


        // debug info
        $this->debugger->log( 'message', PHP_EOL . '    Select sql: ' . $sql . PHP_EOL ); 
        
        // return result
        return $sql . ';';
        
    }
    public function createUpdateSql( $options ) {
        
        $sql = 'UPDATE ';

        // add tables
        $sql .= $this->getTablesSql( $options );

        $sql .= 'SET ';

        // add set
        $sql .= $this->getColumnsSql( $options );

        // add clauses
        $sql .= $this->getClausesSql( $options );

        // debug info
        $this->debugger->log( 'message', PHP_EOL . '    Update sql: ' . $sql . PHP_EOL ); 
        
        // return result
        return $sql . ';';
        
    }
    public function createInsertSql( $options ) {
        
        $sql = 'INSERT INTO ';

        // add tables
        $sql .= $this->getTablesSql( $options );

        $sql .= ' ( ';

        // add columns
        $sql .= $this->getColumnsSql( $options );

        $sql .= ' ) ';

        // add values
        $sql .= $this->getValuesSql( $options );

        
        // debug info
        $this->debugger->log( 'message', PHP_EOL . '    Insert sql: ' . $sql . PHP_EOL ); 
        
        // return result
        return $sql . ';';
        
    }
    public function createDeleteSql( $options ) {
        
        $sql = 'DELETE  FROM ';

        // add tables
        $sql .= $this->getTablesSql( $options );

        // add clauses
        $sql .= $this->getClausesSql( $options );

        // debug info
        $this->debugger->log( 'message', PHP_EOL . '    Delete sql: ' . $sql . PHP_EOL ); 
        
        // return result
        return $sql . ';';
        
    }
    private function getColumnsSql( $options ){

        // no columns
        if( !isset( $options['columns'] ) ){

            // debug info
            $this->debugger->log( 'message', PHP_EOL . '    error columns ! set: ' . json_encode( $options ) . PHP_EOL ); 
            
            // done
            return '';

        }
        // no columns
        
        // create sql
        $sql = '';
        
        // create counter
        $i = 0;
        
        // loop over columns
        foreach( $options['columns'] as $column ){
            
            // add column name
            $sql .= $column;
            
            // action is update
            if( isset( $options['action']) &&
                $options['action'] === 'update' ){
                
                // add variable 
                $sql .= '= ? ';
                
            }
            // action is update
            
            // ! last
            if( $i < count( $options['columns'] ) - 1 ){
                
                // add seperator
                $sql .= ', ';
                
            }
            // ! last
            
            // next counter
            $i++;
            
        }        
        // done loop over columns
        
        // add spacing
        $sql .= ' ';
        
        // return result
        return $sql;
        
    }
    private function getTablesSql( $options ){
        
        // no columns
        if( !isset( $options['tables'] ) ){

            // debug info
            $this->debugger->log( 'message', PHP_EOL . '    error tables ! set: ' . json_encode( $options ) . PHP_EOL ); 
            
            // done
            return '';
            
        }
        // no columns
        
        // create sql
        $sql = '';
        
        // create counter
        $i = 0;
        
        // loop over tables
        foreach( $options['tables'] as $table ){
            
            // add table name
            $sql .= $table;
            
            // ! last
            if( $i < count( $options['tables'] ) - 1 ){
                
                // add seperator
                $sql .= ', ';
                
            }
            // ! last
            
            // next counter
            $i++;
            
        }        
        // done loop over tables

        // add spacing
        $sql .= ' ';
        
        // return result
        return $sql;
        
    }
    private function getClausesSql( $options ){
        
        // no clauses
        if( !isset( $options['clauses'] ) ||
             count( $options['clauses'] ) <= 0 ){

            // done
            return '';
            
        }
        // no clauses
        
        // create sql
        $sql = 'WHERE ';
        
        // create counter
        $i = 0;
        
        // loop over clauses
        foreach( $options['clauses'] as $clause ){
            
            // clause is array / else
            if( is_array( $clause ) ){
                
                // add clause
                $sql .= $clause['name'];
                
                // add null / ! null
                $sql .= $clause['value'] === 'null' ? ' IS NULL' : ' IS NOT NULL';
                
            }
            else {

                // add clause
                $sql .= $clause . ' ?';
                
            }
            // clause is array / else
            
            // ! last
            if( $i < count( $options['clauses'] ) - 1 ){
                
                // add seperator
                $sql .= ' AND ';
                
            }
            // ! last
            
            // next counter
            $i++;
            
        }        
        // done loop over clauses
        
        // add spacing
        $sql .= ' ';
        
        // return result
        return $sql;
        
    }
    private function getValuesSql( $options ){
        
        // no clauses
        if( !isset( $options['values'] ) ||
            count( $options['values'] ) <= 0    ){

            // done
            return '';
            
        }
        // no clauses
        
        // create sql
        $sql = 'VALUES ( ';
        
        // create counter
        $i = 0;
        
        // loop over values
        foreach( $options['values'] as $value ){
            
            // add value
            $sql .= ' ?';
            
            // ! last
            if( $i < count( $options['values'] ) - 1 ){
                
                // add seperator
                $sql .= ', ';
                
            }
            // ! last
            
            // next counter
            $i++;
            
        }        
        // done loop over values
        
        // close values
        $sql .= ' ) ';
        
        // return result
        return $sql;
        
    }
    private function getRelationsSql( $options ){
        
        // no relations
        if( !isset( $options['relations'] ) ||
            count( $options['relations'] ) <= 0    ){

            // done
            return '';
            
        }
        // no relations
        
        // create sql
        $sql = '';
        
        // has clauses
        if( isset( $options['clauses'] ) &&
            count( $options['clauses'] ) > 0 ){

            // add and
            $sql = ' AND ';
            
        }
        else {
            
            // create sql
            $sql = ' WHERE ';
        
            
        }
        // has clauses
        
        // create counter
        $i = 0;
        
        // loop over relations
        foreach( $options['relations'] as $relation ){
            
            // add relations
            $sql .= $relation;
            
            // ! last
            if( $i < count( $options['relations'] ) - 1 ){
                
                // add seperator
                $sql .= ' AND ';
                
            }
            // ! last
            
            // next counter
            $i++;
            
        }        
        // done loop over relations
        
        // add seperator
        $sql .= ' ';
        
        // return result
        return $sql;
        
    }
    private function getInRelationsSql( $options ){
        
        // in relation ! set
        if( !isset( $options['inRelation'] ) ){
         
            // done
            return '';
            
        }
        // in relation ! set
        
        // create sql
        $sql = '';
        
        // has clauses
        if( isset( $options['clauses'] ) ||
            isset( $options['relations'] ) ){

            // add and
            $sql .= ' AND ';
            
        }
        else {
            
            // create sql
            $sql .= ' WHERE ';
        
            
        }
        // has clauses
        
        // add relation
        $sql .= $options['inRelation']['relation'];

        // add action
        $sql .= $options['inRelation']['isIn'] ? ' IN ' : ' NOT IN ';

        // add not in
        $sql .= '( SELECT ';

        // add columns
        $sql .= $this->getColumnsSql( $options['inRelation'] );

        $sql .= 'FROM ';

        // add tables
        $sql .= $this->getTablesSql( $options['inRelation'] );

        // add clauses
        $sql .= $this->getClausesSql( $options['inRelation'] );

        // close not in
        $sql .= ' )  ';

        // return result
        return $sql;
        
    }
    private function getOrderSql( $options ){
        
        // order ! set
        if( !isset( $options['order'] ) ){

            // done
            return '';
            
        }
        // order ! set
        
        // create sql
        $sql = 'ORDER BY ';
        
        // create counter
        $i = 0;
        
        // loop over order
        foreach( $options['order'] as $order ){
            
            // add order
            $sql .= $order;
            
            // ! last
            if( $i < count( $options['order'] ) - 1 ){
                
                // add seperator
                $sql .= ', ';
                
            }
            // ! last
            
            // next counter
            $i++;
            
        }        
        // done loop over order
        
        // add seperator
        $sql .= ' ';

        // return result
        return $sql;
        
    }
    private function getLimitSql( $options ){
        
        // limit ! set
        if( !isset( $options['limit'] ) ){

            // done
            return '';
            
        }
        // limit ! set
        
        // limit ! set
        if( !isset( $options['limit'] ) ){

            // done
            return '';
            
        }
        // limit ! set
        
        // create sql
        $sql = 'LIMIT ? ';
        
        // return result
        return $sql;
        
    }
    
}

