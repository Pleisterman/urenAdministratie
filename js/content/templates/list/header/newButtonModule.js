/*
    @package        SiteAnimator\Admin

    file:           newButtonModule.js
    function:       displays the new button for the header of the list template 
                    and handles the events

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list.header;
    
    // MODULE: newButtonModule( html element id: parentId, 
    //                          named array: buttonOptions, 
    //                          named array: listOptions, 
    //                          named array: callbacks ) named array
    nameSpace.newButtonModule = function( parentId, buttonOptions, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentTemplatesListsHeaderButtonsNewButtonModule';  // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element id
        self.buttonOptions = buttonOptions;                         // named array
        self.listOptions = listOptions;                             // named array
        self.callbacks = callbacks;                                 // named array
        self.containerOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Button' ), // string 
            'imageUrl'              :   'url(' + 
                                            mbAdminApp.options.imageUrl + 
                                            'listNew.png' +
                                        ')'                         // css
        };                                                          // done named array  
        self.hoverTextAlign = 'left';                              // string
        self.hoverText = 'New';                                     // string
        self.button = null;                                         // module / null
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
           
            // extend options
            self.extendOptions();
            
            // add button
            self.addButton();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void
            
            // extend container
            self.containerOptions = mbAdminApp.extend( self.containerOptions, self.buttonOptions );

        // DONE FUNCTION: extendOptions( void ) void
        };
        self.addButton = function() {
        // FUNCTION: addButtons( void ) void
            
            // debug info
            self.debug( 'addButton' );
            
            // create callbacks
            let callbacks = {
                'mouseOver'     :   self.mouseOver,
                'mouseOut'      :   self.mouseOut,
                'click'         :   self.click
            };
            // create callbacks
            
            // add button
            self.button = new mbAdminApp.ui.buttonModule( self.parentId,
                                                          self.containerOptions,
                                                          callbacks );
            // add button
                        
        // DONE FUNCTION: addButton( void ) void
        };
        self.mouseOver = function( event ) {
        // FUNCTION: mouseOver( event: event ) void

            // debug info
            self.debug( 'mouseOver' );

            // stop propagation
            event.stopPropagation();

            // show hover text
            self.showHoverText();
            
        // DONE FUNCTION: activeButtonMouseOver( event: event ) void
        };
        self.showHoverText = function( ) {
        // FUNCTION: showHoverText( void ) void

            // debug info
            self.debug( 'showHoverText' );

            // create options
            let options = {
                'elementId' :   self.containerOptions['id'],
                'text'      :   self.hoverText,
                'align'     :   self.hoverTextAlign
            };
            // create options
            
            // show hover text
            mbAdminApp.showHoverText( options );
                                                   
        // DONE FUNCTION: showHoverText( void ) void
        };
        self.mouseOut = function( event ) {
        // FUNCTION: mouseOut( event: event ) void

            // debug info
            self.debug( 'mouseOut' );

            // stop propagation
            event.stopPropagation();
            
        // DONE FUNCTION: mouseOut( event: event ) void
        };
        self.click = function( event ) {
        // FUNCTION: click( event: event ) void

            // debug info
            self.debug( 'click' );

            // stop propagation
            event.stopPropagation();

            // data changed
            if( mbAdminApp.editDataChanged() ){
                
                // prepare edit
                self.prepareEdit();
                
                // done
                return;
                
            }
            // data changed
            
            // edit
            self.edit();
            
        // DONE FUNCTION: click( event: event ) void
        };
        self.prepareEdit = function( ) {
        // FUNCTION: prepareEdit( void ) void
        
            // create message options
            let messageOptions = {
                'title'         :   'Data not saved.',
                'message'       :   'Select cancel to return',
                'buttons' : {
                    'ok' : {
                        'callback'  :   self.edit
                    },
                    'cancel' : {} 
                }
            };
            // create options

            // show dialog
            mbAdminApp.showMessageDialog( messageOptions );

        // DONE FUNCTION: prepareEdit( named array: options ) void
        };
        self.edit = function( ) {
        // FUNCTION: edit( void ) void
        
            // copy callback
            let callback = self.callbacks['new'];
            
            // call callback
            callback();

        // DONE FUNCTION: edit( named array: options ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            
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
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: newButtonModule( html element id: parentId, 
    //                               named array: buttonOptions, 
    //                               named array: listOptions,
    //                               named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
