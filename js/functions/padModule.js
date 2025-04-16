/*
    @package        Pleisterman/MbAdmin

    function:       adds a padding function
                    to the application

    Last revision:  18-03-2025

*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.functions = mbAdminApp.functions ? mbAdminApp.functions : {};
            
    // MODULE: padModule( void ) named array
    mbAdminApp.functions.padModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'FunctionsPadModule';                 // string
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
        
            // add extend function
            mbAdminApp.pad = self.pad;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.pad = function( string, padWith, padCount ) {
        // FUNCTION: pad( string: string, string: padWith, integer: padCount ) string

            // add padding to a string
            string = string.toString();
            
            // string lenght < pad count
            while( string.length < padCount ){
                
                // add padding
                string = padWith + string;
                
            }
            // done string lenght < pad count
            
            // return result
            return string;
            
        // DONE FUNCTION: pad( string: string, string: padWith, integer: padCount ) string
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
    // DONE MODULE: extendModule( void ) named array 
    
})( mbAdminApp );
// done create module function


