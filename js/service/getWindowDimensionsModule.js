/*
    @package        Pleisterman/MbAdmin
    function:   Adds the function: 

                mbAdminApp.getWindowDimensions: returns window dimensions.

                to the application

    Last revision: 10-12-2022
 
*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.service = mbAdminApp.service ? mbAdminApp.service : {};
            
    // MODULE: getWindowDimensionsModule( void ) named array
    mbAdminApp.service.getWindowDimensionsModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'GetWindowDimensionsModule';          // string
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
        
            // add get ui id function
            mbAdminApp.getWindowDimensions = self.getWindowDimensions;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getWindowDimensions = function( ) {
        // FUNCTION: getWindowDimensions( void ) named arrsy

            // create dimensions
            let dimensions = {
                'width'     :   window.innerWidth,
                'height'    :   window.innerHeight
            };
            // create dimensions

            // return result
            return dimensions;

        // DONE FUNCTION: getWindowDimensions( void ) named arrsy
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
    // DONE MODULE: getWindowDimensionsModule( void ) named array 
    
})( mbAdminApp );
// done create module function


