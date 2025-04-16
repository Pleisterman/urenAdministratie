/*
    @package        Pleisterman/MbAdmin

    function:       Tries to get the element from given id 
                
                    Adds the function:
    
                        mbAdminApp.getElementById( string: id ) html element / null
                    
                    to the application

    Last revision:  29-01-2025
 
*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.service = mbAdminApp.service ? mbAdminApp.service : {};
            
    // MODULE: getElementModule( void ) named array
    mbAdminApp.service.getElementModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'GetElementModule';                   // string
        self.index = null;                                  // integer / null
        self.hideNames = true;                              // boolean
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to the application
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add get element function
            mbAdminApp.getElementById = self.getById;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getById = function( id ) {
        // FUNCTION: getById( string: id ) html element / null
            
            // get the element
            return document.getElementById( id );
            
        // DONE FUNCTION: getById( string: id ) html element / null
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
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: getElementModule( void ) named array 
    
})( mbAdminApp );
// done create module function


