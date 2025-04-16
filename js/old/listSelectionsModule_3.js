/* 
        @package        Pleisterman/MbAdmin
        function: 
                        controls selection of tasks. 
                        controls the loads for open and
                        closed tasks lists
                        An open tasks list wil always be loaded and cashed 
                        Closed tasks wil be loaded and cashed when needed
  
        Last revision:  11-02-2025
*/

// create module function
( function( mbAdminApp ){
    
    // get name space
    let nameSpace = mbAdminApp.items.tasks;
    
    // MODULE: listSelectionsModule( void ) named array    
    nameSpace.listSelectionsModule = function( ) {
    
        // PRIVATE:
        let self = this;                                        // object
        self.MODULE = 'ContentItemsTasksListSelectionsModule';  // string
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
        // FUNCTION: loadList( string: listSelection, string: selection, function: callback ) void
            
            // debug info
            self.debug( 'load list selection: ' +  listSelection + ' selection: ' + selection );
            
            // remember callback
            self.callback = callback;
            
            // construct options object
            let options = { 
                'subject'           :   'tasks',
                'what'              :   listSelection,
                'selection'         :   selection
            };
            // done construct options object

            // AJAX: /mbAdminApp/read
            mbAdminApp.server.read( options, self.loadCallback );
        
        // FUNCTION: FUNCTION: loadList( string: listSelection, string: selection, function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) AJAX CALLBACK
            
            // check critical errors
            if( result['criticalError'] ){
                
                // show error
                mbAdminApp.showCriticalError( result['criticalError'] );
                //
                // end busy proces
                mbAdminApp.endBusyProcess();
                
                // done with error
                return;
                
            }
            // done check critical errors

            // has callback
            if( self.callback ){
                
                // set projects rows
                self.callback( result['rows'] );
                
                // unset callback
                self.callback = null;
                
            }
            // done has callback

        // DONE FUNCTION: loadCallback( json: result ) AJAX CALLBACK
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug is on
            if( self.debugOn ) {
                
                // call global debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug is on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        
        // DONE PRIVATE
        
        // PUBLIC
        return {
            
            // FUNCTION: loadList( string id, selection array, callback ) void
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
