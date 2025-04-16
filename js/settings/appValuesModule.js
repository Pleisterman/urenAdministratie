/*
        @package        Pleisterman/MbAdmin
        function:       contains app options
        Last revision:  07-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.settings = nameSpace.settings ? nameSpace.settings : {};
    
    // MODULE: appValuesModule( void ) named array
    nameSpace.settings.appValuesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object
        self.MODULE = 'AppValuesModule';                    // string
        self.debugOn = false;                               // boolean
        self.values = [                                     // named array
            {                                               // named array
                "groupName" :   "navigation",               // string
                "valueName" :   "menu",                     // string
                "value"     :   ""                          // var
            },                                              // done named array
            {                                               // named array
                "groupName" :   "navigation",               // string
                "valueName" :   "menuName",                 // string
                "value"     :   ""                          // var
            },                                              // done named array
            {                                               // named array
                "groupName" :   "divider",                  // string
                "valueName" :   "position",                 // string
                "value"     :   parseInt( mbAdminApp.options.user['leftPanelDividerPosition'] ) // integer
            },                                              // done named array
            {                                               // named array
                "groupName" :   "divider",                  // string
                "valueName" :   "collapsed",                // string
                "value"     :   false                       // boolean
            },                                              // done named array
            {                                               // named array
                "groupName" :   "listOrderUp",              // string
                "valueName" :   "listId",                   // string
                "value"     :   null                        // string / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "edit",                     // string
                "valueName" :   "messageId",                // string
                "value"     :   null                        // string / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "data",                     // string
                "valueName" :   "dataObject",               // string
                "value"     :   null                        // named array / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "data",                     // string
                "valueName" :   "id",                       // string
                "value"     :   null                        // string / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "data",                     // string
                "valueName" :   "headerText",               // string
                "value"     :   null                        // string / null
            },                                              // done named array    
            {                                               // named array 
                "groupName" :   "data",                     // boolean
                "valueName" :   "changed",                  // string
                "value"     :   false                       // boolean
            },                                              // done named array
            {                                               // named array
                "groupName" :   "data",                     // string
                "valueName" :   "hasFocus",                 // string
                "value"     :   false                       // boolean
            },                                              // done named array
            {                                               // named array
                "groupName" :   "data",                     // string
                "valueName" :   "hasError",                 // string
                "value"     :   false                       // boolean
            },                                              // done named array
            {                                               // named array
                "groupName" :   "select",                   // string
                "valueName" :   "vatSelectModule",          // string
                "value"     :   null                        // module / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "select",                   // string
                "valueName" :   "projectsSelectModule",     // string
                "value"     :   null                        // module / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "select",                   // string
                "valueName" :   "vehiclesSelectModule",     // string
                "value"     :   null                        // module / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "select",                   // string
                "valueName" :   "usedPlacesSelectModule",   // string
                "value"     :   null                        // module / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "select",                   // string
                "valueName" :   "contactsSelectModule",     // string
                "value"     :   null                        // module / null
            },                                              // done named array
            {                                               // named array
                "groupName" :   "select",                   // string
                "valueName" :   "documentsSelectModule",    // string
                "value"     :   null                        // module / null
            }                                               // done named array
        ];                                                  // done named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add values
            self.addValues();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addValues = function() {
        // FUNCTION addValues( void ) void
        
            // debug info
            self.debug( 'addValues' );

            // loop over values
            for( var i = 0; i < self.values.length; i++ ) {
                
                // add the value to the app
                mbAdminApp.addValue( self.values[i]["valueName"], self.values[i]["groupName"], self.values[i]["value"] );
                
            }
            // done loop over values
            
        // DONE FUNCTION: addValues( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call global debug
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
    // DONE MODULE: appValuesModule( void ) named array
    
})( mbAdminApp );
// done create module function
