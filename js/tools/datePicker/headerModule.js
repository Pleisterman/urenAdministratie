/*
    @package        Pleisterman/MbAdmin
  
    function:       displays the header of the date picker
                    and handels the events

    Last revision:  28-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.tools.datePicker;
        
    // MODULE: headerModule( html element id: parentId, 
    //                       named array: date, 
    //                       named array: callbacks ) named array 
    nameSpace.headerModule = function( parentId, date, callbacks ) {
        // PRIVATE:
        
        // MEMBERS
        const self = this;                          // object
        self.MODULE = 'DatePickerHeaderModule';     // string
        self.debugOn = false;                       // boolean
        self.parentId = parentId;                   // html element id
        self.date = {                               // named array 
            'year'              : date['year'],     // integer
            'month'             : date['month'],    // integer
            'day'               : date['day']       // integer
        };                                          // done named array 
        self.callbacks = callbacks;                 // named array 
        self.buttonOptions = {                      // named array 
            'element'           :   'div',          // html element type 
            'text'              :   '&nbsp;',       // string
            'width'             :   '1.6rem',       // css
            'padding'           :   '0.2rem',       // css
            'marginTop'         :   '0.2rem',       // css
            'marginLeft'        :   '0.2rem',       // css
            'marginRight'       :   '0.2rem',       // css
            'backgroundRepeat'  :   'no-repeat',    // css 
            'backgroundPosition':   'center',       // css
            'backgroundSize'    :   '20px',         // css
            'border'            :   true,           // boolean
            'borderRadius'      :   '0.1em',        // css
            'borderColor'       :   mbAdminApp.getColor( 'darker' ).color, // css 
            'borderStyle'       :   'groove',       // css 
            'cursor'            :   'pointer',      // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lighter' ).color, // css
            'color'             :   mbAdminApp.getColor( 'darker' ).color, // css
            'colors' : {                            // named array
                'color'         :   mbAdminApp.getColor( 'darker' ).color, // color
                'highlight'     :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                    // named array
                    'color'     :   mbAdminApp.getColor( 'lighter' ).color, // color
                    'highlight' :   mbAdminApp.getColor( 'lighter' ).highlight // color
                },                                  // done named array
                'border' : {                        // named array
                    'color'     :   mbAdminApp.getColor( 'darker' ).color, // color
                    'highlight' :   mbAdminApp.getColor( 'darker' ).highlight // color
                }                                   // done named array
            }                                       // done named array
        };                                          // done named array 
        self.dateDisplayOptions = {                 // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'DateDisplay' ), // string 
            'element'           :   'div',          // html element type 
            'text'              :   'testink',      // string
            'textAlign'         :   'center',      // string
            'left'              :   '2.0rem',       // css
            'padding'           :   '0.5rem',       // css
            'paddingLeft'       :   '5.5rem',       // css
            'paddingRight'      :   '5.5rem',       // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lighter' ).color, // css
            'color'             :   mbAdminApp.getColor( 'darker' ).color, // css
            'colors' : {                            // named array
                'color'         :   mbAdminApp.getColor( 'darker' ).color, // color
                'highlight'     :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                    // named array
                    'color'     :   mbAdminApp.getColor( 'lighter' ).color, // color
                    'highlight' :   mbAdminApp.getColor( 'lighter' ).highlight // color
                },                                  // done named array
                'border' : {                        // named array
                    'color'     :   mbAdminApp.getColor( 'darker' ).color, // color
                    'highlight' :   mbAdminApp.getColor( 'darker' ).highlight // color
                }                                   // done named array
            }                                       // done named array
        };                                          // done named array 
        self.buttons = {                            // named array 
            'previousYear' : {                      // named array
                'id'            :   mbAdminApp.getUiId( self.MODULE + 'PreviousYear' ), // string
                'imageUrl'      :   'url( ' +  mbAdminApp.options.imageUrl + 'buttonFastPrevious.png )', // string
                'position'      :   'left',         // string
                'hoverText'     :   'Previous year',// string
                'hoverTextAlign':   'right'         // string
            },                                      // done named array
            'previousMonth' : {                     // named array
                'id'            :   mbAdminApp.getUiId( self.MODULE + 'PreviousMonth' ), // string
                'imageUrl'      :   'url( ' +  mbAdminApp.options.imageUrl + 'buttonPrevious.png )', // string
                'position'      :   'left',         // string
                'hoverText'     :   'Previous month', // string
                'hoverTextAlign':   'right'         // string
            },                                      // done named array
            'nextYear' : {                          // named array
                'id'            :   mbAdminApp.getUiId( self.MODULE + 'NextYear' ),   // string
                'imageUrl'      :   'url( ' +  mbAdminApp.options.imageUrl + 'buttonFastNext.png )',  // string
                'position'      :   'right',        // string
                'hoverText'     :   'Next year',    // string
                'hoverTextAlign':   'left'          // string
            },                                      // done named array
            'nextMonth' : {                         // named array
                'id'            :   mbAdminApp.getUiId( self.MODULE + 'NextMonth' ), // string
                'imageUrl'      :   'url( ' +  mbAdminApp.options.imageUrl + 'buttonNext.png )', // string
                'position'      :   'right',        // string
                'hoverText'     :   'Next month',   // string
                'hoverTextAlign':   'left'          // string
            }                                       // done named array
        };                                          // done named array 
        self.modules = {};                          // named array                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add modules
            self.addModules();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addModules = function(){
        // FUNCTION: addModules( void ) void
                        
            // add buttons
            self.addButtons();
                        
            // add date display
            self.addDateDisplay();

            // show date
            self.showDate();

        // DONE FUNCTION: addModules( void ) void
        };
        self.removeModules = function(){
        // FUNCTION: removeModules( void ) void
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {

                // destroy module
                module.destruct();

            });
            // loop over modules

            // reset modules
            self.modules = {};
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.addButtons = function(){
        // FUNCTION: addButtons( void ) void
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   self.buttonMouseOver,
                'mouseOut'      :   self.buttonMouseOut,
                'click'         :   self.buttonClick
            };
            // create callbacks

            // loop over buttons
            Object.entries( self.buttons ).forEach( ( [index, button] ) => {

                // extend button options
                let buttonOptions = mbAdminApp.extend( {}, self.buttonOptions );
            
                // button values
                buttonOptions['id'] = button['id'];
                buttonOptions['float'] = button['position'];
                buttonOptions['imageUrl'] = button['imageUrl'];
                buttonOptions['buttonId'] = index;
                // done button values
            
                // add button
                self.modules[index] = new mbAdminApp.ui.buttonModule( self.parentId,
                                                                      buttonOptions,
                                                                      callbacks );
                // add button

            });
            // loop over buttons            
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.buttonMouseOver = function( event, options ){
        // FUNCTION: buttonMouseOver( event: event, named array: options ) void
            
            // create hover text options
            const hoverTextOptions = {
                'elementId'     :   self.buttons[options['buttonId']]['id'],
                'text'          :   self.buttons[options['buttonId']]['hoverText'],
                'align'         :   self.buttons[options['buttonId']]['hoverTextAlign']
            };
            // create options
            
            // show hover text
            mbAdminApp.showHoverText( hoverTextOptions );

        // DONE FUNCTION: buttonMouseOver( event: event, named array: options ) void
        };
        self.buttonMouseOut = function( event, options ){
        // FUNCTION: buttonMouseOut( event: event, named array: options ) void
            
            
        // DONE FUNCTION: buttonMouseOut( event: event, named array: options ) void
        };
        self.buttonClick = function( event, options ){
        // FUNCTION: buttonClick( event: event, named array: options ) void
            
            // debug info
            self.debug( 'buttonClick' );
        
            // stop propagation
            event.stopPropagation();
            
            // call callback
            self.callbacks[options['buttonId']]();

        // DONE FUNCTION: buttonClick( event: event, named array: options ) void
        };
        self.addDateDisplay = function(){
        // FUNCTION: addDateDisplay( void ) void
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.dateDisplayClick
            };
            // create callbacks
            
            // add button
            self.modules['dateDisplay'] = new mbAdminApp.ui.buttonModule( self.parentId,
                                                                          self.dateDisplayOptions,
                                                                          callbacks );
            // add button
            
        // DONE FUNCTION: addDateDisplay( void ) void
        };
        self.dateDisplayClick = function( event ){
        // FUNCTION: dateDisplayClick( event: event ) void
            
            // debug info
            self.debug( 'click' );
        
            // stop propagation
            event.stopPropagation();

        // DONE FUNCTION: dateDisplayClick( event: event ) void
        };
        self.showDate = function(){
        // FUNCTION: showDate( void ) void
            
            // get month names
            const monthNames = mbAdminApp.getSetting( 'monthNames' ).long.split( ',' );
            
            // create text
            const text = monthNames[self.date['month']-1] + '-' + self.date['year'];
            
            // set text
            mbAdminApp.getElementById( self.dateDisplayOptions['id'] ).innerHTML = text;
            
        // DONE FUNCTION: showDate( void ) void
        };
        self.setDate = function( date ){
        // FUNCTION: setDate( named array: date ) void

            // set date
            self.date['year'] = date['year'];
            self.date['month'] = date['month'];
            self.date['day'] = date['day'];
            // set date
            
            // show date
            self.showDate();
            
        // DONE FUNCTION: setDate( named array: date ) void
        };
        self.destruct = function(){
        // FUNCTION: destruct( void ) void
            
            // remove modules
            self.removeModules();
            
            // unset date
            self.date = null;
            
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

            // FUNCTION: setDate( named array: date ) void    
            setDate : function( date ){
                
                // call internal
                self.setDate( date );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: headerModule( html element id: parentId, 
    //                            named array: date, 
    //                            named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
