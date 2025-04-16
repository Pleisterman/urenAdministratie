/*
        @package        Pleisterman/MbAdmin
        function:       main  javascript controller for index route
        Last revision:  29-01-2025
 
*/

// create module function
((mbAdminApp) => {

    // MODULE: mainModule( void ) named array 
    mbAdminApp.mainModule = function( ) {
    
        // PRIVATE:

        // MEMBERS
        let self = this;                    // object
        self.moduleName = 'MainModule';     // string
        self.modules = {};                  // named array
    
        // DONE MEMBERS     

        // FUNCTIONS
        self.start = function() {
        // FUNCTION: start( void ) void

            // create modules
            self.createModules();

            // debug message
            mbAdminApp.debug( 'All is well' );        

        // DONE FUNCTION: start( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void

            // create event manager module
            self.modules.eventManager = new mbAdminApp.service.eventManagerModule( );

            // create settings
            self.createSettingsModules();

            // create user options
            self.createUserModules();

            // create functions
            self.createFunctionsModules();
            
            // create services
            self.createServicesModules();
            
            // create server
            self.createServerModules();
            
            // add app values module
            self.modules.appValues = new mbAdminApp.settings.appValuesModule();
        
            // add css
            self.createCssModules();
        
            // add dialogs
            self.createDialogsModules();
            
            // add content modules
            self.createContentModules();            

            // add tools
            self.createToolsModules();
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.createSettingsModules = function() {
        // FUNCTION: createSettingsModules( void ) void

            // add settings module
            self.modules.settings = new mbAdminApp.settings.settingsModule();
        
            // add colors module
            self.modules.colors = new mbAdminApp.settings.colorsModule();
        
        // DONE FUNCTION: createSettingsModules( void ) void
        };
        self.createUserModules = function() {
        // FUNCTION: createUserModules( void ) void

            // add options module
            self.modules.userOptions = new mbAdminApp.user.optionsModule();
        
        // DONE FUNCTION: createUserModules( void ) void
        };
        self.createFunctionsModules = function() {
        // FUNCTION: createFunctionsModules( void ) void

            // add get week number
            self.modules.getWeekNumber = new mbAdminApp.functions.dateModule();        
        
            // add get json value
            self.modules.getJsonValue = new mbAdminApp.functions.jsonValueModule();        
        
            // create extend module
            self.modules.extend = new mbAdminApp.functions.extendModule( );

            // create pad module
            self.modules.pad = new mbAdminApp.functions.padModule( );

        // DONE FUNCTION: createFunctionsModules( void ) void
        };
        self.createServicesModules = function() {
        // FUNCTION: createServicesModules( void ) void

            // get debug options
            let debugOptions = mbAdminApp.options && mbAdminApp.options.debug ?
                               mbAdminApp.options.debug :
                               {};
            // get debug options

            // create debug module
            self.modules.debug = new mbAdminApp.service.debugModule( debugOptions );

            // create get ui id module
            self.modules.getUiId = new mbAdminApp.service.getUiIdModule( );

            // create set style module
            self.modules.setStyle = new mbAdminApp.service.setStyleModule( );
            
            // create get style module
            self.modules.getStyle = new mbAdminApp.service.getStyleModule( );
            
            // create html generator module
            self.modules.htmlGenerator = new mbAdminApp.service.htmlGeneratorModule( );

            // create get element module
            self.modules.getElement = new mbAdminApp.service.getElementModule( );
            
            // create get window dimensions module
            self.modules.getWindowDimensions = new mbAdminApp.service.getWindowDimensionsModule( );
            
            // create values module
            self.modules.values = new mbAdminApp.service.valuesModule( );
            
            // create validate module
            self.modules.validate = new mbAdminApp.service.validateModule( );
            
            // create busy screen module
            self.modules.busyScreen = new mbAdminApp.service.busyScreenModule( );

        // DONE FUNCTION: createServicesModules( void ) void
        };
        self.createServerModules = function() {
        // FUNCTION: createServerModules( void ) void

            // create crud module
            self.modules.crud = new mbAdminApp.server.crudModule( );

            // create download module
            self.modules.download = new mbAdminApp.server.downloadModule( );

        // DONE FUNCTION: createServerModules( void ) void
        };
        self.createToolsModules = function() {
        // FUNCTION: createToolsModules( void ) void

            // create hovertext
            self.modules.hoverText = new mbAdminApp.tools.hoverTextModule( );  
            
            // create date picker
            self.modules.datePicker = new mbAdminApp.tools.datePicker.datePickerModule( );  
            
        // DONE FUNCTION: createToolsModules( void ) void
        };
        self.createCssModules = function() {
        // FUNCTION: createCssModules( void ) void
        
            // get css module
            let cssModule = mbAdminApp.content.cssModule;

            // create css module
            self.modules.css = new cssModule( );
            
        // DONE FUNCTION: createCssModules( void ) void
        };
        self.createDialogsModules = function() {
        // FUNCTION: createDialogsModules( void ) void
        
            // get dialog module
            let dialogsModule = mbAdminApp.dialogs.dialogsModule;

            // create dialogs module
            self.modules.dialogsModule = new dialogsModule( );
            
        // DONE FUNCTION: createDialogsModules( void ) void
        };
        self.createContentModules = function() {
        // FUNCTION: createContentModules( void ) void
        
            // get layout module
            let layoutModule = mbAdminApp.content.layoutModule;

            // create layout module
            self.modules.layout = new layoutModule( mbAdminApp );
            
        // DONE FUNCTION: createContentModules( void ) void
        };
        // DONE FUNCTIONS
        
        // DONE PRIVATE

        // PUBLIC
        return {
            
            // FUNCTION: start( void ) void    
            start : function( ){
                
                // call internal
                self.start( );
                
            }
            
        };
        // DONE PUBLIC
                
    };
    // DONE MODULE: mainModule( void ) named array
    
})( mbAdminApp );
// done create module function
 
