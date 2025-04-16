<?php
/*
        @package        Pleisterman/MbAdmin
        function:       controller for contact data
        Last revision:  03-03-2025
 
*/

namespace php\db\tasks;

use php\db\common\transform;


class tasksExport {
    
    private $debugOn = true;
    private $debugger;
    private $database;
    private $fileName = 'taskExport-';
    private $title = 'Task Export - ';
    private $headers = [
        'Date',
        'Start time',
        'End time',
        'Description',
        'Long description',
        'Project'
    ];
    private $totalsTitle = 'Total time: ';
    public function __construct( $debugger, $database ) {

        // set debugger
        $this->debugger = $debugger;
        
        // set database
        $this->database = $database;
        
    }
    public function read( $postValues ){

        // debug info
        $this->debug( ' tasks read export data, options: ' . json_encode( $postValues ) );
        
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
            'tables'    => ['tasks as a', 'projects as b'],
            'columns'   => ['a.date, a.startTime, a.endTime, a.description, a.longDescription, b.name '],
            'relations' => ['a.projectId=b.id'],
            'clauses'   => ['a.date>=', 'a.date<=' ],
            'order'     => ['a.date ASC, a.startTime ASC'],
            'variables' => 'ss',
            'values'    => [$postValues->data->fromDate, $postValues->data->toDate]
        );
        
        $rows = $this->database->getRows( $options );
        
        // return result
        return $rows;
        
    }
    private function format( $outputType, &$rows ){
        
        // loop over rows
        foreach ( $rows as $index => $row ) {
            
            // transform dste to date
            $rows[$index]['date'] = transform::toDate( $row['date'] );
            
            // transform start time to time
            $rows[$index]['startTime'] = transform::toTime( $row['startTime'] );
            
            // transform end time to time
            $rows[$index]['endTime'] = transform::toTime( $row['endTime'] );

            // output ! html
            if( $outputType !== 'html' ){
                
                // add quotes to description
                $rows[$index]['description'] = '"' . $row['description'] . '"';

                // add quotes to long description
                $rows[$index]['longDescription'] = '"' . $row['longDescription'] . '"';

            }
            // output ! html
            
            // output is html
            if( $outputType === 'html' ){
                
                // replace line feeds
                $rows[$index]['description'] = nl2br( $row['description'] );
                
                // replace line feeds
                $rows[$index]['longDescription'] = nl2br( $row['longDescription'] );
                
            }
            // output is html
            
        }            
        // loop over rows
                
    }
    private function getTotals( $data ){
        
        // create totals
        $totals = [array( 'title' => $this->totalsTitle )];
        
        // create total
        $total = 0;
        
        // loop over rows
        foreach ( $data as $row ) {

            // add time period
            $total += intval( $row['endTime'] ) - intval( $row['startTime'] );
        
        }            
        // loop over rows

        // calculate time
        $hours = floor( $total / 100 );
        $minutes =  str_pad( $total % 100,  2, "0", STR_PAD_LEFT );
        // calculate time
        
        // create result
        $totals[0]['total'] = $hours . ':' . $minutes;
        
        // return result
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

