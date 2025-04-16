/*
    @package        SiteAnimator\Admin

    function:       displays the next button the row select of the list template

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.content.templates.edit.select.list.selections.rowSelect;
    
    // MODULE: nextButtonModule( html element id: parentId, 
    //                           named array: buttonOptions, 
    //                           named array: data,
    //                           named array: listOptions,
    //                           named array: callbacks ) named array
    nameSpace.nextButtonModule = function( parentId, buttonOptions, data, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        const self = this;                                            // object
        self.MODULE = 'ContentTemplatesEditSelectListRowSelectNextButtonModule'; // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element id
        self.buttonOptions = buttonOptions;                         // named array
        self.data = data;                                           // named array
        self.listOptions = listOptions;                             // named array
        self.callbacks = callbacks;                                 // named array
        self.containerOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Button' ), // string 
            'imageUrl'              :   'url(' + 
                                            mbAdminApp.options.imageUrl + 
                                            'buttonNext.png' +
                                        ')'                         // css
        };                                                          // done named array  
        self.hoverTextAlign = 'right';                              // string
        self.hoverText = 'Next';                                    // string
        self.button = null;                                         // module / null
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
           
            // ! should be displayed
            if( !self.shouldBeDisplayed() ){

                // done
                return;
                
            }
            // ! should be displayed
            
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
        self.shouldBeDisplayed = function() {
        // FUNCTION: shouldBeDisplayed( void ) boolean

            // no data
            if( !self.data['rows'] ||
                !self.data['total'] ){
                
                // return ! should be displayed
                return false;
                
            }
            // no data

            // get number of rows
            const numberOfRows = self.data['rows'].length;

            // get from
            const from = self.data['from'] ? self.data['from'] : 0;

            // calculate to
            const to = from + numberOfRows - 1;

            // to is total
            if( to === self.data['total'] ) {
                
                // return ! should be displayed
                return false;
                
            }
            // to is total
            
            // return should be displayed
            return true;
                
        // DONE FUNCTION: shouldBeDisplayed( void ) boolean
        };
        self.addButton = function() {
        // FUNCTION: addButtons( void ) void
            
            // debug info
            self.debug( 'addButton' );
            
            // create callbacks
            const callbacks = {
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
        self.removeButton = function() {
        // FUNCTION: removeButtons( void ) void
                        
            // button ! exists
            if( !self.button ){

                // done
                return;
                
            }
            // button ! exists
            
            // debug info
            self.debug( 'removeButton' );

            // destroy display
            self.button.destruct();
            
            // unset display
            self.button = null;
            
        // DONE FUNCTION: removeButton( void ) void
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
            const options = {
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
  
            // set user option
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'ListSelectionOffset', self.data['nextPageId'] );
            
            // copy callback
            const callback = self.callbacks['select'];
            
            // call callback
            callback();

        // DONE FUNCTION: click( event: event ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // remove button
            self.removeButton();

            // unset data
            self.data = null;
            
            // unset button options
            self.buttonOptions = null;
            
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
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: nextButtonModule( html element id: parentId, 
    //                                named array: buttonOptions, 
    //                                named array: data,
    //                                named array: listOptions,
    //                                named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
