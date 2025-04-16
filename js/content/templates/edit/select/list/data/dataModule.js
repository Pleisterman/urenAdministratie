/*
        @package        Pleisterman/MbAdmin
  
        function:       handles the data of the list
  
        Last revision:  20-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.edit.select.list;
    
    // create name space
    nameSpace.data = nameSpace.data ? nameSpace.data : {};
    
    // MODULE: dataModule( named array: itemOptions, 
    //                     named array: callbacks ) named array 
    nameSpace.data.dataModule = function( itemOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentTemplatesEditSelectListDataModule';   // string
        self.debugOn = true;                                        // boolean
        self.itemOptions = itemOptions;                             // named array
        self.callbacks = callbacks;                                 // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.loadData = function( ) {
        // FUNCTION: loadData( void ) void
            
            // debug info
            self.debug( 'loadData' );
            
            // show busy
            mbAdminApp.startBusyProces();
            
            // get list options
            let listOptions = self.itemOptions['listOptions'];
            
            // get list type
            let listType = mbAdminApp.getUserOption( listOptions['subject'] + 'ListType' );
            
            // get offset
            let offset = mbAdminApp.getUserOption( listOptions['subject'] + 'ListSelectionOffset' );
            
            // create data
            let data = { 
                'subject'           :   listOptions['subject'],
                'what'              :   'list',
                'selection' : {
                    'selectedId'    :   self.itemOptions['selectedId'],
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
            
            // get rows
            let rows = result && result['rows'] ? result['rows'] : {};
            
            // call callback
            self.callbacks['dataLoaded']( rows );
                         
        // DONE FUNCTION: dataLoaded( named array: result ) void 
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // unset callbacks
            self.callbacks = null;
            
            // unset item options
            self.itemOptions = null;
            
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
                
            },           
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dataModule( named array: itemOptions, 
    //                          named array: callbackss ) named array  
    
})( mbAdminApp );
// done create module function
