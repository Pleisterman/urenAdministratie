/*
    @package        Pleisterman/MbAdmin
  
    function:       displays a hover text
                    adds the functions:

                        mbAdminApp.showHoverText ( shows a text hovering over a target )
                        mbAdminApp.showErrorText ( shows a text hovering over a target )

                    to the application    

    Last revision:  01-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.tools = nameSpace.tools ? 
                      nameSpace.tools : 
                      {};
    // create name space
    
    // MODULE: hoverTextModule( void ) named array 
    nameSpace.tools.hoverTextModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                            // object
        self.MODULE = 'HoverTextModule';            // string
        self.debugOn = false;                       // boolean
        self.containerOptions = {                   // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',          // html element type 
            'zIndex'            :   mbAdminApp.getSetting( 'zIndexes' ).hoverText, // integer 
            'position'          :   'absolute',     // css
            'display'           :   'none',         // css
            'left'              :   '0px',          // css
            'top'               :   '0px',          // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lightest' ).color, // css
            'borderRadius'      :   '3px',          // css
            'border'            :   true,           // boolean
            'borderWidth'       :   '1px',          // css
            'borderColor'       :   mbAdminApp.getColor( 'darker' ).color, // css 
            'borderStyle'       :   'groove',       // css
            'boxShadow'         :   '1px 1px 0.0px 1px rgba( 55, 95, 55, 0.2 )' // css 
        };                                          // done named array 
        self.colors = {                             // named array 
            'message' : {
                'backgroundColor'   :   mbAdminApp.getColor( 'lightest' ).color, // css
                'color'             :   mbAdminApp.getColor( 'darkest' ).color, // css
                'borderColor'       :   mbAdminApp.getColor( 'darker' ).color // css 
            },
            'error' : {
                'backgroundColor'   :   mbAdminApp.getColor( 'error' ).dark, // css
                'color'             :   mbAdminApp.getColor( 'error' ).light, // css
                'borderColor'       :   mbAdminApp.getColor( 'error' ).dark // css 
            }
        };                                          // done named array 
        self.textOptions = {                        // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Text' ), // string 
            'element'           :   'div',          // html element type 
            'text'              :   'hoverText',    // string
            'fontSize'          :   '1.2rem',       // css
            'padding'           :   '4px 12px 4px 12px', // css
            'color'             :   mbAdminApp.getColor( 'dark' ).color,
            'backgroundColor'   :   'transparent'   // css
        };                                          // done named array 
        self.displayOptions = {                     // named array
            'visible'           :   false,          // boolean
            'defaultAlign'      :   'center',       // string
            'minimumTop'        :   45,             // integer
            'spacingLeft'       :    -20,           // integer
            'spacingRight'      :    8,             // integer
            'spacingTop'        :    5              // integer
        };                                          // done named array 
        self.timerOptions = {                       // named array
            'timer'             :   null,           // timer / null
            'delay'             :   1000            // integer
        };                                          // done named array 
        self.callerOptions = null;                  // named array / null                                                      
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add show hover text function
            mbAdminApp.showHoverText = self.show;
            
            // add show error text function
            mbAdminApp.showErrorText = self.showError;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add scene change
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void

            // debug info
            self.debug( 'removeEventSubscriptions' );

            // remove scene change
            mbAdminApp.unSubscribeFromEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );
            
            // add container to document
            mbAdminApp.appendContainer( document.body, self.containerOptions );

            // add text to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.textOptions );

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.show = function( callerOptions ) {
        // FUNCTION: show( hnamed array: callerOptions ) void
            
            // debug info
            self.debug( 'show' );
            
            // remember caller options
            self.callerOptions = mbAdminApp.extend( {}, callerOptions );
          
            // set text
            mbAdminApp.getElementById( self.textOptions['id'] ).innerHTML = self.callerOptions['text'];
            
            // set colors 
            self.setColors();

            // show 
            mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'block' );

            // adjust layout 
            self.layoutChange();
            
            // start timer
            self.startTimer();
            
        // DONE FUNCTION: show( named array: callerOptions ) void
        };
        self.showError = function( callerOptions ) {
        // FUNCTION: showError( hnamed array: callerOptions ) void
            
            // remember caller options
            self.callerOptions = mbAdminApp.extend( {}, callerOptions );
          
            // set text
            mbAdminApp.getElementById( self.textOptions['id'] ).innerHTML = self.callerOptions['text'];
            
            // set colors 
            self.setErrorColors();

            // show 
            mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'block' );

            // adjust layout 
            self.layoutChange();
            
            // add event subscriptions
            self.addEventSubscriptions();
        
            // start timer
            self.startTimer();
            
        // DONE FUNCTION: showError( named array: callerOptions ) void
        };
        self.setColors = function() {
        // FUNCTION: setColors( void ) void
            
            // set container background
            mbAdminApp.setStyle( self.containerOptions['id'], 'background-color', self.colors['message']['backgroundColor'] );
            
            // set container border
            mbAdminApp.setStyle( self.containerOptions['id'], 'border-color', self.colors['message']['borderColor'] );
            
            // set container color
            mbAdminApp.setStyle( self.textOptions['id'], 'color', self.colors['message']['color'] );
            
        // DONE FUNCTION: setColors( void ) void
        };
        self.setErrorColors = function() {
        // FUNCTION: setErrorColors( void ) void
            
            // set container background
            mbAdminApp.setStyle( self.containerOptions['id'], 'background-color', self.colors['error']['backgroundColor'] );
            
            // set container border
            mbAdminApp.setStyle( self.containerOptions['id'], 'border-color', self.colors['error']['borderColor'] );
            
            // set container color
            mbAdminApp.setStyle( self.textOptions['id'], 'color', self.colors['error']['color'] );
            
        // DONE FUNCTION: setErrorColors( void ) void
        };
        self.hide = function() {
        // FUNCTION: hide( void ) void
            
            // debug info
            self.debug( 'hide' );
            
            // unset caller options
            self.callerOptions = null; 
            
            // hide 
            mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'none' );

        // DONE FUNCTION: hide( void ) void
        };
        self.startTimer = function() {
        // FUNCTION: startTimer( void ) void
            
            // clear timer
            self.clearTimer();
            
            // start timer
            self.timerOptions['timerId'] = setTimeout( self.timerEvent, self.timerOptions['delay'] );
            
        // DONE FUNCTION: startTimer( void ) void
        };
        self.timerEvent = function() {
        // FUNCTION: timerEvent( void ) void

            // clear timer
            self.clearTimer();
            
            // hide
            self.hide();

        // DONE FUNCTION: timerEvent( void ) void
        };
        self.clearTimer = function() {
        // FUNCTION: clearTimer( void ) void
            
            // no timer
            if( self.timerOptions['timerId'] === null ){
                
                // done
                return;
                
            }
            // no timer
            
            // clear timer
            clearTimeout( self.timerOptions['timerId'] );
            
            // unset timer id\
            self.timerOptions['timerId'] = null;
            
        // DONE FUNCTION: clearTimer( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // caller ! exists   
            if( !self.callerOptions ||
                !mbAdminApp.getElementById( self.callerOptions['elementId'] ) ){
                
                // hide
                self.hide();
                
                // done 
                return;
                
            }
            // caller ! exists   
            
            // get caller layout
            let callerLayout = mbAdminApp.getElementById( self.callerOptions['elementId'] ).getBoundingClientRect();
            
            // get container layout
            let containerLayout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // get align
            let align = self.callerOptions['align'] ? self.callerOptions['align'] : self.displayOptions['defaultAlign'];
            
            // create left
            let left = callerLayout.left;
            
            // align is left
            if( align === 'left' ){
                
                // add caller width
                left -= callerLayout.width;

                // add spacing left
                left -= self.displayOptions['spacingLeft'];
                
            }
            // align is left
            
            // align is center
            if( align === 'center' ){
                
                // add half caller width 
                left += callerLayout.width / 2;
                
                // subtract half container width
                left -= containerLayout.width / 2;

            }
            // align is center
            
            // align is right
            if( align === 'right' ){
                
                // subtract half width
                left += containerLayout.width;
                
                // subtract spacing right
                left += self.displayOptions['spacingRight'];

            }
            // align is right
            
            // set left
            mbAdminApp.setStyle( self.containerOptions['id'], 'left', left + 'px' );
            
            // calculate top
            let top = callerLayout.top + callerLayout.height + self.displayOptions['spacingTop'];
       
            // top < minimum top
            if( top < self.displayOptions['minimumTop'] ){

                // show below
                top = self.containerOptions['minimumTop'] + containerLayout.height + self.displayOptions['spacingTop'];
                
            }
            // top < minimum top
                
            // set top
            mbAdminApp.setStyle( self.containerOptions['id'], 'top', top + 'px' );
            
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

            // FUNCTION: layoutChange( void ) void    
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: hoverTextModule( void ) named array
    
})( mbAdminApp );
// done create module function
