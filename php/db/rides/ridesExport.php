<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  03-03-2025
 
*/

namespace php\db\rides;

use php\db\common\transform;

class ridesExport {
    
    private $debugOn = true;
    private $debugger;
    private $database;
    private $fileName = 'ridesExport-';
    private $title = 'Rides Export - ';
    private $headers = [
        'Vehicle',
        'Odometer-Start',
        'Odometer-End',
        'Date',
        'From',
        'To',
        'Project',
        'Description'
    ];
    public function __construct( $debugger, $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function read( $postValues ){
        
        // debug info
        $this->debug( 'Rides read export data, options: ' . json_encode( $postValues ) );
        
        // create result
        $result = array();

        // get data
        $rows = $this->getData( $postValues );
        
        // no data
        if( count( $rows ) <= 0 ){
            
            // set result 
            $result['no-data'] = true;
            
            // return result
            return $result;
            
        }
        // no data

        // debug info
        // set title
        $result['title'] = $this->createTitle( $postValues );
        
        // set data
        $result['data'] = $rows;
        
        // set file name
        $result['fileName'] = $this->createFileName( $postValues );

        // add headers
        if( $postValues->data->addHeaders ){

            // set add headers
            $result['addHeaders'] = true;
        
            // add headers
            $result['headers'] = $this->headers;
            
        }
        // add headers
        
        // add totals
        if( $postValues->data->addTotals ){

            // set add totals
            $result['addTotals'] = true;
        
            // add totals
            $result['totals'] = $this->getTotals( $result['data'] );
            
        }
        // add headers
        
        // format date time
        $this->format( $postValues->data->type, $result['data'] );
        
        
        // return result
        return $result;        
        
    }
    private function createFileName( $postValues ){
        
        // create file name
        $fileName = $this->fileName;
        
        // add from date
        $fileName .= transform::toDate( $postValues->data->fromDate );

        // add seperator
        $fileName .= '-';
        
        // add to date
        $fileName .= transform::toDate( $postValues->data->toDate );
        
        // return result
        return $fileName;
        
    }
    private function createTitle( $postValues ){
        
        $title = $this->title;
        
        $title .= ' from ';
        
        // add from date
        $title .= transform::toDate( $postValues->data->fromDate );
                
        $title .= ' to ';
        
        // add to date
        $title .= transform::toDate( $postValues->data->toDate );

        // return result
        return $title;
        
    }
    private function getData( $postValues ){
        
        $options = array(
            'action'    => 'select',
            'tables'    => ['rides as a', 'projects as b', 'vehicles as c'],
            'columns'   => ['c.name as vehicleName, a.odometerStart, a.odometerEnd, a.date, a.fromDescription, a.toDescription, b.name as projectName, a.description'],
            'relations' => ['a.projectId=b.id', 'a.vehicleId=c.id'],
            'clauses'   => ['a.date>=', 'a.date<=' ],
            'order'     => ['c.name ASC, a.odometerStart ASC'],
            'variables' => 'ss',
            'values'    => [$postValues->data->fromDate, $postValues->data->toDate]
        );
        
        $rows = $this->database->getRows( $options );
        
        $this->debug( 'Rides read export data, rows ' . json_encode( $rows ) );
        
        // return result
        return $rows;
        
    }
    private function format( $outputType, &$rows ){
        
        // loop over rows
        foreach ( $rows as $index => $row ) {
            
            // create date
            $date = substr( $row['date'],  8, 2 );
            $date .= '-';
            $date .= substr( $row['date'],  5, 2 );
            $date .= '-';
            $date .= substr( $row['date'],  0, 4 );
            // create date
            
            // transform dste to date
            $rows[$index]['date'] = $date;

            // output ! html
            if( $outputType !== 'html' ){
                
                // add quotes to description
                $rows[$index]['description'] = '"' . $row['description'] . '"';

                // add quotes to from description
                $rows[$index]['fromDescription'] = '"' . $row['fromDescription'] . '"';

                // add quotes to to description
                $rows[$index]['toDescription'] = '"' . $row['toDescription'] . '"';

            }
            // output ! html            

            // output html
            if( $outputType === 'html' ){
                
                // add quotes to description
                $rows[$index]['description'] = nl2br( $row['description'] );

                // add quotes to from description
                $rows[$index]['fromDescription'] = nl2br( $row['fromDescription'] );

                // add quotes to to description
                $rows[$index]['toDescription'] = nl2br( $row['toDescription'] );

            }
            // output html            
            
        }            
        // loop over rows
                
    }
    private function getTotals( $data ){
        
        // create total
        $totals = array();
        
        // loop over rows
        foreach ( $data as $row ) {

            // vehicle not exists
            if( !isset( $totals[$row['vehicleName']] ) ){
               
                // create total
                $total = array( 
                    'title'     =>  $row['vehicleName'],
                    'total'     =>  0
                );
                // create total
                
                // add totals
                $totals[$row['vehicleName']] = $total;
                
            }
            // vehicle not exists
            
            // add distance
            $totals[$row['vehicleName']]['total'] += intval( $row['odometerEnd'] ) - intval( $row['odometerStart'] );
        
        }            
        // loop over rows
        
        // return totals
        return $totals;
        
    }
    private function debug( $message ){
        
        // debug on
        if( $this->debugOn ){
            
            // debug info
            $this->debugger->log( 'message', '      ' . $message );

        }
        
    }
    
}

