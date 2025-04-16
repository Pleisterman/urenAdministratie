/*
        @package        Pleisterman/MbAdmin

        function:       handles the layout
                        it catches the window resize and scroll function and calls the 
                        app event layoutChange and contentScroll

        Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.content = nameSpace.content ? nameSpace.content : {};

    // MODULE: layoutModule( void ) named array    
    nameSpace.content.layoutModule = function( ) {
        
        // PRIVATE:

        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentLayoutModule';                        // string
        self.debugOn = false;                                       // boolean
        self.containerOptions = {                                   // named array  
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'zIndex'                :   mbAdminApp.getSetting( 'zIndexes' ).layout, // integer 
            'position'              :   'absolute',                 // css
            'top'                   :   0,                          // css
            'left'                  :   0,                          // css
            'width'                 :   '100%',                     // css
            'height'                :   '100%',                     // css
            'overflowX'             :   'hidden',                   // css
            'overflowY'             :   'auto',                     // css
            'backgroundColor'       :   'transparent'               // css
        };                                                          // done named array  
        self.mainOverlayOptions = {                                 // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'MainOverlay' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css 
            'display'               :   'none',                     // css
            'top'                   :   0,                          // css
            'left'                  :   0,                          // css
            'height'                :   '100%',                     // css 
            'width'                 :   '100%',                     // css 
            'zIndex'                :   mbAdminApp.getSetting( 'zIndexes' ).mainOverlay,
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' )['transparent-50'] // css
        };                                                          // done named array    
        self.topOverlayOptions = {                                  // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'TopOverLay' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css 
            'display'               :   'none',                     // css
            'top'                   :   0,                          // css
            'left'                  :   0,                          // css
            'height'                :   '100%',                     // css 
            'width'                 :   '100%',                     // css 
            'zIndex'                :   mbAdminApp.getSetting( 'zIndexes' ).topOverlay,
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' )['transparent-50']  // css
        };                                                          // done named array    
        self.leftPanelOptions = {                                   // named array  
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'LeftPanel' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'zIndex'                :   110,                        // integer
            'top'                   :   '0px',                      // css
            'left'                  :   '0px',                      // css
            'width'                 :   '210px',                    // css
            'height'                :   '100%',                     // css 
            'overflow'              :   'hidden',                   // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightee' ).color, // css
            'borderRight'           :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   mbAdminApp.getColor( 'lightest' ).color,  // css 
            'borderStyle'           :   'groove'                    // css
        };                                                          // done named array  
        self.logoOptions = {                                        // named array 
           'id'                     :   mbAdminApp.getUiId( self.MODULE + 'Logo' ), // string 
           'element'                :   'div',                      // html element type 
           'position'               :   'relative',                 // css
           'width'                  :   '100%',                     // css
           'height'                 :   '60px',                     // css
           'backgroundSize'         :   '90px 40px',                // css
           'backgroundRepeat'       :   'no-repeat',                // css
           'backgroundPosition'     :   'center center',            // css
           'imageUrl'               :   'url(' + 
                                            mbAdminApp.options.imageUrl + 
                                            'logo.png' +
                                        ')',                        // css
            'backgroundColor'       :   mbAdminApp.getColor( 'light' ).color, // css
            'borderBottom'          :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   mbAdminApp.getColor( 'darker' ).color, // css 
            'borderStyle'           :   'groove'                    // css
        };                                                          // done named array  
        self.leftPanelContentOptions = {                            // named array  
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'LeftPanel' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'top'                   :   '61px',                     // css
            'left'                  :   '0px',                      // css
            'width'                 :   '100%',                     // css
            'overflowX'             :   'hidden',                   // css
            'overflowY'             :   'auto',                     // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color // css
        };                                                          // done named array  
        self.contentContainerOptions = {                            // named array  
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ContentContainer' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'zIndex'                :   '1',                        // css
            'top'                   :   '0px',                      // css
            'left'                  :   self.leftPanelOptions['width'], // css
            'height'                :   '100%',                     // css
            'overflowX'             :   'hidden',                   // css
            'overflowY'             :   'auto',                     // css
            'backgroundColor'       :   'transparent'               // css
        };                                                          // done named array  
        self.bottomPanelContainerOptions = {                        // named array  
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'BottomPanelContainer' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'zIndex'                :   '2',                        // css
            'height'                :   '130px',                    // css
            'left'                  :   self.leftPanelOptions['width'], // css
            'overflow'              :   'hidden',                   // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css
            'borderTop'             :   true,                      // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   mbAdminApp.getColor( 'darker' ).color, // css 
            'borderStyle'           :   'groove'                    // css
        };                                                          // done named array  
        self.modules = [];                              // named array           
        self.lastScrollPosition = 0;                    // integer                                               
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();
            
            // event subscription
            self.addEventSubscriptions();
            
            // create html
            self.addHtml();
            
            // set orientation
            self.setOrientation();

            // create modules
            self.createModules();
            
            // scene change
            self.sceneChange();
                
            // add events 
            self.addEvents();
                        
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add get admin setting
            mbAdminApp.getLayoutId = self.getLayoutId;
            
            // add get admin main overlay id
            mbAdminApp.getMainOverlayId = self.getMainOverlayId;
            
            // add get admin top overlay id
            mbAdminApp.getTopOverlayId = self.getTopOverlayId;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getLayoutId = function( containerId ) {
        // FUNCTION getLayoutId( string: containerId ) html element id
        
            // container id left panel
            if( containerId === 'leftPanel' ){
                
                // return left panel id
                return self.leftPanelOptions['id'];
                
            }
            // container id left panel
        
            // container id left panel content
            if( containerId === 'leftPanelContent' ){
                
                // return left panel content id
                return self.leftPanelContentOptions['id'];
                
            }
            // container id left panel content
        
            // container id content
            if( containerId === 'content' ){
                
                // return content container id
                return self.contentContainerOptions['id'];
                
            }
            // container id content  
                
            // container id bottom panel
            if( containerId === 'bottomPanel' ){
                
                // return bottom panel container id
                return self.bottomPanelContainerOptions['id'];
                
            }
            // container id bottom panel
                
            // return container id
            return self.containerOptions['id'];
            
        // DONE FUNCTION getLayoutId( string: containerId ) html element id
        };
        self.getMainOverlayId = function( ) {
        // FUNCTION getMainOverlayId( void ) html element id
        
            // return main overlay id
            return self.mainOverlayOptions['id'];
        
        // DONE FUNCTION getMainOverlayId( void ) html element id
        };
        self.getTopOverlayId = function( ) {
        // FUNCTION getTopOverlayId( void ) html element id
        
            // return top overlay id
            return self.topOverlayOptions['id'];
        
        // DONE FUNCTION getTopOverlayId( void ) html element id
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add scene change
            mbAdminApp.subscribeToEvent( 'sceneChange', self.sceneChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void

            // debug info
            self.debug( 'addEvents' );

            // add window.onresize
            window.addEventListener( 'resize',self.sceneChange );             
        
            // add window.onresize
            window.addEventListener( 'orientationchange', function( event ) {
                
                // debug info
                self.debug( 'orientaitionChange' );

                // set orientation
                self.setOrientation();
                
                // scene change
                self.sceneChange();
                
            });
            // done override window.orientationchange
        
            // get content element
            let content = mbAdminApp.getElementById( self.contentContainerOptions['id'] );
        
            // add content scroll
            content.addEventListener( 'scroll', self.contentScroll );
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add layout to document
            mbAdminApp.appendContainer( document.body, self.containerOptions );
             
            // add main overlay
            mbAdminApp.appendContainer( document.body, self.mainOverlayOptions );
            
            // add top overlay
            mbAdminApp.appendContainer( document.body, self.topOverlayOptions );
             
            // add left panel container to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.leftPanelOptions );
             
            // add logo to left panel
            mbAdminApp.appendContainer( self.leftPanelOptions['id'], self.logoOptions );
             
            // add left panel content to left panel
            mbAdminApp.appendContainer( self.leftPanelOptions['id'], self.leftPanelContentOptions );
             
            // add content to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.contentContainerOptions );
             
            // add bottom panel to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.bottomPanelContainerOptions );
             
        // DONE FUNCTION: addHtml( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // get site content module
            let contentModule = mbAdminApp.content.contentModule;

            // create content
            self.modules['content'] = new contentModule( self.contentContainerOptions['id'] );
        
        // DONE FUNCTION: createModules( void ) void
        };
        self.setOrientation = function() {
        // FUNCTION: setOrientation( void ) void
            
            // get container layout
            let layout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // height > width / else
            if( layout.height > layout.width ){

                // remember orientation 
                mbAdminApp.screenOrientation = "portret";

            }
            else {

                // remember orientation 
                mbAdminApp.screenOrientation = "landscape";

            }            
            // height > width / else

        // DONE FUNCTION: setOrientation( void ) void
        };
        self.sceneChange = function() {
        // FUNCTION: sceneChange( void ) void
            
            // set vertical overlow
            mbAdminApp.setStyle( self.containerOptions['id'], 'overflow-y', 'hidden' );

            // set content vertical overlow
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'overflow-y', 'hidden' );

            // get window dimensions
            let windowDimensions = mbAdminApp.getWindowDimensions( );

            // get user options
            let userOptions = mbAdminApp.options.user;

            // calculate left panel width
            let leftPanelWidth = userOptions['leftPanelDividerPosition'];

            // set left panel width
            mbAdminApp.setStyle( self.leftPanelOptions['id'], 'width', leftPanelWidth + 'px' );
                        
            // get logo layout
            let logoLayout = mbAdminApp.getElementById( self.logoOptions['id'] ).getBoundingClientRect();
            
            // calculate left panel content height
            let leftPanelContentHeight = windowDimensions['height'] - logoLayout['height'];
            
            // set left panel content height
            mbAdminApp.setStyle( self.leftPanelContentOptions['id'], 'height', leftPanelContentHeight + 'px' );
            
            // calculate content width
            let contentWidth = windowDimensions['width'] - leftPanelWidth;

            // get bottom panel layout
            let bottomPanelLayout = mbAdminApp.getElementById( self.bottomPanelContainerOptions['id'] ).getBoundingClientRect();
            
            // calculate content height
            let contentHeight = windowDimensions['height'] - ( bottomPanelLayout['height'] );

            // set content width
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'width', contentWidth + 'px' );

            // set content left
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'left', leftPanelWidth + 'px' );
            
            // set content height
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'height', contentHeight + 'px' );

            // set bottom panel width
            mbAdminApp.setStyle( self.bottomPanelContainerOptions['id'], 'width', contentWidth + 'px' );

            // set bottom panel left
            mbAdminApp.setStyle( self.bottomPanelContainerOptions['id'], 'left', leftPanelWidth + 'px' );
            
            // set bottom panel top
            mbAdminApp.setStyle( self.bottomPanelContainerOptions['id'], 'top', contentHeight + 'px' );
            
            // call the global event
            mbAdminApp.callEvent( "layoutChange" );

            // set content vertical overlow
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'overflow-y', 'auto' );

            // set vertical overlow
            mbAdminApp.setStyle( self.containerOptions['id'], 'overflow-y', 'auto' );
            
        // DONE FUNCTION: sceneChange( void ) void
        };
        self.contentScroll = function() {
        // FUNCTION: contentScroll( void ) void
            
            // get content scroll top
            let scrollTop = mbAdminApp.getElementById( self.contentContainerOptions['id'] ).scrollTop;
            
            // no change
            if( self.lastScrollPosition === scrollTop ){
                
                // done
                return;
                
            }
            // no change
            
            // set vertical overlow
            mbAdminApp.setStyle( self.containerOptions['id'], 'overflow-y', 'hidden' );

            // set content vertical overlow
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'overflow-y', 'hidden' );

            // create direction
            let direction = 'down';
            
            // last scroll position > scroll top
            if( self.lastScrollPosition > scrollTop ){
                
                // set direction
                 direction = 'up';
                
            }
            // last scroll position > scroll top
            
            // debug info
            self.debug( 'content scroll direction: ' + direction );

            // remember last scroll position
            self.lastScrollPosition = scrollTop;
            
            // call the global event
            mbAdminApp.callEvent( "contentScroll", direction );
            
            // set content vertical overlow
            mbAdminApp.setStyle( self.contentContainerOptions['id'], 'overflow-y', 'auto' );

            // set vertical overlow
            mbAdminApp.setStyle( self.containerOptions['id'], 'overflow-y', 'auto' );
            
        // DONE FUNCTION: contentScroll( void ) void
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
    // DONE MODULE: layoutModule( void ) named array
    
})( mbAdminApp );
// done create module function
