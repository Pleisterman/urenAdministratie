/*
    @package        Pleisterman/MbAdmin

    function:       handels vat 
                    and handles the events
  
    Last revision:  09-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items;
    
    // create name space
    nameSpace.vat = nameSpace.vat ? nameSpace.vat : {};
    
    // MODULE: vatModule( void ) named array
    nameSpace.vat.vatModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.MODULE = 'ContentItemsVatModule';              // string
        self.debugOn = false;                               // boolean
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.setSelectModule = function( module ){
        // FUNCTION setSelectModule( module ) void

            // set select module
            self.selectModule = module;
            
        // DONE FUNCTION: setSelectModule( module ) void
        };
        self.load = function( callback ){
        // FUNCTION load( function: callback ) void

            // call the select module load
            self.selectModule.load( callback );
            
        // DONE FUNCTION: load( function: callback ) void
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
            
            load    :   function( callback ){
            // FUNCTION: load( function: callback ) void
            
                // call internal
                self.load( callback );
                
            },
            setSelectModule  :   function( module ){
            // FUNCTION: setSelectModule( module: module ) void
            
                // call internal
                self.setSelectModule( module );
                
            }
            
        };
        // DONE PUBLIC
    };
    // DONE MODULE: vatModule( void ) void
})( mbAdminApp );
// done create module function
