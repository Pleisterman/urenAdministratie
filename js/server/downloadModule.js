/*
        @package        Pleisterman/MbAdmin
  
        function:       relais read functions to the server
                        Adds the functions: 

                            mbAdminApp.read ( reads data from the server ) 

                        to the application

        Last revision:  06-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.server = nameSpace.server ? nameSpace.server : {};
    
    // MODULE: crudModule( void ) named array 
    nameSpace.server.downloadModule = function( ) {
        
        // PRIVATE:
    
        // MEMBERS
        let self = this;                        // object
        self.MODULE = 'DownloadModule';         // string
        self.debugOn = false;                   // boolean
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add down load
            mbAdminApp.server.download = self.download;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.download = function( data, callback ) {
        // FUNCTION export( named array: data, function: callback ) void
        
            // create url
            let url = mbAdminApp.options.apiDir + 'download.php';
                
            // admin connect
            self.post( url, data, callback );
        
        // FUNCTION export( named array: data, function: callback ) void
        };
        self.post = function( url, data, callback ) {
        // FUNCTION post( string: url, named array: data, function: callback ) void

            // create request
            let request = new XMLHttpRequest();
            
            // open 
            request.open('POST', url, true );
            
            // set response type
            request.responseType = 'arraybuffer';
            
            // set on load
            request.onload = function () {
                
                // staus 200
                if ( this.status === 200 ) {
                    
                    // get file name
                    let fileName = self.getFileName( request );
                                        
                    // get content type
                    let type = request.getResponseHeader('Content-Type');

                    // create blob
                    let blob = new Blob( [this.response], { type: type } );
                    
                    // ie / else 
                    if ( typeof window.navigator.msSaveBlob !== 'undefined' ) {
                       
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob( blob, fileName );
                        
                    } 
                    else {
                        
                        // get url
                        let URL = window.URL || window.webkitURL;
                        
                        // get download url
                        let downloadUrl = URL.createObjectURL( blob );

                        // file name exists
                        if( fileName ) {
                            
                            // use HTML5 a[download] attribute to specify filename
                            let a = document.createElement( "a" );
                            
                            // safari doesn't support this yet
                            if( typeof a.download === 'undefined' ) {
                                
                                // open doc
                                window.location = downloadUrl;
                                
                            } 
                            else {
                                
                                a.href = downloadUrl;
                                a.download = fileName;
                                document.body.appendChild(a);
                                a.click();
                                
                            }
                            // safari doesn't support this yet
                            
                        } 
                        else {
                            
                            window.location = downloadUrl;
                            
                        }
                        // file name exists

                        // set time out
                        setTimeout(function () { URL.revokeObjectURL( downloadUrl ); }, 100); // cleanup
                        
                    }
                    // ie / else 
                    
                }
                // done staus 200
                
            };
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send( 'fileName=' + data['fileName'] );
            
            
        // FUNCTION post( string: url, named array: data, function: callback ) void
        };
        self.getFileName = function( request ) {
        // FUNCTION getFileName( XMLHttpRequest: request ) void
        
            // create file name
            let fileName = "";
            
            // get disposition
            let disposition = request.getResponseHeader('Content-Disposition');
            
            // is attachment
            if ( disposition && disposition.indexOf('attachment') !== -1 ) {
                
                // create regex
                let regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                
                // find matches
                var matches = regex.exec( disposition );
                
                // matched
                if ( matches !== null && matches[1] ){
                    
                    // replace 
                    fileName = matches[1].replace(/['"]/g, '');
                     
                 }
                // matched
                
            }
            // is attachment
                
            // return result
            return fileName;
            
        // FUNCTION getFileName( XMLHttpRequest: request ) void
        };      
        self.debug = function( message ) {
        // FUNCTION debug( string: message ) void
        
            // debug is on
            if( self.debugOn ) {
                
                // call app debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug is on
            
        // FUNCTION debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        
        // DONE PRIVATE
            
        // PUBLIC
        return {
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: adminConnectionModule( void ) named array 
    
})( mbAdminApp );
// done create module function
