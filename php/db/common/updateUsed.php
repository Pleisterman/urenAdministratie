<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

class updateUsed {
    
    public static function update( $database, $table, $id ) {

        // create options
        $options = array(
            'action'    => 'update',
            'tables'    => [$table],
            'columns'   => ['used'],
            'clauses'   => ['id='],
            'variables' => 'si',
            'values'    => [date( "Y-m-d H:i:s" ), $id]
        );
        // create options

        // execute sql
        $database->execute( $options );
        
    }
    
}

