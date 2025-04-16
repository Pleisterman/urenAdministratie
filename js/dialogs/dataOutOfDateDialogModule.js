/*
        @package        Pleisterman/MbAdmin
  
        function:       controls the dialog for the data out of date dialog 
                        for the application mbAdminApp
                        the dialog is shown when the user tries to change data that has already
                        changed in another instance of the application
                        The dialog present the user a choice between:
                        close this dialog do nothing
                        close this dialog open the actual data in the current instance through
                        the provided callback
                        close this dialog and open the actual data in a new instance

        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.dialogs;
    
    // MODULE: dataOutOfDateDialogModule( void ) named array
    nameSpace.dataOutOfDateDialogModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'DialogsDataOutOfDateDialogModule';           // string
        self.debugOn = false;                                       // boolean
        self.callback = null;                                       // function / null
        self.canClose = true;                                       // boolean
        self.visible = false;                                       // boolean
        self.outOfDateLayerOptions = {                              // named array
            'id'                    :   self.MODULE + 'Layer',      // string
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'display'               :   'none',                     // css
            'top'                   :   0,                          // integer
            'left'                  :   0,                          // integer
            'height'                :   '100%',                     // css
            'width'                 :   '100%',                     // css
            'backgroundColor'       :   mbAdminApp.colors['overlayBackgroundColor']['color'], // css 
            'zIndex'                :   mbAdminApp.getSetting( 'zIndexOutOfDateLayer' ).toString() // string
        };                                                          // done named array
        self.dialogOptions = {                                      // named array
            'id'                    :   self.MODULE + 'Dialog',     // string
            'element'               :   'div',                      // html element type 
            'overflow'              :   'hidden',                   // css
            'position'              :   'absolute',                 // css
            'width'                 :   '44em',                     // css
            'border'                :   mbAdminApp.getSetting( 'dialogBorder' ), // boolean
            'borderWidth'           :   mbAdminApp.getSetting( 'dialogBorderWidth' ), // css
            'borderColor'           :   mbAdminApp.colors['dialogBorderColor']['color'], // css
            'borderStyle'           :   mbAdminApp.getSetting( 'dialogBorderStyle' ), // css
            'borderRadius'          :   mbAdminApp.getSetting( 'dialogBorderRadius' ), // css
            'backgroundColor'       :   mbAdminApp.colors['dialogBackgroundColor']['color'] // css
        };                                                          // done named array
        self.scrollContainerOptions = {                             // named array
            'id'                    :   self.MODULE + 'DialogScollContainer', // string
            'element'               :   'div',                      // html element type 
            'margin'                :   20,                         // css
            'overflowY'             :   'auto',                     // css
            'height'                :   '14.5em',                   // css
            'maximumMargin'         :   50                          // integer
        };                                                          // done named array
        self.headerContainerOptions = {                             // named array
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string
            'element'               :   'div'                       // html element type 
        };                                                          // done named array
        self.headerOptions = {                                      // named array
            'id'                    :   self.MODULE + 'DialogHeader', // string
            'element'               :   'div',                      // html element type 
            'text'                  :   mbAdminApp.translations['outOfDateHeader'], // string
            'fontSize'              :   mbAdminApp.getSetting( 'dialogHeaderFontSize' ), // css
            'fontWeight'            :   mbAdminApp.getSetting( 'dialogHeaderFontWeight' ), // css
            'color'                 :   mbAdminApp.colors['dialogHighlightColor']['color'], // css
            'marginLeft'            :   mbAdminApp.getSetting( 'dialogHeaderMarginLeft' ), // css
            'marginBottom'          :   mbAdminApp.getSetting( 'dialogHeaderMarginBottom' ), // css
            'padding'               :   mbAdminApp.getSetting( 'dialogHeaderPadding' ) // css
        };                                                          // done named array
        self.messageContainerOptions = {                            // named array
            'id'                    :   self.MODULE + 'DialogMessageContainer',  // string
            'element'               :   'div',                      // html element type 
            'marginBottom'          :   '0.8em',                    // css
            'minimumHeight'         :   '9.9em'                     // css
        };                                                          // done named array
        self.messageOptions = {                                     // named array
            'id'                    :   self.MODULE + 'DialogMessage', // string
            'element'               :   'div',                      // html element type 
            'text'                  :   mbAdminApp.translations['outOfDateMessage'], // string
            'fontSize'              :   mbAdminApp.getSetting( 'dialogMessageFontSize' ), // css
            'fontWeight'            :   mbAdminApp.getSetting( 'dialogMessageFontWeight' ), // css
            'marginLeft'            :   mbAdminApp.getSetting( 'dialogMessageMarginLeft' ), // css
            'paddingLeft'           :   mbAdminApp.getSetting( 'dialogMessagePaddingLeft' ), // css
            'paddingRight'          :   mbAdminApp.getSetting( 'dialogMessagePaddingRight' ) // css
        };                                                          // done named array
        self.buttonContainerOptions = {                             // named array
            'id'                    :   self.MODULE + 'DialogButtonContainer', // string
            'element'               :   'div',                      // html element type 
            'backgroundColor'       :   'transparent'               // css
        };                                                          // done named array
        self.buttonOptions = {                                      // named array
            'element'               :   'div',                      // html element type 
            'display'               :   'inline-block',             // css
            'minimumWidth'          :   '4.0em',                    // css
            'color'                 :   mbAdminApp.colors['buttonColor']['color'],           // css color: color
            'backgroundColor'       :   mbAdminApp.colors['buttonBackgroundColor']['color'], // css
            'fontSize'              :   mbAdminApp.getSetting( 'buttonFontSize' ), // css
            'fontWeight'            :   mbAdminApp.getSetting( 'buttonFontWeight' ), // css
            'padding'               :   mbAdminApp.getSetting( 'dialogButtonPadding' ), // css
            'marginTop'             :   mbAdminApp.getSetting( 'dialogButtonMarginTop' ), // css
            'marginBottom'          :   mbAdminApp.getSetting( 'dialogButtonMarginBottom' ), // css
            'border'                :   true,                       // boolean
            'borderWidth'           :   mbAdminApp.getSetting( 'buttonBorderWidth' ), // css
            'borderColor'           :   mbAdminApp.colors['buttonBorderColor']['color'], // css
            'borderStyle'           :   mbAdminApp.getSetting( 'buttonBorderStyle' ), // css
            'borderRadius'          :   mbAdminApp.getSetting( 'buttonBorderRadius' ), // css
            'cursor'                :   'pointer',                  // css
            'textAlign'             :   'center'                    // css
        };                                                          // done named array
        self.buttonSpacingOptions = {                               // named array
            'element'               :   'div',                      // html element type 
            'display'               :   'inline-block',             // css
            'width'                 :   '6.0em'                     // css
        };                                                          // done named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add events
            self.addEvents();
            
            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show out of date
            mbAdminApp.showOutOfDateDialog = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            // add update colors
            mbAdminApp.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add out of date layer
            $( document.body ).append( mbAdminApp.jsonToElementHtml( self.outOfDateLayerOptions ) );

            // add the dialog
            $( '#' + self.outOfDateLayerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.dialogOptions ) );
            
            // add the scroll container
            $( '#' + self.dialogOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.scrollContainerOptions ) );

            // add header container
            $( '#' + self.scrollContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.headerContainerOptions ) );

            // add header 
            $( '#' + self.scrollContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.headerOptions ) );

            // add message container
            $( '#' + self.scrollContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.messageContainerOptions ) );

            // add message 
            $( '#' + self.messageContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.messageOptions ) );
            
            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonContainerOptions ) );

            // add buttons
            self.addButtons();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'cancel';
            self.buttonOptions['text'] =  mbAdminApp.translations['outOfDateCancel'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );
            // add button spacing
            self.buttonSpacingOptions['id'] = self.dialogOptions['id'] + 'spacingcancel';
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonSpacingOptions ) );
            // done add cancel button

            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'openInNewWindow';
            self.buttonOptions['text'] =  mbAdminApp.translations['outOfDateOpenInNewWindow'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );
            // add button spacing
            self.buttonSpacingOptions['id'] = self.dialogOptions['id'] + 'spacingopenInNewWindow';
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonSpacingOptions ) );
            // done add cancel button

            // add reload button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'reload';
            self.buttonOptions['text'] =  mbAdminApp.translations['outOfDateReload'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );
            // done add reload button
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add cancel button events
            let idCancel = self.dialogOptions['id'] + 'cancel';
            $( '#' + idCancel ).mouseover( function( event ){ self.buttonMouseOver( idCancel ); }); 
            $( '#' + idCancel ).mouseout( function( event ){ self.buttonMouseOut( idCancel ); }); 
            $( '#' + idCancel ).click( function( event ){ self.cancel(); }); 
            // done add cancel button events

            // add open in new window button events
            let idOpen = self.dialogOptions['id'] + 'openInNewWindow';
            $( '#' + idOpen ).mouseover( function( event ){ self.buttonMouseOver( idOpen ); }); 
            $( '#' + idOpen ).mouseout( function( event ){ self.buttonMouseOut( idOpen ); }); 
            $( '#' + idOpen ).click( function( event ){ self.openInNewWindow(); }); 
            // done add open in new window button events

            // add reload button events
            let id = self.dialogOptions['id'] + 'reload';
            $( '#' + id ).mouseover( function( event ){ self.buttonMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.buttonMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.reload(); }); 
            // done add reload button events
             
        // DONE FUNCTION: addEvents( void ) void
       };
        self.buttonMouseOver = function(  id ){ 
        // FUNCTION: buttonMouseOver( string: element id ) void
            
            // mouse over -> background color highlight
            mbAdminApp.setStyle( id, 'background-color', mbAdminApp.colors['buttonHighlightBackgroundColor']['color'] );
            
            // mouse over -> color highlight
            mbAdminApp.setStyle( id, 'color', mbAdminApp.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( string: element id  ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( string: element id  ) void
            
            // mouse out -> background color default
            mbAdminApp.setStyle( id, 'background-color', mbAdminApp.colors['buttonBackgroundColor']['color'] );
            
            // mouse out -> color default
            mbAdminApp.setStyle( id, 'color', mbAdminApp.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( string: element id  ) void
        };
        self.cancel = function( ){
        // FUNCTION: cancel( void ) void
            
            // debug info
            self.debug( 'cancel' );
            
            // hide the dialog
            self.hide( );
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.openInNewWindow = function( ){
        // FUNCTION: openInNewWindow( void ) void
            
            // debug info
            self.debug( 'openInNewWindow' );
            
            // hide the dialog
            self.hide( );
            
            // open up to date data in new window
            open( '/' + mbAdminApp.baseDirectory + '/' + mbAdminApp.workDirectory, '_blank' );
            
        // DONE FUNCTION: openInNewWindow( void ) void
        };
        self.reload = function( ){
         // FUNCTION: reload( void ) void
            
            // debug info
            self.debug( 'reload' );
            
            // hide the dialog
            self.hide( );
            
            // call callback
            if( self.callback ){
                
                
                // copy callback
                let callback = self.callback;
                
                // unset callback
                self.callback = null;
                
                // call callback
                callback( );
                
            }
            // done call callback
            
        // DONE FUNCTION: reload( void ) void
        };
        self.show = function( callback ){
        // FUNCTION: show( function: callback ) void
            
            
            // save callback
            self.callback = callback;
            
            // show the dialog
            mbAdminApp.setStyle( self.outOfDateLayerOptions['id'], 'display', 'block' );
            
            // remember visibility
            self.visible = true;
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( function: callback ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // hide layer
            mbAdminApp.setStyle( self.outOfDateLayerOptions['id'], 'display', 'none' );
            
            // remember visibility
            self.visible = false;
            
        // DONE FUNCTION: hide( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // !visible
            if( !self.visible ){
                
                // done
                return;
                
            }
            // done !visible

            // get window dimensions
            let windowDimensions = mbAdminApp.getWindowDimensions( );
            
            // set dimensions for dialog
            mbAdminApp.setStyle( self.dialogOptions['id'], 'max-width', windowDimensions.width );
            mbAdminApp.setStyle( self.dialogOptions['id'], 'max-height', windowDimensions.height );
            // done set dimensions for dialog

            // calculate and set height off the scrollcontainer
            let height = windowDimensions.height;
            height -= self.scrollContainerOptions['margin'] * 2;
            height -= self.scrollContainerOptions['maximumMargin']; 
            mbAdminApp.setStyle( self.scrollContainerOptions['id'], 'height', self.scrollContainerOptions['height'] );
            // calculate and set height off the scrollcontainer
            
            // get scroll container layout
            let scrollContainerLayout = mbAdminApp.getElementById( self.scrollContainerOptions['id'] ).getBoundingClientRect();
            
            // get message container layout
            let messageContainerLayout = mbAdminApp.getElementById( self.messageContainerOptions['id'] ).getBoundingClientRect();
            
            // calcukate and set content height
            let totalContainerHeight = scrollContainerLayout.height;
            totalContainerHeight += messageContainerLayout.height;
            
            // total container height > height / else
            if(  totalContainerHeight > height ){
                
                // set height
                mbAdminApp.setStyle( self.scrollContainerOptions['id'], 'height',  height + 'px' );
                
            }
            else {
                
                // set height
                mbAdminApp.setStyle( self.scrollContainerOptions['id'], 'height', totalContainerHeight + 'px' );
                
            }
            // total container height > height / else

            // calculate and set button positions
            let totalWidth = 0;
            totalWidth += $( '#' + self.dialogOptions['id'] + 'cancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'spacingcancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'openInNewWindow' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'spacingopenInNewWindow' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'reload' ).outerWidth();
            let margin = ( $( '#' + self.scrollContainerOptions['id'] ).width() - totalWidth ) / 2;
            $( '#' + self.dialogOptions['id'] + 'cancel' ).css( 'marginLeft', margin + 'px' );
            // done calculate and set button positions
        
        
            // set position for dialog
            let top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            let left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for dialog
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update dialog colors
            self.dialogOptions['backgroundColor'] =  mbAdminApp.colors['dialogBackgroundColor']['color'];
            self.dialogOptions['borderColor'] =  mbAdminApp.colors['dialogBorderColor']['color'];
            $( '#' + self.dialogOptions['id'] ).css( 'background-color', mbAdminApp.colors['dialogBackgroundColor']['color'] );
            $( '#' + self.dialogOptions['id'] ).css( 'border-color', mbAdminApp.colors['dialogBorderColor']['color'] );
            // done update dialog colors

            // update header colors
            self.headerOptions['color'] =  mbAdminApp.colors['dialogHighlightColor']['color'];
            $( '#' + self.headerOptions['id'] ).css( 'color', mbAdminApp.colors['dialogHighlightColor']['color'] );
            // done update header colors
            
            // update button colors
            self.buttonOptions['backgroundColor'] =  mbAdminApp.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['color'] =  mbAdminApp.colors['buttonColor']['color'];
            self.buttonOptions['borderColor'] =  mbAdminApp.colors['buttonBorderColor']['color'];
            
            let id = self.dialogOptions['id'] + 'cancel';
            $( '#' + id ).css( 'background-color', mbAdminApp.colors['buttonBackgroundColor']['color'] );
            $( '#' + id ).css( 'color', mbAdminApp.colors['buttonColor']['color'] );
            $( '#' + id ).css( 'border-color', mbAdminApp.colors['buttonBorderColor']['color'] );
            
            id = self.dialogOptions['id'] + 'openInNewWindow';
            $( '#' + id ).css( 'background-color', mbAdminApp.colors['buttonBackgroundColor']['color'] );
            $( '#' + id ).css( 'color', mbAdminApp.colors['buttonColor']['color'] );
            $( '#' + id ).css( 'border-color', mbAdminApp.colors['buttonBorderColor']['color'] );

            id = self.dialogOptions['id'] + 'reload';
            $( '#' + id ).css( 'background-color', mbAdminApp.colors['buttonBackgroundColor']['color'] );
            $( '#' + id ).css( 'color', mbAdminApp.colors['buttonColor']['color'] );
            $( '#' + id ).css( 'border-color', mbAdminApp.colors['buttonBorderColor']['color'] );
            // done update button colors
            
        // DONE FUNCTION: updateColors( void ) void
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
    // DONE MODULE: dataOutOfDateDialogModule( void ) named array
    
})( mbAdminApp );
// done create module function
