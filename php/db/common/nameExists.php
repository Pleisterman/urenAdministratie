<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

class nameExists {
    
    public static function get( $database, $table, $name, $id ) {

        // create options
        $options = array(
            'action'    => 'select',
            'tables'    => [$table],
            'columns'   => ['count(*) as count'],
            'clauses'   => ['name='],
            'variables' => 's',
            'values'    => [$name]
        );
        // create options

        // id exists
        if( $id ){
            
            // add select options
            array_push( $options['clauses'], 'id<>' );
            $options['variables'] .= 'i';
            array_push( $options['values'], $id );
            
        }
        // id exists
        
        // get count
        $count = $database->getRow( $options );
        
        // record found
        if( $count['count'] > 0 ){
            
            // return name exists
            return true;
            
        }
        // get count
        
        // return name ! exists
        return false;
        
    }
    
}

