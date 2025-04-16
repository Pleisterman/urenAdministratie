<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  29-01-2025
 
*/

namespace php\db\common;

class transform {
    
    public static function transform( $column, $value ) {

        // transform ! set
        if( !isset( $column['transform'] ) ){
            
            // done
            return $value;
            
        }
        // transform ! set
        
        // transform is from date
        if( $column['transform'] === 'fromDate' ){
            
            // transfrom from date
            return transform::fromDate( $value );
            
        }
        // transform is from date
        
        // transform is to date
        if( $column['transform'] === 'toDate' ){
            
            // transfrom to date
            return transform::toDate( $value );
            
        }
        // transform is from date
        
        // transform is date
        if( $column['transform'] === 'date' ){
         
            // return result
            return date( "Y-m-d" );
            
        }
        // transform is date
        
    }
    public static function fromDate( $value ) {
    
        // value is null
        if( $value === null ){

            // return result
            return null;
            
        }
        // value is null
        
        // create date
        $date = '';
        $date .= $value->year;
        $date .= str_pad( $value->month,  2, "0", STR_PAD_LEFT );
        $date .= str_pad( $value->day,  2, "0", STR_PAD_LEFT );
        // create date

        // return result
        return $date;

    }
    public static function toDate( $value ) {
    
        // value is null
        if( $value === null ){

            // return result
            return null;
            
        }
        // value is null
        
        // create date
        $date = substr( $value,  6, 2 );
        $date .= '-';
        $date .= substr( $value,  4, 2 );
        $date .= '-';
        $date .= substr( $value,  0, 4 );
        // create date

        // return result
        return $date;

    }
    public static function toTime( $value ) {
    
        // value is null
        if( $value === null ){

            // return result
            return null;
            
        }
        // value is null
        
        // create time
        $date = substr( $value,  0, 2 );
        $date .= ':';
        $date .= substr( $value,  2, 2 );
        // create time

        // return result
        return $date;

    }
    
}

