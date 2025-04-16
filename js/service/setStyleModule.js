/*
    @package        Pleisterman/MbAdmin

    function:       Sets the a style of an element

                    Adds the function:
                
                        mbAdminApp.setStyle( html element id: elementId, string: styleId, let value ) void
                    
                    to the application

    Last revision:  29-01-2025
 
*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.service = mbAdminApp.service ? mbAdminApp.service : {};
            
    // MODULE: setStyleModule( void ) named array
    mbAdminApp.service.setStyleModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'SetStyleModule';                     // string
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
            mbAdminApp.setStyle = self.setStyle;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.setStyle = function( elementId, styleId, value ) {
        // FUNCTION: setStyle( html element id: elementId, string: styleId, let value ) void
            
            // set style
            mbAdminApp.getElementById( elementId ).style[styleId] = value;
            
        // DONE FUNCTION: setStyle( html element id: elementId, string: styleId, let value ) void
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
    // DONE MODULE: setStyleModule( void ) named array 
    
})( mbAdminApp );
// done create module function


