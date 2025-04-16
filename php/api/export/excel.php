<?php
/*
        @package        Pleisterman/MbAdmin
        function:       test server connection
        Last revision:  29-01-2025
 
*/

namespace php\api\export;

use php\config\config;

class excel {

    private $debugOn = true;
    private $debugger;
    private $path = null;
    private $file = null;
    private $fileExtension = '.xls';
    private $fileName = null;
    private $styles = array(
        '@page' =>  array(
            'margin:1.0in .75in 1.0in .75in',
            'mso-header-margin:.5in',
            'mso-footer-margin:.5in'
        ),
        'table' => array(
            'mso-displayed-decimal-separator:"\."',
            'mso-displayed-thousand-separator:"\,"',
        ),
        '.style0' => array(
            'mso-number-format:General',
            'text-align:left',
            'vertical-align:bottom',
            'white-space:nowrap',
            'mso-rotate:0',
            'mso-background-source:auto',
            'mso-pattern:auto',
            'color:windowtext',
            'font-size:10.0pt',
            'font-weight:400',
            'font-style:normal',
            'text-decoration:none',
            'font-family:Arial',
            'mso-generic-font-family:auto',
            'mso-font-charset:0',
            'border:0.5pt solid',
            'mso-protection:locked visible',
            'mso-style-name:Normal',
            'mso-style-id:0'
        ),
        'td'  => array(
            'mso-style-parent:style0',
            'padding-top:1px',
            'padding-right:1px',
            'padding-left:1px',
            'mso-ignore:padding',
            'color:windowtext',
            'font-family:Arial'
        )
    );
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
        
        // create excel
        $this->createExcel( $data );
        
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
    private function createExcel( $data ) {

        // open
        fwrite( $this->file, '<html xmlns:o="urn:schemas-microsoft-com:office:office' );
        fwrite( $this->file, 'xmlns:x="urn:schemas-microsoft-com:office:excel' );
        fwrite( $this->file, 'xmlns="http://www.w3.org/TR/REC-html40">' . "\r\n" );
        // done open
        
        // add header
        $this->addHeader( $data );
        
        // add body
        $this->addBody( $data );
        
        // close 
        fwrite( $this->file, '</html>' );
        
    }        
    private function addHeader( $data ) {
        
        fwrite( $this->file, '<head>' . "\r\n" );
        fwrite( $this->file, '<meta http-equiv=Content-Type content="text/html; charset=us-ascii">' . "\r\n" );
        fwrite( $this->file, '<meta name=ProgId content=Excel.Sheet>' . "\r\n" );
        fwrite( $this->file, '<!--[if gte mso 9]><xml>' . "\r\n" );
        fwrite( $this->file, '<o:DocumentProperties>' . "\r\n" );
        fwrite( $this->file, '<o:LastAuthor>MbAdmin UrenAdministratie</o:LastAuthor>' . "\r\n" );
        fwrite( $this->file, '<o:LastSaved>' . $this->getTimeStamp() . '</o:LastSaved>' . "\r\n" );
        fwrite( $this->file, '<o:Version>1.0</o:Version>' . "\r\n" );
        fwrite( $this->file, '</o:DocumentProperties>' . "\r\n" );
        fwrite( $this->file, '<o:OfficeDocumentSettings>' . "\r\n" );
        fwrite( $this->file, '<o:DownloadComponents/>' . "\r\n" );
        fwrite( $this->file, '</o:OfficeDocumentSettings>' . "\r\n" );
        fwrite( $this->file, '</xml><![endif]-->' . "\r\n" );
        
        $this->addStyles();
        
        fwrite( $this->file, '<!--[if gte mso 9]><xml>' . "\r\n" );
        fwrite( $this->file, '<x:ExcelWorkbook>' . "\r\n" );
        fwrite( $this->file, '<x:ExcelWorksheets>' . "\r\n" );
        fwrite( $this->file, '<x:ExcelWorksheet>' . "\r\n" );
        fwrite( $this->file, '<x:Name>Pleisterman</x:Name>' . "\r\n" );
        fwrite( $this->file, '<x:WorksheetOptions>' . "\r\n" );
        fwrite( $this->file, '<x:Selected/>' . "\r\n" );
        fwrite( $this->file, '<x:ProtectContents>False</x:ProtectContents>' . "\r\n" );
        fwrite( $this->file, '<x:ProtectObjects>False</x:ProtectObjects>' . "\r\n" );
        fwrite( $this->file, '<x:ProtectScenarios>False</x:ProtectScenarios>' . "\r\n" );
        fwrite( $this->file, '</x:WorksheetOptions>' . "\r\n" );
        fwrite( $this->file, '</x:ExcelWorksheet>' . "\r\n" );
        fwrite( $this->file, '</x:ExcelWorksheets>' . "\r\n" );
        fwrite( $this->file, '<x:WindowHeight>10005</x:WindowHeight>' . "\r\n" );
        fwrite( $this->file, '<x:WindowWidth>10005</x:WindowWidth>' . "\r\n" );
        fwrite( $this->file, '<x:WindowTopX>120</x:WindowTopX>' . "\r\n" );
        fwrite( $this->file, '<x:WindowTopY>135</x:WindowTopY>' . "\r\n" );
        fwrite( $this->file, '<x:ProtectStructure>False</x:ProtectStructure>' . "\r\n" );
        fwrite( $this->file, '<x:ProtectWindows>False</x:ProtectWindows>' . "\r\n" );
        fwrite( $this->file, '</x:ExcelWorkbook>' . "\r\n" );
        fwrite( $this->file, '</xml><![endif]-->' . "\r\n" );
        fwrite( $this->file, '</head>' . "\r\n" );
        
    }
    private function addStyles(){
        
        fwrite( $this->file, '<style>' . "\r\n" );
        fwrite( $this->file, '<!--' . "\r\n" );
        fwrite( $this->file,  "\r\n" );

        foreach( $this->styles as $index => $values ){
            fwrite( $this->file, $index . '{' . "\r\n" );
            foreach( $values as $value ){
                fwrite( $this->file, $value . ';' . "\r\n" );
            }
            fwrite( $this->file, '}' . "\r\n" );
            fwrite( $this->file, "\r\n" );
        }    
        fwrite( $this->file, '-->' . "\r\n" );
        fwrite( $this->file, '</style>' . "\r\n" );
        
    }
    private function addBody( $data ) {
        
        // open body
        fwrite( $this->file, '<body link=blue vlink=purple>' );
        
        // add data
        $this->addData( $data );
        
        // add totals
        $this->addTotals( $data );
        
        // close body
        fwrite( $this->file, '</body>' );
        
    }
    private function addData( $data ) {
        
        fwrite( $this->file, '<table x:str border=0 cellpadding=0 cellspacing=0 style="border-collapse: collapse;table-layout:fixed;">' );
        
        // add data headers
        $this->addDataHeaders( $data );
        
        // add data
        $this->addDataRows( $data );
        
        // close data
        fwrite( $this->file, '</table>' );
        
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
            fwrite( $this->file, '<td style="font-weight:bold;">' . "\r\n" );

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
                fwrite( $this->file, '<td>' . "\r\n" );

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
        
            // open row
            fwrite( $this->file, '<tr><td>' . "\r\n" );
            
            // open row
            fwrite( $this->file, 'Totals' . "\r\n" );
            
            // open title
            fwrite( $this->file, '</td><td></td></tr>' . "\r\n" );

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
    private function getTimeStamp(){
        
        // create date time
        $now = new \DateTime( 'now' );
        
        // return result
        return $now->format( 'YmdHis' );        
        
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

