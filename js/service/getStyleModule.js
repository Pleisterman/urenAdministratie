/*
    @package        Pleisterman/MbAdmin

    function:       Gets the a style of an element

                    Adds the function:
                
                        mbAdminApp.getStyle( html element id: elementId, string: styleId ) void
                    
                    to the application

    Last revision:  07-02-2025
 
*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.service = mbAdminApp.service ? mbAdminApp.service : {};
            
    // MODULE: getStyleModule( void ) named array
    mbAdminApp.service.getStyleModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'GetStyleModule';                     // string
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
            mbAdminApp.getStyle = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.get = function( elementId, styleId ) {
        // FUNCTION: get( html element id: elementId, string: styleId ) css / undefined
            
            // return style
            return mbAdminApp.getElementById( elementId ).style[styleId];
            
        // DONE FUNCTION: get( html element id: elementId, string: styleId ) css / undefined
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
    // DONE MODULE: getStyleModule( void ) named array 
    
})( mbAdminApp );
// done create module function


