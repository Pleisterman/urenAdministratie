<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

class getColumns {
    
    public static function get( $action, $columns ) {

        // create result
        $result = [];
        
        // loop over columns
        foreach( $columns as $index => $column ) {

            // action is update or column in insert
            if( $action === 'update' ||
                $column['inInsert'] ){
                
                // add column
                array_push( $result, $index );
            
            }
            // action is update or column in insert
            
        }
        // loop over columns
        
        // return result
        return $result;
        
    }
    
}

