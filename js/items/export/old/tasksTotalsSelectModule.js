/*
        @package        Pleisterman/MbAdmin
  
        function:       controls the selectiom of totals for 
                        the export of tasks data 
  
        Last revision:  09-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.items.export;
        
    // MODULE: exportTasksTotalsSelectModule( named array: options ) named array
    mbAdminApp.exportTasksTotalsSelectModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'ContentItemsExportTasksTotalsSelectModule';  // string
        self.debugOn = false;                                       // boolean
        self.options = options;                                     // named array
        self.totals = [                                             // named array
            {                                                       // named array
                'id'            :   'noTotals',                     // string
                'text'          :   'No Totals'                     // string
            },                                                      // done named array
            {                                                       // named array
                'id'            :   'endTotal',                     // string
                'text'          :   'End Total'                     // string
            }                                                       // done named array
        ];                                                          // done named array
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( string: id, function: callback ) void
            
            // debug info
            self.debug( 'getSelectData id: ' + id );
            
            // create json: result
            let result = {
                'open' : {
                    'rows' : self.totals
                }
            };
            // done create json: result
            
            // call callback
            callback( result );   
            
        // END FUNCTION: getSelectData( string: id, function: callback ) void
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
            
            // FUNCTION: getSelectData( string: id, function: callback ) void
            getSelectData :  function( id, callback ){
                
                // call internal
                self.getSelectData( id, callback );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: tasksTotalsSelectModule( named array: options ) named array
    
})( mbAdminApp );
// done create module function
