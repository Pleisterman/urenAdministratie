/*
        @package        Pleisterman/MbAdmin
  
        function:       controls export of rides data 
  
        Last revision:  09-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.items.export;
        
    // MODULE: vehiclesDataObjectModule( void ) named array
    nameSpace.vehiclesDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'ContentItemsExportVehiclesDataObjectModule'; // string
        self.debugOn = false;                                       // boolean
        self.dataObject = {                                         // named array
            'id'                :   'vehicles',                     // string
            'type'              :   'noDisplay'                     // string
        };                                                          // done named array
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
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
            
            // FUNCTION: getDataObject( void ) json: dataObject
            getDataObject : function(){
                
                // return result
                return self.dataObject;
                
            }   
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: VehiclesDataObjectModule( void ) named array
    
})( mbAdminApp );
// done create module function
