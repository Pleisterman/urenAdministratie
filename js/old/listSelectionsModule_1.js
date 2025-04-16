/* 
        @package        Pleisterman/MbAdmin
        function: 
                        controls selection of rides. 
                        controls the loads for open and
                        closed rides lists
                        An open rides list wil always be loaded and cashed 
                        Closed rides wil be loaded and cashed when needed
  
        Last revision:  11-02-2025
*/

// create module function
( function( mbAdminApp ){
    
    // get name space
    let nameSpace = mbAdminApp.items.rides;
    
    // MODULE: listSelectionsModule( void ) named array
    nameSpace.listSelectionsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                        // object
        self.MODULE = 'ContentItemsRidesListSelectionsModule';  // string
        self.debugOn = false;                                   // boolean
        self.callback = null;                                   // function / null
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.loadList = function( listSelection, selection, callback ){
        // FUNCTION: loadList( string: listSelection, json: selection, function: callback ) void
        
           // debug info
            self.debug( 'load' );
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            let data = { 
                'subject'           :   'rides',
                'what'              :   listSelection,
                'selection'         :   selection
            };
            // done construct data object

            // AJAX: /mbAdminApp/read
            mbAdminApp.server.read( data, self.loadCallback );
            
        // DONE FUNCTION: loadList( string: listSelection, json: selection, function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) AJAX CALLBACK
            
            // check result
            if( self.hasCallbackErrors( result ) ){
                
                // done with error
                return;
                
            }
            // done check result

            // has callback
            if( self.callback ){
                
                // call the callback
                self.callback( result['rows'] );
                
                // unset callback
                self.callback = null;
                
            }
            // done has callback

        // DONE FUNCTION: loadCallback( json: result ) AJAX CALLBACK
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean

            // global check result
            if( mbAdminApp.hasAjaxResultErrors( result ) ){
                
                // done with error
                return;
                
            }
            // done global check result
            
            // done 
            return false;
            
        // DONE FUNCTION: hasCallbackErrors( json: result ) boolean
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
            
            // FUNCTION: loadList( string: listSelection, json: selection, function: callback ) void
            loadList :  function( listSelection, selection, callback ){
                
                // call internal
                self.loadList( listSelection, selection, callback );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: listSelectionsModule( void ) named array
    
})( mbAdminApp );
// done create module function
