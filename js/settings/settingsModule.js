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
    nameSpace.settings.settingsModule = function( ) {
        
        
        // private
        let self = this;                            // object
        self.debugOn = true;                        // boolean
        self.MODULE = 'SiteSettingsModule';         // string
        self.settings = {                           // named array
            "keyCodes" : {                          // named array
                    'tab'           :   9,          // integer 
                    'space'         :   32,         // integer
                    'enter'         :   13,         // integer
                    'escape'        :   27,         // integer
                    'arrowUp'       :   38,         // integer
                    'arrowDown'     :   40,         // integer
                    'arrowLeft'     :   37,         // integer
                    'arrowRight'    :   39          // integer
            },                                      // done named array
            'zIndexes' : {                          // named array
                'layout'            :   1,          // integer
                "mainOverlay"       :   232,        // integer
                "topOverlay"        :   242,        // integer
                "dragArea"          :   140,        // integer
                "hoverText"         :   600,        // integer
                "busyScreen"        :   800,        // integer
                "messages"          :   900         // integer
            },                                      // done named array
            "dayNames" : {                          // named array
                "short" : 'Mo,Th,We,Th,Fr,Sa,Su'    // string    
            },                                      // done named array
            "monthNames" : {                        // named array
                "long"  : 'Januari,Februari,March,April,Mai,June,July,August,September,Oktober,November,December', // string    
                "short" : 'Jan,Feb,Mar,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dec' // string    
            },                                      // done named array
            "leftPanel" : {                         // named array
                "minimumWidth"      : 400           // integer
            },                                      // done named array
        };
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
            mbAdminApp.getSetting = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.get = function( setting ) {
        // FUNCTION get( string: setting ) var
        
            // setting exists
            if( self.settings[setting] !== undefined ){
                
                // return result
                return self.settings[setting];
                
            }
            // setting exists
            
            // debug info
            self.debug( 'error setting not found: ' +  setting );
            
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
    // DONE MODULE: settingsModule( void ) named array 
    
})( mbAdminApp );
// done create module function


