/*
        @package        Pleisterman/MbAdmin
  
        function:       controls the dialog for showing
                        messages for the application 
                        a message dialog is displayed with the message
                        the dialog can have a close button or
                        an ok and cancel button
                        on ok a provided callback is called
                        on close a provided callback is called
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.dialogs;
    
    // MODULE: messageDialogModule( named array: layoutOptions ) named array
    nameSpace.messageDialogModule = function( layoutOptions ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                                // object
        self.MODULE = 'DialogsMessageDialogModule';                     // string
        self.debugOn = false;                                           // boolean
        self.layoutOptions = layoutOptions;                             // named array
        self.overlayOptions = {                                         // named array
            'id'                    :   self.MODULE + 'Layer',          // string
            'element'               :   'div',                          // string
            'position'              :   'absolute',                     // css
            'top'                   :   0,                              // css
            'left'                  :   0,                              // css
            'height'                :   '100%',                         // css
            'width'                 :   '100%',                         // css
            'backgroundColor'       :   mbAdminApp.getColor( 'darkest' )['transparent-50'], // css
            'zIndex'                :   mbAdminApp.getSetting( 'zIndexes' ).messages // css
        };                                                              // done named array
        self.dialogOptions = {                                          // named array
            'id'                    :   self.MODULE + 'Dialog',         // string
            'width'                 :   '44em',                         // css
            'minimumMargin'         :   10                              // integer
        };                                                              // done named array
        self.headerOptions = {                                          // named array
            'id'                    :   self.MODULE + 'Header'          // string
        };                                                              // done named array
        self.contentOptions = {                                         // named array
            'id'                    :   self.MODULE + 'Content'         // string
        };                                                              // done named array
        self.intros = {                                                 // named array
            'error'                 :   'An error occured: <br>',       // string
            'message'               :   '<br>'                          // string
        };                                                              // done named array
        self.buttonContainerOptions = {                                 // named array
            'id'                    :   self.MODULE + 'ButtonContainer', // string
            'element'               :   'div',                          // html element type 
            'backgroundColor'       :   'transparent',                  // css
            'display'               :   'flex',                         // css
            'justifyContent'        :   'center'                        // css
        };                                                              // done named array
        self.buttonTexts = {                                            // named array
            'ok'        :   'Ok',                                       // string
            'cancel'    :   'Cancel',                                   // string
            'retry'     :   'Retry'                                     // string
        };                                                              // done named array
        self.buttons = {};                                              // named array
        self.options = null;                                            // named array / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // extemd layout
            self.extendLayout();

            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();

        // DONE FUNCTION: construct( void ) void
        };
        self.extendLayout = function(){
        // FUNCTION: extendLayout( void ) void
                        
            // extend dialog
            self.overlayOptions = mbAdminApp.extend( self.overlayOptions, self.layoutOptions['overlay'] );
            
            // extend dialog
            self.dialogOptions = mbAdminApp.extend( self.dialogOptions, self.layoutOptions['container'] );
            
            // extend header
            self.headerOptions = mbAdminApp.extend( self.headerOptions, self.layoutOptions['header'] );
            
            // extend content
            self.contentOptions = mbAdminApp.extend( self.contentOptions, self.layoutOptions['content'] );
            
        // DONE FUNCTION: extendLayout( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show message
            mbAdminApp.showMessageDialog = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
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
            
            // add overlay
            mbAdminApp.appendContainer( document.body, self.overlayOptions );

            // add dialog
            mbAdminApp.appendContainer( self.overlayOptions['id'], self.dialogOptions );

            // add header
            self.addHeader();

            // add content
            self.addContent();

            // add buttons
            self.addButtons();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function(){
        // FUNCTION: removeHtml( void ) void
            
            // remove buttons
            self.removeButtons();
            
            // remove content
            mbAdminApp.getElementById( self.contentOptions['id'] ).remove();

            // remove header
            mbAdminApp.getElementById( self.headerOptions['id'] ).remove();

            // remove dialog
            mbAdminApp.getElementById( self.dialogOptions['id'] ).remove();

            // remove overlay
            mbAdminApp.getElementById( self.overlayOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addHeader = function() {
        // FUNCTION: addHeader( void ) void

            // set header text
            self.headerOptions['text'] = self.options['title'];

            // add header
            mbAdminApp.appendContainer( self.dialogOptions['id'], self.headerOptions );
            
        // DONE FUNCTION: addHeader( void ) void
        };
        self.addContent = function() {
        // FUNCTION: addContent( void ) void

            // create text
            let text = '';

            // has error
            if( self.options['error'] ){
                
                // add error text
                text = self.intros['error'];
                
            }
            // has error
            
            // set content text
            text += self.options['error'] ? self.intros['error'] : self.intros['message'];

            // set content text
            text += self.options['error'] ? self.options['error'] : self.options['message'];

            // set content text
            self.contentOptions['text'] = text;

            // add content
            mbAdminApp.appendContainer( self.dialogOptions['id'], self.contentOptions );
                        
        // DONE FUNCTION: addContent( void ) void
        };
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // ! buttons
            if( !self.options['buttons'] ){
                
                // done
                return;
                
            }
            // ! buttons

            // add button container
            mbAdminApp.appendContainer( self.dialogOptions['id'], self.buttonContainerOptions );
                        
            
            // loop over buttons            
            Object.entries( self.options['buttons'] ).forEach( ( [index, options] ) => {
                
                // create button 
                self.createButton( index, options );                
                
            });
            // loop over buttons            
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.removeButtons = function() {
        // FUNCTION: removeButtons( void ) void
            
            // loop over buttons            
            Object.entries( self.buttons ).forEach( ( [index, module] ) => {
                
                // destroy button 
                module.destruct( );                
                
            });
            // loop over buttons            

            // reset buttons
            self.buttons = {};
            
        // DONE FUNCTION: removeButtons( void ) void
        };
        self.createButton = function( index, options ){
        // FUNCTION: createButton( string: index, named array: options ) void
            
            // extend button options
            let buttonOptions = mbAdminApp.extend( {}, self.layoutOptions['button'] );
            
            // set id
            buttonOptions['id'] = self.MODULE + index;
            
            // set title
            buttonOptions['text'] = self.buttonTexts[index];
                
            // create callbacks
            let callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self[index]
            };
            // create callbacks
            
            // add button
            self.buttons[index] = new mbAdminApp.ui.buttonModule( self.buttonContainerOptions['id'],
                                                                  buttonOptions,
                                                                  callbacks );
            // add button
            
        // DONE FUNCTION: createButton( string: index, named array: options ) void
        };
        self.ok = function( ){ 
        // FUNCTION: ok( void ) void
            
            // debug info
            self.debug( 'ok' );

            // copy callback
            let callback = self.options['buttons']['ok']['callback'];
            
            // hide
            self.hide();

            // callback exists
            if( callback ){
                
                // call callback
                callback();
                
            }
            // has callback
                        
        // DONE FUNCTION: ok( void ) void
        };
        self.cancel = function( ){ 
        // FUNCTION: cancel( void ) void
            
            // debug info
            self.debug( 'cancel' );

            // copy callback
            let callback = self.options['buttons']['cancel']['callback'];
            
            // hide
            self.hide();

            // callback exists
            if( callback ){
                
                // call callback
                callback();
                
            }
            // has callback
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.retry = function( ){ 
        // FUNCTION: retry( void ) void
            
            // debug info
            self.debug( 'retry' );

            // copy callback
            let callback = self.options['buttons']['retry']['callback'];
            
            // hide
            self.hide();

            // callback exists
            if( callback ){
                
                // call callback
                callback();
                
            }
            // has callback
            
        // DONE FUNCTION: retry( void ) void
        };
        self.show = function( options ){
        // FUNCTION: showMessage( named array: options ) void
            
            // is visible
            if( self.visible ){
                
                // done
                return;
                
            }
            // is visible
            
            // set visible
            self.visible = true;
            
            // save options
            self.options = options;
            
            // add html
            self.addHtml();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: showMessage( named array: options ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // debug info
            self.debug( 'hide' );

            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // remove html
            self.removeHtml();
            
            // unset options
            self.options = null;
            
            // set visible
            self.visible = false;
            
        // DONE FUNCTION: hide( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get window dimensions
            let windowDimensions = mbAdminApp.getWindowDimensions();
            
            // get dialog dimensions
            let dialogLayout = mbAdminApp.getElementById( self.dialogOptions['id'] ).getBoundingClientRect();
            
            // calculate position of the dialog
            let top = ( windowDimensions['height'] - dialogLayout['height'] ) / 2;
            let left = ( windowDimensions['width'] - dialogLayout['width'] ) / 2;
            // done calculate position of the dialog
            
            // set position of the dialog
            mbAdminApp.setStyle( self.dialogOptions['id'], 'top', top + 'px' );
            mbAdminApp.setStyle( self.dialogOptions['id'], 'left', left + 'px' );
            // done set position of the dialog
            
            // get minimum margin
            let minimumMargin = self.dialogOptions['minimumMargin'];
            
            // calculate dimensions of the dialog
            let width = Math.min( ( windowDimensions['width'] - ( 2 * minimumMargin ) ), dialogLayout['width'] );
            let height = Math.min( ( windowDimensions['height'] - ( 2 * minimumMargin ) ), dialogLayout['height'] );
            // done calculate position of the dialog
            
            // set dimensions of the dialog
            mbAdminApp.setStyle( self.dialogOptions['id'], 'width', width + 'px' );
            mbAdminApp.setStyle( self.dialogOptions['id'], 'height', height + 'px' );
            // done set dimensions of the dialog
            
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: messageDialogModule( named array: layoutOptions  ) named array
    
})( mbAdminApp );
// done create module function
