/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the lists
  
        Last revision:  12-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};

    // MODULE: exportModule( void ) named array
    nameSpace.edit.exportModule = function( ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentEditExportModule';                    // string
        self.debugOn = false;                                       // boolean
        self.modules = {};                                          // named array
        self.items = null;                                          // module / null
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.export = function( items ) {
        // FUNCTION: export( module: items ) void  
            
            // debug info
            self.debug( 'export' );
            
            // remember items
            self.items = items;
            
            // get data
            let itemsData = self.items.getData();
            
            // create options
            let data = {
                'subject'   :   itemsData['name'],
                'data'      :   itemsData
            };
            // create options
            
            // ajax call
            mbAdminApp.server.export( data, self.exported );
                        
        // DONE FUNCTION: export( module: items ) void  
        };
        self.exported = function( result ) {
        // FUNCTION: exported( named array: result ) void
            
            // download
            self.download( result );
            
            // refresh edit
            mbAdminApp.callEvent( 'refreshEdit' );
           
        // DONE FUNCTION: exported( named array: result ) void  
        };
        self.download = function( result ) {
        // FUNCTION: download( named array: result ) void

            // file name ! exists
            if( !result['fileName'] ){

                // done
                return;
                                
            }
            // file name ! exists

            // create options
            let data = {
                'fileName'   :   result['fileName']
            };
            // create options
            
            // ajax call
            mbAdminApp.server.download( data, self.downloaded );
                        
        // DONE FUNCTION: download( named array: result ) void  
        };
        self.downloaded = function( result ) {
        // FUNCTION: downloaded( named array: result ) void

        // DONE FUNCTION: downloaded( named array: result ) void  
        };
        self.reset = function() {
        // FUNCTION: reset( void ) void

            // unset items
            self.items = null;
            
        // DONE FUNCTION: reset( void ) void
        };
                self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call app debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        
        // DONE PRIVATE
        
        // PUBLIC
        return {
            
            // FUNCTION: export( module: items ) void    
            export : function( items ){
                
                // call internal
                self.export( items );
                
            },
            // FUNCTION: reset( ) void    
            reset : function( ){
                
                // call internal
                self.reset( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: exportModule( void ) named array  
    
})( mbAdminApp );
// done create module function
