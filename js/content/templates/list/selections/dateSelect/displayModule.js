/*
    @package        Pleisterman/MbAdmin

    function:       Displays the date selected in the date select of the list template

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list.selections.dateSelect;
    
    // MODULE: displayModule( html element id: parentId, 
    //                            integer: left,
    //                            named array: listOptions,
    //                            named array: callbacks ) named array
    nameSpace.displayModule = function( parentId, left, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentTemplatesListDateSelectDisplayModule';  // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element id
        self.listOptions = listOptions;                             // named array
        self.callbacks = callbacks;                                 // named array
        self.containerOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'textAlign'             :   'center',                   // css
            'lineHeight'            :   '25px',                     // css
            'width'                 :   '120px',                    // css
            'height'                :   '25px',                     // css
            'top'                   :   '6px',                      // css
            'left'                  :   left + 'px',                // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                            // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                                  // done named array
                'border' : {                                        // named array
                    'color'         :   mbAdminApp.getColor( 'darker' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'darkest' ).highlight // color
                }                                                   // done named array
            },                                                      // done named array
            'border'                :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   mbAdminApp.getColor( 'darker' ).color, // css 
            'borderStyle'           :   'groove',                   // css
            'cursor'                :   'pointer'                   // css            
        };                                                          // done named array  
        self.hoverTextAlign = 'right';                              // string
        self.hoverText = 'Open date selection';                     // string
        self.dateDisplayOptions = {                                 // named array
            'align'                 :   'center'                    // string
        };                                                          // done named array
        self.display = null;                                        // module / null
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

            // get text
            self.containerOptions['text'] = self.getText();
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   self.mouseOver,
                'mouseOut'      :   self.mouseOut,
                'click'         :   self.click
            };
            // create callbacks
            
            // add display
            self.display = new mbAdminApp.ui.buttonModule( self.parentId,
                                                           self.containerOptions,
                                                           callbacks );
            // add display
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // destroy display
            self.display.destruct();
            
            // unset display
            self.display = null;
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.getText = function() {
        // FUNCTION: getText( void ) string
                    
            // get date
            const dateString = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListSelectionOffset' );
            
            // parse json
            const date = JSON.parse( dateString );
            
            // create text
            const text = mbAdminApp.getDateString( date );
                        
            // return result
            return text;

        // DONE FUNCTION: getText( void ) string
        };
        self.mouseOver = function( event ) {
        // FUNCTION: mouseOver( event: event ) void

            // debug info
            self.debug( 'mouseOver' );

            // create options
            const options = {
                'elementId' :   self.containerOptions['id'],
                'text'      :   self.hoverText,
                'align'     :   self.hoverTextAlign
            };
            // create options
            
            // show hover text
            mbAdminApp.showHoverText( options );
            
        // DONE FUNCTION: activeButtonMouseOver( event: event ) void
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
            
            // get date
            const dateString = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListSelectionOffset' );
            
            // parse json
            const date = JSON.parse( dateString );
            
            // create options
            const options = {
                'elementId'         : self.containerOptions['id'],
                'displayOptions'    : self.dateDisplayOptions,
                'date'              : date,
                'callbacks' : {
                    'select'        : self.select
                }
            };
            // create options
            
            // show date picker
            mbAdminApp.showDatePicker( options );

        // DONE FUNCTION: click( event: event ) void
        };
        self.select = function( date ) {
        // FUNCTION: select( named aray: date ) void

            // create date string
            const dateString = JSON.stringify( date );
        
            // set user option
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'ListSelectionOffset', dateString );
           
            // copy callback
            const callback = self.callbacks['select'];
            
            // call callback
            callback();
            
        // DONE FUNCTION: select( named aray: date ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // remove html
            self.removeHtml();
            
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
    // DONE MODULE: displayModule( html element id: parentId, 
    //                             integer: left,
    //                             named array: listOptions,
    //                             named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
