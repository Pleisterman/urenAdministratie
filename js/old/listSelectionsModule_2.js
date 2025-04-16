/* 
        @package        Pleisterman/MbAdmin
        function: 
                        controls selection of vehicles. 
                        controls the loads for open and
                        closed vehicles lists
                        An open vehicles list wil always be loaded and cashed 
                        Closed vehicles wil be loaded and cashed when needed
  
        Last revision:  11-02-2025
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items.contacts;
    
    // MODULE: listSelectionsModule( void ) void 
    nameSpace.listSelectionsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'ContentItemsVehiclesListSelectionsModule';   // string
        self.debugOn = false;                                       // boolean
        self.callback = null;                                       // function / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void
            
            // debug info
            self.debug( 'load' );
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            let data = { 
                'subject'           :   'vehicles',
                'what'              :   'lastUsed'
            };
            // done construct data object

            // ajax
            mbAdminApp.server.read( data, self.loadCallback );
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                
                // show error
                mbAdminApp.showCriticalError( result['criticalError'] );
                
                // end busy
                mbAdminApp.endBusyProcess();
                
                // error return
                return;
                
            }
            // done check critical errors

            // has callback
            if( self.callback ){
                
                // copy callback
                let callback = self.callback;
                
                // unset callback
                self.callback = null;
                
                // call callback
                callback( result['rows'] );
                
            }
            // done has callback
            
        // DONE FUNCTION: loadCallback( json: result ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call global debug
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
            
            // FUNCTION: load( function: callback ) void
            load :  function( callback ){
                
                // call internal
                self.load( callback );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: listSelectionsModule( void ) void 
    
})( mbAdminApp );
// done create module function
