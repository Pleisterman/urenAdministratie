<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

use php\db\common\transform;

class getValues {
    
    public static function get( $action, $columns, $postData ) {

        // create values
        $values = [];
        
        // loop over columns
        foreach( $columns as $index => $column ) {

            // action is update or column in insert
            if( $action === 'update' ||
                $column['inInsert'] ){

                // transform data
                $postData->data->$index = transform::transform( $column, $postData->data->$index );
                
                // add value
                array_push( $values, $postData->data->$index );
                
            }
            // action is update or column in insert
            
        }
        // loop over columns
        
        // return result
        return $values;
        
    }
    
}

