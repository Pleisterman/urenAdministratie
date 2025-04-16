/*
        @package        Pleisterman/MbAdmin
  
        function:       handles the data of the list
  
        Last revision:  18-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list;
    
    // create name space
    nameSpace.data = nameSpace.data ? nameSpace.data : {};
    
    // MODULE: dataModule( named array: listOptions, 
    //                     named array: callbacks ) named array 
    nameSpace.data.dataModule = function( listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesListsDataModule';        // string
        self.debugOn = true;                                   // boolean
        self.listOptions = listOptions;                         // named array
        self.callbacks = callbacks;                             // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.loadData = function() {
        // FUNCTION: loadData( void ) void
            
            // debug info
            self.debug( 'loadData' );
            
            // show busy
            mbAdminApp.startBusyProces();
            
            // get list type
            let listType = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListType' );
            
            // get offset
            let offset = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListSelectionOffset' );
            
            // create data
            let data = { 
                'subject'           :   self.listOptions['subject'],
                'what'              :   'list',
                'selection' : {
                    'listType'      :   listType,
                    'offset'        :   offset
                }
            };
            // create data
            
            // ajax call
            mbAdminApp.server.read( data, self.dataLoaded );
            
        // DONE FUNCTION: loadData( void ) void
        };
        self.dataLoaded = function( result ) {
        // FUNCTION: dataLoaded( named array: result ) void 

            self.debug( JSON.stringify( result ) );

            // hide busy
            mbAdminApp.endBusyProces();
            
            let rows = result && result['rows'] ? result['rows'] : {};
            
            // call callback
            self.callbacks['dataLoaded']( rows );
                         
        // DONE FUNCTION: dataLoaded( named array: result ) void 
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // unset list options
            self.listOptions = null;
            
        // DONE FUNCTION: destruct( void ) void
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
            
            // FUNCTION: loadData( void ) void    
            loadData : function( ){
                
                // call internal
                self.loadData( );
                
            }            
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dataModule( named array: listOption, 
    //                          named array: callbackss ) named array  
    
})( mbAdminApp );
// done create module function
