<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api\export;

use php\config\config;

class html {

    private $debugOn = true;
    private $debugger;
    private $path = null;
    private $file = null;
    private $fileExtension = '.html';
    private $fileName = null;
    private $dataColumnStyle = 'style=padding-right:10px;';
    private $dataHeaderStyle = 'style=padding-right:10px;';
    public function __construct( $debugger ) {

        // set debugger
        $this->debugger = $debugger;
        
        // get config
        $this->getConfig();
        
    }
    public function create( $data ) {
 
        // get file name
        $this->getFileName( $data );
        
        // open file
        $this->openFile( );
        
        // create html
        $this->createHtml( $data );
        
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
    private function createHtml( $data ) {

        // open html
        fwrite( $this->file, '<html>' . "\r\n" );
        
        // add html header
        $this->addHtmlHeader( $data );
        
        // add body
        $this->addBody( $data );

        // close html
        fwrite( $this->file, '</html>' . "\r\n" );
        
    }        
    private function addHtmlHeader( $data ) {
        
        // open header
        fwrite( $this->file, '<head>' . "\r\n" );
        
        // add title
        fwrite( $this->file, '<title>' . $data['title'] . '</title>' . "\r\n" );
        
        // close header
        fwrite( $this->file, '</head>' . "\r\n" );
        
    }
    private function addBody( $data ) {
        
        // open body
        fwrite( $this->file, '<body>' . "\r\n" );
        
        // add data
        $this->addData( $data );
        
        // add totals
        $this->addTotals( $data );
        
        // close body
        fwrite( $this->file, '</body>' . "\r\n" );
        
    }
    private function addData( $data ) {
        
        // open data
        fwrite( $this->file, '<table>' . "\r\n" );
        
        // add data headers
        $this->addDataHeaders( $data );
        
        // add data rows
        $this->addDataRows( $data );
        
        // close data
        fwrite( $this->file, '</table>' . "\r\n" );
        
    }
    private function addDataHeaders( $data ) {
        
        // no headers
        if( !isset( $data['addHeaders'] ) ){
            
            // done
            return;
            
        }
        // no headers

        // open header row
        fwrite( $this->file, '<tr>' . "\r\n" );

        // loop over headers
        foreach ( $data['headers'] as $header ) {
            
            // open header detail
            fwrite( $this->file, '<td ' . $this->dataHeaderStyle  . '>' . "\r\n" );

            // add header
            fwrite( $this->file, $header . "\r\n" );
            
            // close header detail
            fwrite( $this->file, '</td>' . "\r\n" );
        }
        // loop over headers
            
        // close header row
        fwrite( $this->file, '</tr>' . "\r\n" );
        
    }
    private function addDataRows( $data ) {
        
        // loop over rows
        foreach ( $data['data'] as $row ) {
            
            // open row
            fwrite( $this->file, '<tr>' . "\r\n" );

            // loop over row
            foreach ( $row as $column ) {
            
                // open header detail
                fwrite( $this->file, '<td ' . $this->dataColumnStyle  . '>' . "\r\n" );

                // add column
                fwrite( $this->file, $column . "\r\n" );

                // close header detail
                fwrite( $this->file, '</td>' . "\r\n" );
        
            }
            // loop over row
            
            // close row
            fwrite( $this->file, '</tr>' . "\r\n" );
            
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

        // open totals
        fwrite( $this->file, '<table>' . "\r\n" );
        
        $this->debug( 'totals: ' . json_encode($data['totals'] ) );
        
        // loop over totals
        foreach ( $data['totals'] as $total ) {
            
            // open row
            fwrite( $this->file, '<tr>' . "\r\n" );
            
            // open title
            fwrite( $this->file, '<td>' . "\r\n" );

            // write title
            fwrite( $this->file, $total['title'] . "\r\n" );

            // close title
            fwrite( $this->file, '</td>' . "\r\n" );

            // open total
            fwrite( $this->file, '<td>' . "\r\n" );

            // write total
            fwrite( $this->file, $total['total'] . "\r\n" );

            // close total
            fwrite( $this->file, '</td>' . "\r\n" );

            // close row
            fwrite( $this->file, '</tr>' . "\r\n" );
            
        }        
        // loop over totals
        
        // close totals
        fwrite( $this->file, '</table>' . "\r\n" );
        
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

