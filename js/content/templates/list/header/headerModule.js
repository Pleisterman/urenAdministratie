/*
        @package        Pleisterman/MbAdmin
  
        function:       displays a the header of the list template 
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list;
    
    // create name space
    nameSpace.header = nameSpace.header ? nameSpace.header : {};
    
    // MODULE: headerModule( html element id: parentId, 
    //                     named array: listOptions,
    //                     named array: callbacks ) named array  
    nameSpace.header.headerModule = function( parentId, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesListHeaderModule';       // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.callbacks = callbacks;                             // named array
        self.containerOptions = {                               // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',                      // html element type 
            'position'          :   'relative',                 // css
            'width'             :   '100%',                     // css
            'height'            :   '60px',                     // css
            'borderTop'         :   true,                       // boolean
            'borderBottom'      :   true,                       // boolean
            'borderWidth'       :   '1px',                      // css
            'borderStyle'       :   'groove',                   // css
            'color'             :   mbAdminApp.getColor( 'darkest' ).color, // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lighter' ).color, // css
            'borderColor'       :   mbAdminApp.getColor( 'dark' ).color, // css 
            'colors' : {                                        // done named array
                'color'             :   mbAdminApp.getColor( 'darkest' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'light' ).highlight, // color
                'background' : {                                // named array
                    'color'         :   mbAdminApp.getColor( 'lighter' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lighter' ).highlight // color
                }                                               // done named array
            },                                                  // done named array
            'cursor'            :   'pointer'                   // css            
        };                                                      // done named array 
        self.titleOptions = {                                   // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Title' ), // string 
            'element'           :   'div',                      // html element type 
            'position'          :   'absolute',                 // css
            'left'              :   '40px',                     // css
            'top'               :   '12px',                     // css
            'text'              :   self.listOptions['title'],  // string
            'fontWeight'        :   'bold',                     // css
            'padding'           :   '8px 10px',                 // css
            'color'             :   'inherit',                  // css
            'backgroundColor'   :   'transparent',              // css
            'pointerEvents'     :   'none'                      // css
        };                                                      // done named array 
        self.hoverText = {                                      // named array
            'open'                  :   'Click to open',        // string
            'close'                 :   'Click to close'        // string
        };                                                      // done named array
        self.hoverTextAlign = 'right';                          // string
        self.modules = {};                                      // named array
        self.listIsOpen = mbAdminApp.getUserOption( self.listOptions['subject'] + 'HeaderOpen' ); // boolean
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add container
            self.addContainer();
            
            // add the buttons
            self.addButtons();
            
            // add title
            self.addTitle();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addContainer = function() {
        // FUNCTION: addContainer( void ) void
            
            // debug info
            self.debug( 'addContainer' );

            // create callbacks
            let callbacks = {
                'mouseOver'     :   self.mouseOver,
                'mouseOut'      :   self.mouseOut,
                'click'         :   self.click
            };
            // create callbacks
            
            // add button
            self.modules['button'] = new mbAdminApp.ui.buttonModule( self.parentId,
                                                                     self.containerOptions,
                                                                     callbacks );
            // add button
                        
        // DONE FUNCTION: addContainer( void ) void
        };
        self.mouseOver = function() {
        // FUNCTION: mouseOver( void ) void

            // debug info
            self.debug( 'mouseOver' );

            // show hover text
            self.showHoverText();
            
        // DONE FUNCTION: activeButtonMouseOver( void ) void
        };
        self.showHoverText = function() {
        // FUNCTION: showHoverText( void ) void

            // debug info
            self.debug( 'showHoverText' );

            // get hover text
            let hoverText = self.listIsOpen ? self.hoverText['close'] : self.hoverText['open'];

            // create options
            let options = {
                'elementId' :   self.containerOptions['id'],
                'text'      :   hoverText,
                'align'     :   self.hoverTextAlign
            };
            // create options
            
            // show hover text
            mbAdminApp.showHoverText( options );
                                                   
        // DONE FUNCTION: showHoverText( void ) void
        };
        self.mouseOut = function() {
        // FUNCTION: mouseOut( void ) void

            // debug info
            self.debug( 'mouseOut' );

        // DONE FUNCTION: mouseOut( void ) void
        };
        self.click = function() {
        // FUNCTION: click( void ) void

            // debug info
            self.debug( 'click' );

            // call callback
            self.callbacks['openClose']( );

        // DONE FUNCTION: click( void ) void
        };
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // debug info
            self.debug( 'addButtons' );

            // get buttons module
            let buttonsModule = nameSpace.header.buttonsModule;

            // create buttons
            self.modules['buttons'] = new buttonsModule( self.containerOptions['id'],
                                                         self.listOptions,
                                                         self.callbacks );
            // create buttons
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addTitle = function() {
        // FUNCTION: addTitle( void ) void
            
            // debug info
            self.debug( 'addTitle' );

            // add container to parent
            mbAdminApp.appendContainer( self.containerOptions['id'], self.titleOptions );
                        
        // DONE FUNCTION: addTitle( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

           
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // unset list options
            self.listOptions = null;
            
            // unset callbacks
            self.callbacks = null;
            
        // DONE FUNCTION: destruct( void ) void
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
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: headerModule( html element id: parentId, 
    //                            named array: listOptions,
    //                            named array: callbacks ) named array  
    
})( mbAdminApp );
// done create module function
