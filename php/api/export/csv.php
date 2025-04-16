<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api\export;

use php\config\config;

class csv {

    private $debugOn = true;
    private $debugger;
    private $path = null;
    private $file = null;
    private $fileExtension = '.csv';
    private $fileName = null;
    private $delimiters = array(
        'comma'     =>   ',',
        'space'     =>   ' ',
        'semicolon' =>   ';'
    );
    private $delimiter = null;
    public function __construct( $debugger ) {

        // set debugger
        $this->debugger = $debugger;
        
        // get config
        $this->getConfig();
        
    }
    public function create( $delimiter, $data ) {
 
        // set dlimiter
        $this->delimiter = $this->delimiters[$delimiter];
        
        // get file name
        $this->getFileName( $data );
        
        // open file
        $this->openFile( );
        
        // create csv
        $this->createCsv( $data );
        
        // close file
        $this->closeFile( );
        
        // return result
        return array( 
            'result' => array( 
                'fileName' =>  $this->fileName 
            )
        );
        // return result
        
    }        
    private function getFileName( $data ) {
        
        // get file name
        $this->fileName = $data['fileName'];
        
        // add extension
        $this->fileName .= $this->fileExtension;
        
    }        
    private function createCsv( $data ) {

        // add data
        $this->addData( $data );
        
        // add totals
        $this->addTotals( $data );
        
    }
    private function addData( $data ) {
        
        // add data headers
        $this->addDataHeaders( $data );
        
        // add data rows
        $this->addDataRows( $data );
        
    }
    private function addDataHeaders( $data ) {
        
        // no headers
        if( !isset( $data['addHeaders'] ) ){
            
            // done
            return;
            
        }
        // no headers

        // loop over headers
        for( $i = 0; $i < count( $data['headers'] ); $i++ ){
            
            // add header
            fwrite( $this->file, $data['headers'][$i] );

            // ! last
            if( $i < count( $data['headers'] ) - 1 ){
                
                // add delimiter
                fwrite( $this->file, $this->delimiter );
                
            }
            // ! last
            
        }
        // loop over headers
            
        // end row
        fwrite( $this->file, "\r\n" );
        
    }
    private function addDataRows( $data ) {
        
        // loop over rows
        for( $i = 0; $i < count( $data['data'] ); $i++ ){
            
            // get row
            $row = $data['data'][$i];
            
            // create index
            $j = 0;
            
            // loop over row
            foreach( $row as $column  ){
            
                // add column
                fwrite( $this->file, $column );
        
                // ! last
                if( $j < count( $row ) - 1 ){

                    // add delimiter
                    fwrite( $this->file, $this->delimiter );

                }
                // ! last

            }
            // loop over row

            // end row
            fwrite( $this->file, "\r\n" );
            
        }
        // loop over rows
            
    }
    private function addTotals( $data ) {
        
        // no totals
        if( !isset( $data['addTotals'] ) ){
            
            // done
            return;
            
        }
        // no totals

        // seperate totals
        fwrite( $this->file, "\r\n\r\n" );
        
        // open totals
        fwrite( $this->file, "Totals: \r\n" );
        
        // loop over totals
        foreach( $data['totals'] as $total ){
            
            // wrtie total title
            fwrite( $this->file, $total['title'] );
                    
            // new seperator
            fwrite( $this->file, ": " );
        
            // wrtie total 
            fwrite( $this->file, $total['total'] );
                    
            // new line
            fwrite( $this->file, "\r\n" );
        
        }
        // loop over totals
        
    }
    private function openFile( ){

        // create file
        $this->file = fopen( $this->path . $this->fileName, "w" );    
        
    }    
    private function closeFile( ) {
        
        // close file
        fclose( $this->file );
        
    }
    private function getConfig() {
        
        $config = config::getExportConfig();
        $this->path = $config['path'];
        
    }
    private function debug( $message ){
        
        // debug on
        if( $this->debugOn ){
            
            // debug info
            $this->debugger->log( 'message', '      ' . $message );

        }
        
    }
    
}

