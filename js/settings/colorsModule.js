/*
        @package        Pleisterman/MbAdmin
        function:       contains and reads settings 
                        adds the function 
                        
                        mbAdminApp.getSetting( string: setting ) 
                        
                        to the app.
        Last revision:  29-01-2025
 
*/

// create module function
( function( mbAdminApp ){
    
    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.settings = nameSpace.settings ? nameSpace.settings : {};
    
    // MODULE: settingsModule( void ) named array
    nameSpace.settings.colorsModule = function( ) {
        
        
        // private
        let self = this;                                                // object
        self.debugOn = false;                                           // boolean
        self.MODULE = 'SettingsColorsModule';                           // string
        self.colors = {                                                 // named array
            'dark' : {                                                  // named array
                'color'             :   'rgba( 100, 120, 35, 1 )',      // color
                'highlight'         :   'rgba( 210, 100, 15, 1 )',      // color
                'disabled'          :   'rgba( 128, 128, 128, 1 )',     // color
                'selected'          :   'rgba( 100, 120,  35, 1 )',     // color
                'transparent-50'    :   'rgba( 240, 160, 75, 0.5 )'     // color                
            },                                                          // done named array
            'darker' : {                                                // named array
                'color'             :   'rgba(  52,  55,  93, 1 )',     // color
                'highlight'         :   'rgba( 230, 140,  55, 1 )',     // color
                'disabled'          :   'rgba( 128, 128, 128, 1 )',     // color
                'selected'          :   'rgba( 252, 255, 193, 1 )',     // color
                'transparent-50'    :   'rgba( 200, 120,  35, 0.5 )'    // color                
            },                                                          // done named array    
            'darkest' : {                                               // named array
                'color'             :   'rgba( 110,  80,  15, 1 )',     // color
                'highlight'         :   'rgba( 230, 140,  55, 1 )',     // color
                'disabled'          :   'rgba( 128, 128, 128, 1 )',     // color
                'selected'          :   'rgba( 252, 255, 193, 1 )',     // color
                'transparent-50'    :   'rgba( 170, 100,  15, 0.5 )'    // color                
            },                                                          // done named array
            'light' : {                                                 // named array
                'color'             :   'rgba( 255, 232, 147, 1 )',     // color
                'highlight'         :   'rgba( 172, 236, 255, 1 )',     // color
                'disabled'          :   'rgba( 128, 128, 128, 1 )',     // color
                'selected'          :   'rgba( 252, 255, 193, 1 )',     // color
                'transparent-50'    :   'rgba( 255, 232, 147, 0.5 )'    // color                
            },                                                          // done named array
            'lighter' : {                                               // named array
                'color'             :   'rgba( 240, 160, 75, 1 )',      // color
                'highlight'         :   'rgba( 250, 180, 115, 1 )',     // color
                'disabled'          :   'rgba( 128, 128, 128, 1 )',     // color
                'selected'          :   'rgba( 252, 255, 193, 1 )',     // color
                'transparent-50'    :   'rgba( 240, 160, 75, 0.5 )'     // color                
            },                                                          // done named array
            'lightest' : {                                              // named array
                'color'             :   'rgba( 252, 255, 193, 1 )',     // color
                'highlight'         :   'rgba( 255, 232, 147, 1 )',     // color
                'disabled'          :   'rgba( 128, 128, 128, 1 )',     // color
                'selected'          :   'rgba( 235, 212, 117, 1 )',     // color
                'transparent-50'    :   'rgba( 252, 255, 193, 0.5 )'    // color                
            },                                                          // done named array
            'edit' : {                                                 // named array
                'color'             :   'rgba( 252, 252, 252, 1 )'      // color              
            },                                                          // done named array
            'error' : {                                                 // named array
                'color'             :   'rgba( 252, 100, 100, 1 )',     // color
                'light'             :   'rgba( 255, 200, 200, 1 )',     // color
                'dark'              :   'rgba( 255, 50, 50, 1 )'      // color              
            }                                                           // done named array
        };                                                              // done named array
        // DONE MEMBERS     
         
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add get setting
            mbAdminApp.getColor = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.get = function( color ) {
        // FUNCTION get( string: setting ) var
        
            // color exists
            if( self.colors[color] !== undefined ){
                
                // return result
                return self.colors[color];
                
            }
            // color exists
            
            // debug info
            self.debug( 'error color not found: ' +  color );
            
            // done with error
            return false;
            
        // DONE FUNCTION get( string: setting ) var
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
    // DONE MODULE: colorsModule( void ) named array 
    
})( mbAdminApp );
// done create module function


