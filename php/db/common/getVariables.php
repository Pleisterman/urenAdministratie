<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

class getVariables {
    
    public static function get( $action, $columns ) {

        // create variables
        $variables = '';
        
        // loop over columns
        foreach( $columns as $index => $column ) {

            // action is update or column in insert
            if( $action === 'update' ||
                $column['inInsert'] ){
                
                // add vaiable
                $variables .= $column['variable'];
            
            }
            // action is update or column in insert
            
        }
        // loop over columns
        
        // return result
        return $variables;
        
    }
    
}

