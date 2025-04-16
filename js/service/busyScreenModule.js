/*
    @package        Pleisterman/MbAdmin

    function:   this module controls the busyScreen for the application
                the busy screen is shown when the application is
                processing and user interaction is disabled
                the module keeps track of the number of processes called
                and will only clear when all processes are done

    Last revision: 06-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.service = nameSpace.service ? nameSpace.service : {};
    
    // MODULE: busyScreenModule( void ) named array 
    nameSpace.service.busyScreenModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object
        self.MODULE = 'BusyScreenModule';                   // string
        self.debugOn = false;                               // boolean
        self.containerOptions = {                           // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',                  // html element type 
            'zIndex'            :   mbAdminApp.getSetting( 'zIndexes' ).busyScreen, // css
            'text'              :   '',                     // string
            'display'           :   'none',                 // css
            'visible'           :   false,                  // boolean
            'position'          :   'absolute',             // css
            'top'               :   0,                      // css
            'left'              :   0,                      // css
            'width'             :   '100%',                 // css
            'height'            :   '100%',                 // css
            'backgroundColor'   :   mbAdminApp.getColor( 'darkest' )['transparent-50'] // css
        };                                                  // done named array 
        self.textOptions = {                                // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Text'), // string
            'element'           :   'div',                  // html element type 
            'text'              :   'busy',                 // string
            'position'          :   'absolute',             // css 
            'backgroundColor'   :   'transparent',          // css
            'color'             :   mbAdminApp.getColor( 'lighter' ).color, // css 
            'fontSize'          :   '1.6em',                // css 
            'lineHeight'        :   '1.6em',                // css
            'letterSpacing'     :   10,                     // css
            'fontWeight'        :   'bold',                 // css
            'padding'           :   '0.2em 1.6em',          // css
            'borderRadius'      :   '9px',                  // css
            'opacity'           :   0.7                     // css
        };                                                  // done named array 
        self.layout = {                                     // named array 
            'fontSize'          :   '1.6em',                // css 
            'fontWeight'        :   'bold'                  // css 
        };                                                  // done named array 
        self.processes = 0;                                 // integer
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();

            // add event subscriptions
            self.addEventSubscriptions();
                
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
        
            // add start admin busy proces
            mbAdminApp.startBusyProces = self.startProces;
            
            // add is admin busy
            mbAdminApp.isBusy = self.isBusy;
            
            // add end admin busy proces
            mbAdminApp.endBusyProces = self.endProces;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add layout change
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove layout change
            mbAdminApp.unSubscribeFromEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
        
            // add the container
            mbAdminApp.appendContainer( document.body, self.containerOptions );
            
            // add text
            mbAdminApp.appendContainer( self.containerOptions['id'], self.textOptions );
                      
        // DONE FUNCTION: addHtml( void ) void
        };
        self.startProces = function(){
        // FUNCTION: startProces( void ) void
        
            // debug info
            self.debug( 'start proces' );
            
            // add process
            self.processes++;

            // ! visible
            if( !self.containerOptions['visible'] ){
            
                // remember visible
                self.containerOptions['visible'] = true;
                
                // show 
                mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'block' );
                    
                // adjust layout
                self.layoutChange();
            
            }
            // ! visible
            
        // DONE FUNCTION: startProces( void ) void
        };
        self.isBusy = function(){
        // FUNCTION: isBusy( void ) boolean
        
            // processes > 0
            if( self.processes > 0 ){
                
                // return busy
                return true;
                
            }
            // done processes > 0
            
            // return not busy
            return false;
            
        // DONE FUNCTION: isBusy( void ) boolean
        };
        self.endProces = function(){
        // FUNCTION: endProces( void ) void
        
            // debug info
            self.debug( 'end proces' );
            
            // remove process
            self.processes--;
            
            // debug info
            self.debug( 'processes left: ' + self.processes );
            
            // no processes left
            if( self.processes === 0 ){
                
                // is visible
                if( self.containerOptions['visible'] ){

                    // hide 
                    mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'none' );
                    
                    // remember ! visible
                    self.containerOptions['visible'] = false;

                }
                // is visible
                
            }
            // done no processes left
            
            // processes lower the zero
            if( self.processes < 0 ){
                
                // debug info
                self.debug( 'number of processes less then 0' );
                
            }
            // processes lower the zero
            
        // DONE FUNCTION: endProces( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get container layout
            let containerLayout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // get text layout
            let textLayout = mbAdminApp.getElementById( self.textOptions['id'] ).getBoundingClientRect();
            
            // calculate height and width and position of the text
            let top = ( containerLayout.height - textLayout.height ) / 2;
            let left = ( containerLayout.width - textLayout.width ) / 2;
            // done calculate height and width and position of the text

            // set position of text
            mbAdminApp.setStyle( self.textOptions['id'] , 'left', left + 'px' );
            mbAdminApp.setStyle( self.textOptions['id'] , 'top', top + 'px' );
            // set position of text
            
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: busyScreenModule( void ) named array 
    
})( mbAdminApp );
// done create module function
