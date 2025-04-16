/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the lists
  
        Last revision:  12-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};

    // MODULE: buttonsModule( named array: callbacks ) named array
    nameSpace.edit.buttonsModule = function( callbacks ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentEditButtonsModule';                   // string
        self.debugOn = false;                                       // boolean
        self.callbacks = callbacks;                                 // named array
        self.containerOptions = {                                   // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'backgroundColor'       :   'transparent',              // css 
            'paddingLeft'           :   '1.2rem',                   // css 
            'paddingTop'            :   '1.2rem'                    // css 
        };                                                          // done named array 
        self.contentOptions = {                                     // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Content' ), // string 
            'element'               :   'div',                      // html element type 
            'display'               :   'flex',                     // css
            'backgroundColor'       :   'transparent'               // css 
        };                                                          // done named array 
        self.buttonOptions = {                                      // named array
            'element'               :   'div',                      // html element type 
            'fontSize'              :   '1.3rem',                   // css 
            'padding'               :   '0.3rem 0.6rem',            // css 
            'marginRight'           :   '0.8rem',                   // css 
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                             // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                                  // done named array
                'border' : {                                        // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                }                                                   // done named array
            },                                                      // done named array
            'borderRadius'          :   '0.3rem',                   // css
            'border'                :   true,                       // boolean
            'borderWidth'           :   '0.1rem',                   // css
            'borderColor'           :   mbAdminApp.getColor( 'dark' ).color, // css 
            'borderStyle'           :   'groove',                   // css
            'cursor'                :   'pointer'                   // css            
        };                                                          // done named array
        self.buttonTitles = {                                       // named array
            'update'                :   'Update',                   // string
            'insert'                :   'Insert',                   // string
            'export'                :   'Export',                   // string
            'cancel'                :   'Cancel'                    // string
        };                                                          // done named array    
        self.mode = null;                                           // strinf / null
        self.modules = {};                                          // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // get bottom panel id
            let bottomPanelId = mbAdminApp.getLayoutId( 'bottomPanel' );

            // add container to bottom panel
            mbAdminApp.appendContainer( bottomPanelId, self.containerOptions );                  
                        
            // add content to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.contentOptions );                  
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove content
            mbAdminApp.getElementById( self.contentOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createButtons = function( buttons ) {
        // FUNCTION: createButtons( array: buttons ) void
            
            // loop over buttons
            Object.entries( buttons ).forEach( ( [index, buttonId] ) => {
                
                // create button
                self.createButton( buttonId );
                
            });
            // done loop over buttons
            
        // DONE FUNCTION: createButtons( array: buttons ) void
        };
        self.removeButtons = function() {
        // FUNCTION: removeButtons( void ) void
            
            // loop over buttons
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
                
                // create button
                module.destruct( );
                
            });
            // done loop over buttons
            
            // reste modules
            self.modules = {};
            
        // DONE FUNCTION: removeButtons( void ) void
        };
        self.createButton = function( buttonId ) {
        // FUNCTION: createButton( string: buttonId ) void
            
            // copy button options
            let buttonOptions = mbAdminApp.extend( {}, self.buttonOptions );

            // set id
            buttonOptions['id'] = mbAdminApp.getUiId( self.MODULE + buttonId );

            // set text
            buttonOptions['text'] = self.buttonTitles[buttonId];

            // create callbacks
            let callbacks = {
                'mouseOver'     :    true,  
                'mouseOut'      :    true,  
                'click'         :    self.callbacks[buttonId]
            };
            // create callbacks

            // create button
            self.modules[buttonId] = new mbAdminApp.ui.buttonModule( self.contentOptions['id'],
                                                                     buttonOptions,
                                                                     callbacks );
            // create button
                
        // DONE FUNCTION: createButton( string: buttonId ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

        // DONE FUNCTION: layoutChange( void ) void
        };
        self.show = function( editModule, row ) {
        // FUNCTION: show( module: editModule, named array / null: row ) void

            // remove buttons
            self.removeButtons();

            // set mode
            self.mode = row ? 'update' : 'insert';

            // get buttons
            let buttons = editModule.getButtons( self.mode );

            // remove buttons
            self.removeButtons();

            // create buttons
            self.createButtons( buttons );

        // DONE FUNCTION: show( module: editModule, named array / null: row ) void
        };
        self.hide = function() {
        // FUNCTION: hide( void ) void

        // DONE FUNCTION: hide( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove html
            self.removeHtml();
            
            // unset edit module
            self.editModule = null;
            
            // unset row
            self.row = null;            
            
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
            
            // FUNCTION: show( module: editModule, named array / null: row ) void    
            show : function( editModule, row ){
                
                // call internal
                self.show( editModule, row );
                
            },
            // FUNCTION: hide( void ) void    
            hide : function( ){
                
                // call internal
                self.hide( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: buttonsModule( named array: callbacks ) named array  
    
})( mbAdminApp );
// done create module function
