/*
    @package        SiteAnimator\Admin

    function:       displays the next button of the date select of the list template

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.content.templates.edit.select.list.selections.dateSelect;
    
    // MODULE: nextButtonModule( html element id: parentId, 
    //                           named array: buttonOptions, 
    //                           named array: listOptions,
    //                           named array: callbacks ) named array
    nameSpace.nextButtonModule = function( parentId, buttonOptions, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        const self = this;                                          // object
        self.MODULE = 'ContentTemplatesEditSelectListRowSelectDateSelectNextButtonModule';  // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element id
        self.buttonOptions = buttonOptions;                         // named array
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
        self.hoverText = 'Next day';                                // string
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
        // FUNCTION: removeButton( void ) void
            
            // destroy button
            self.button.destruct();
            
            // unset button
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
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'ListSelectionOffset', self.getNextDay() );
            
            // copy callback
            const callback = self.callbacks['select'];
            
            // call callback
            callback();

        // DONE FUNCTION: click( event: event ) void
        };
        self.getNextDay = function( ) {
        // FUNCTION: getNextDay( void ) void

            // get date
            const dateString = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListSelectionOffset' );
            
            // parse json
            const selectedDate = JSON.parse( dateString );
            
            // create date
            const date = new Date( selectedDate['year'], selectedDate['month'] - 1, selectedDate['day'] + 1);
            
            // create result
            const result = {
                'year'  :   date.getFullYear(),
                'month' :   date.getMonth() + 1,
                'day'   :   date.getDate()
            };
            // create result

            // return result string
            return JSON.stringify( result );
            
        // DONE FUNCTION: getNextDay( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void

            // remove button
            self.removeButton();
            
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
    //                                named array: listOptions,
    //                                named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
