<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

class getRow {
    
    public static function get( $database, $subject, $id ) {

        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$subject],
            'columns'   => ['*'],
            'clauses'   => ['id='],
            'variables' => 'i',
            'values'    => [$id]
        );
        // create options

        // get row
        $row = $database->getRow( $options );
        
        // return result
        return $row;
        
    }
    
}

