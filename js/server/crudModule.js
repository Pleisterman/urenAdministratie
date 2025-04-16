/*
        @package        Pleisterman/MbAdmin
  
        function:       relais read functions to the server
                        Adds the functions: 

                            mbAdminApp.read ( reads data from the server ) 

                        to the application

        Last revision:  02-04-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.server = nameSpace.server ? nameSpace.server : {};
    
    // MODULE: crudModule( void ) named array 
    nameSpace.server.crudModule = function( ) {
        
        // PRIVATE:
    
        // MEMBERS
        let self = this;                        // object
        self.MODULE = 'CrudModule';             // string
        self.debugOn = false;                   // boolean
        self.modules = {};                      // named array
        self.procesId = 0;                      // integer
        self.processes = {};                    // named array
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
        
            // add read
            mbAdminApp.server.read = self.read;
            
            // add update
            mbAdminApp.server.update = self.update;
            
            // add insert
            mbAdminApp.server.insert = self.insert;
            
            // add delete
            mbAdminApp.server.delete = self.delete;
            
            // add export
            mbAdminApp.server.export = self.export;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.read = function( data, callback ) {
        // FUNCTION read( named array: data, function: callback ) void
        
            // create url
            let url = mbAdminApp.options.apiDir + 'read.php';
                
            // admin connect
            self.post( url, data, callback );
        
        // FUNCTION read( named array: data, function: callback ) void
        };
        self.update = function( data, callback ) {
        // FUNCTION update( named array: data, function: callback ) void
        
            // create url
            let url = mbAdminApp.options.apiDir + 'update.php';
                
            // admin connect
            self.post( url, data, callback );
        
        // FUNCTION update( named array: data, function: callback ) void
        };
        self.insert = function( data, callback ) {
        // FUNCTION insert( named array: data, function: callback ) void
        
            // create url
            let url = mbAdminApp.options.apiDir + 'insert.php';
                
            // admin connect
            self.post( url, data, callback );
        
        // FUNCTION insert( named array: data, function: callback ) void
        };
        self.delete = function( data, callback ) {
        // FUNCTION delete( named array: data, function: callback ) void
        
            // create url
            let url = mbAdminApp.options.apiDir + 'delete.php';
                
            // admin connect
            self.post( url, data, callback );
        
        // FUNCTION delete( named array: data, function: callback ) void
        };
        self.export = function( data, callback ) {
        // FUNCTION export( named array: data, function: callback ) void
        
            // create url
            let url = mbAdminApp.options.apiDir + 'export.php';
                
            // admin connect
            self.post( url, data, callback );
        
        // FUNCTION export( named array: data, function: callback ) void
        };
        self.post = function( url, data, callback ) {
        // FUNCTION post( string: url, named array: data, function: callback ) void

            // create proces
            let proces = self.createProces( url, data, callback );
            
            // open request
            proces['requestObject'].open( 'POST', url );
            
            // set type
            proces['requestObject'].setRequestHeader("Content-Type", "application/json");
            
            // add xml http request header
            proces['requestObject'].setRequestHeader("X-Requested-With", "XMLHttpRequest");
            
            // add data
            proces['requestObject'].send( JSON.stringify( data ) );
            
        // FUNCTION post( string: url, named array: data, function: callback ) void
        };
        self.succes = function( result ) {
        // FUNCTION succes( named array: result ) void
            
            // debug info
            self.debug( 'succes' );

            // get response
            let response = self.getResponse( this );
            
            // response ! found
            if( !response ){
                
                // done
                return;
                
            }
            // response ! found

            // remove proces
            let callback = self.removeProces( response['procesId'] );

            
            // ! callback
            if( !callback ){
                
                // done
                return;
                
            }
            // ! callback

            // call callback
            callback( response['result'] );

        // FUNCTION succes( named array: result ) void
        };
        self.getResponse = function( request ) {
        // FUNCTION getResponse( XMLHttpRequest: request ) named array / null
            
            // create response
            let response = null;
            
            // try
            try {
                    
                // get response 
                response = JSON.parse( request.responseText );
                    
            }
            catch( exception ) {
                    
                // create options
                let options = {
                    'title'         :   'Connection Error.',
                    'error'         :   'Response text: ' + request.responseText,
                    'buttons'       :   {
                        'ok'        : {} 
                    }
                };
                // create options

                // show message
                mbAdminApp.showMessageDialog( options );

                // done with error
                return null;
                    
            }
            // try
                            
            // validate response
            if( !self.validateResponse( response ) ){
                
                // done with error
                return null;
                
            }
            // validate response
            
            // return result
            return response;

        // FUNCTION getResponse( XMLHttpRequest: request ) named array / null
        };
        self.validateResponse = function( response ) {
        // FUNCTION validateResponse( named array: response ) void
            
            // procesId not defined
            if( response['procesId'] === undefined ){

                // get response 
                let text = 'ProcesId ! set. <br><br>';

                // get response 
                text += JSON.stringify( response.result );
                    
                // create options
                let options = {
                    'title'         :   'Connection Error.',
                    'error'         :   text,
                    'buttons'       :   {
                        'ok'        : {} 
                    }
                };
                // create options

                // show message
                mbAdminApp.showMessageDialog( options );


                // return invalid
                return false;

            }
            // procesId not defined
            
            // return valid
            return true;
            
        // FUNCTION validateResponse( named array: response ) void
        };
        self.createProces = function( url, data, callback ) {
        // FUNCTION createProces( string: url, named array: data, function: callback ) named array
            
            // add procesId to data
            data['procesId'] = self.procesId;
                
            // debug info
            self.debug( 'new post procesId: ' + data['procesId']  + ' url: ' + url + ' subject: ' + data['subject'] );
            
            // create a process
            let proces = {  'id'            : self.procesId,
                            'url'           : url,
                            'data'          : data,
                            'callback'      : callback 
                        };
            // done create a process
            
            // increment procesId
            self.procesId++;
            
            // add the proces to the list
            self.processes[proces['id']] = proces;
            
            // create request object
            proces['requestObject'] = new XMLHttpRequest();

            // add events
            proces['requestObject'].addEventListener( "load", self.succes );
            proces['requestObject'].addEventListener( "progress", self.showProgress );
            proces['requestObject'].addEventListener( "error", self.handleErrors );
            proces['requestObject'].addEventListener( "abort", self.handleErrors );
            // add events
            
            // return result
            return proces;
            
        // FUNCTION createProces( string: url, named array: data, function: callback ) named array
        };
        self.removeProces = function( procesId ) {
        // FUNCTION removeProces( integer: procesId ) callback / undefined
            
            // get proces
            let proces = self.processes[procesId];
            
            // remove events
            proces['requestObject'].removeEventListener( "load", self.succes );
            proces['requestObject'].removeEventListener( "progress", self.showProgress );
            proces['requestObject'].removeEventListener( "error", self.handleErrors );
            proces['requestObject'].removeEventListener( "abort", self.handleErrors );
            // remove events
            
            // delete request object
            delete proces['requestObject'];
            
            // get callback
            let callback = proces['callback'];
            
            // remove proces
            delete self.processes[procesId];

            // return callback
            return callback;
            
        // FUNCTION removeProces( integer: procesId ) callback / undefined
        };
        self.handleErrors = function( jqXHR, textStatus, errorThrown ) {
        // FUNCTION handleErrors( response: jqXHR, string: textStatus, string: errorThrown ) void
            
        // FUNCTION handleErrors( response: jqXHR, string: textStatus, string: errorThrown ) void
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
