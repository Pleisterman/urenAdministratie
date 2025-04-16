/*
    @package        Pleisterman/MbAdmin
  
    function:       displays a select of the list template

    Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list.selections;
    
    // create name space
    nameSpace.select = nameSpace.select ? nameSpace.select : {};
    
    // MODULE: selectModule( html element id: listId, 
    //                       named array: listTypes,
    //                       named array: listOptions,
    //                       named array: callbacks ) named array 
    nameSpace.select.selectModule = function( listId, listTypes, listOptions, callbacks ) {
        // PRIVATE:
        
        // MEMBERS
        const self = this;                              // object
        self.MODULE = 'ContentTemplatesListSelectionsSelectModule'; // string
        self.debugOn = false;                           // boolean
        self.listId = listId;                           // html element id
        self.listOptions = listOptions;                 // named array 
        self.listTypes = listTypes;                     // named array 
        self.callbacks = callbacks;                     // named array
        self.containerOptions = {                       // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',              // html element type 
            'position'          :   'absolute'          // css
        };                                              // done named array 
        self.contentOptions = {                         // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Content' ), // string 
            'element'           :   'div',              // html element type 
            'position'          :   'relative',         // css
            'minimumWidth'      :   '200px',            // css
            'backgroundColor'   :   mbAdminApp.getColor( 'light' ).color, // css
            'borderRadius'      :   '3px',              // css
            'border'            :   true,               // boolean
            'borderWidth'       :   '1px',              // css
            'borderColor'       :   mbAdminApp.getColor( 'darkest' ).color, // css 
            'borderStyle'       :   'groove',           // css
            'boxShadow'         :   '1px 1px 0.0px 1px rgba( 55, 95, 55, 0.2 )' // css 
        };                                              // done named array 
        self.titleOptions = {                           // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Text' ), // string 
            'element'           :   'div',              // html element type 
            'text'              :   'List selection',   // string
            'fontSize'          :   '1.2rem',           // css
            'textAlign'         :   'center',           // css
            'paddingTop'        :   '7px',              // css
            'paddingBottom'     :   '7px',              // css
            'color'             :   mbAdminApp.getColor( 'darkest' ).color,
            'backgroundColor'   :   'transparent'       // css
        };                                              // done named array 
        self.rowOptions = {                             // named array
            'element'           :   'div',              // html element type 
            'paddingLeft'       :   '7px',              // css
            'paddingTop'        :   '7px',              // css
            'paddingBottom'     :   '7px',              // css
            'borderTop'         :   true,               // boolean
            'borderBottom'      :   true,               // boolean
            'borderWidth'       :   '1px',              // css
            'borderColor'       :   mbAdminApp.getColor( 'dark' ).color, // css 
            'borderStyle'       :   'groove',           // css
            'cursor'            :   'pointer',          // css            
            'color'             :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'   :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                // named array
                'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'background' : {                        // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                      // done named array
                'border' : {                            // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                }                                       // done named array
            }                                           // done named array
        };                                              // done named array                                                          
        self.selectedColors = {                         // named array
            'color'             :   mbAdminApp.getColor( 'lightest' ).selected, // css 
            'backgroundColor'   :   mbAdminApp.getColor( 'dark' ).selected, // css 
            'colors' : {                                // named array
                'color'             :   mbAdminApp.getColor( 'lightest' ).selected, // color
                'background' : {                        // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).selected // color
                },                                      // done named array
                'border' : {                            // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).selected // color
                }                                       // done named array
            }                                           // done named array
        };                                              // done named array                                                          
        self.displayOptions = {                         // named array
            'defaultAlign'      :   'center',           // string
            'minimumTop'        :   45,                 // integer
            'spacingLeft'       :    -20,               // integer
            'spacingRight'      :    8,                 // integer
            'spacingTop'        :    32,                // integer
            'spacingBottom'     :    32                 // integer
        };                                              // done named array 
        self.parentId = mbAdminApp.getTopOverlayId();   // html element id
        self.rows = {};                                 // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // show
            self.show();
            
            // add events
            self.addEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );
            
            // add container to overlay
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );

            // add content to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.contentOptions );

            // add title to container
            mbAdminApp.appendContainer( self.contentOptions['id'], self.titleOptions );

            // add rows
            self.addRows();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove rows
            self.removeRows();
            
            // remove title
            mbAdminApp.getElementById( self.titleOptions['id'] ).remove();
            
            // remove content
            mbAdminApp.getElementById( self.contentOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addRows = function() {
        // FUNCTION: addRows( void ) void
            
            // loop over list types
            Object.entries( self.listOptions['listTypes'] ).forEach( ( [index, listType] ) => {
                
                // create row
                self.createRow( listType );
                
            });
            // done loop over list types
            
        // DONE FUNCTION: addRows( void ) void
        };
        self.removeRows = function() {
        // FUNCTION: removeRows( void ) void
            
            // loop over list types
            Object.entries( self.listOptions['listTypes'] ).forEach( ( [index, listType] ) => {
                
                // destroy row
                self.rows[listType].destruct();
                
            });
            // done loop over list types
            
            // reset rows
            self.rows = {};
            
        // DONE FUNCTION: removeRows( void ) void
        };
        self.createRow = function( listType ) {
        // FUNCTION: createRow( string: listType ) void
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.click
            };
            // create callbacks
            
            // copy row options
            let rowOptions = mbAdminApp.extend( {}, self.rowOptions );
            
            // set id
            rowOptions['id'] = mbAdminApp.getUiId( self.MODULE + listType );
            
            // set text
            rowOptions['text'] = self.listTypes[listType]['title'];

            // set list type id
            rowOptions['listTypeId'] = listType;

            // get current selection
            const selectedListType = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListType' );
            
            // is selected list type
            if( selectedListType === listType ){

                // select row
                rowOptions = mbAdminApp.extend( rowOptions, self.selectedColors );
                
            }
            // is selected list type
            
            // add row
            self.rows[listType] = new mbAdminApp.ui.buttonModule( self.contentOptions['id'],
                                                                  rowOptions,
                                                                  callbacks );
            // add row
            
        // DONE FUNCTION: createRow( string: listType ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
            
            // debug info
            self.debug( 'addEvents' );
            
            // add click
            mbAdminApp.getElementById( self.parentId ).addEventListener( 'click', self.cancel ); 
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void
            
            // debug info
            self.debug( 'removeEvents' );
            
            // remove click
            mbAdminApp.getElementById( self.parentId ).removeEventListener( 'click' , self.cancel ); 
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.click = function( event, options ) {
        // FUNCTION: click( event: event, named array: options ) void

            // debug info
            self.debug( 'select' );
            
            // set list type
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'ListType', options['listTypeId'] );

            // reset row offset
            self.resetRowOffset( options );

            // reset date offset
            self.resetDateOffset( options );

            // call callback
            self.callbacks['select']();

        // DONE FUNCTION: click( event: event, named array: options ) void
        };
        self.resetRowOffset = function( options ) {
        // FUNCTION: resetRowOffset( named array: options ) void

            // ! row select
            if( !self.listTypes[options['listTypeId']]['rowSelect'] ){
                
                // done
                return;
                
            }
            // ! row select

            // reset offset
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'ListSelectionOffset', 0 );

        // DONE FUNCTION: resetRowOffset( named array: options ) void
        };
        self.resetDateOffset = function( options ) {
        // FUNCTION: resetDateOffset( named array: options ) void

            // ! date select
            if( !self.listTypes[options['listTypeId']]['dateSelect'] ){
                
                // done
                return;
                
            }
            // ! date select

            // get date
            let date = new Date();
            
            // create date array
            let dateArray = {
                'year'      :   date.getFullYear(),
                'month'     :   date.getMonth() + 1,
                'day'       :   date.getDate()
            };
            // create date array
            
            // create date string
            const dateString = JSON.stringify( dateArray );

            // reset offset
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'ListSelectionOffset', dateString );

        // DONE FUNCTION: resetDateOffset( named array: options ) void
        };
        self.cancel = function( event, options ) {
        // FUNCTION: cancel( event: event, named array: options ) void

            // debug info
            self.debug( 'cancel' );
            
            // call callback
            self.callbacks['cancel']();

        // DONE FUNCTION: cancel( event: event, named array: options ) void
        };
        self.show = function( ) {
        // FUNCTION: show( void ) void
            
            // debug info
            self.debug( 'show' );
            
            // show layer
            mbAdminApp.setStyle( self.parentId, 'display', 'block' );

            // adjust layout 
            self.layoutChange();
            
        // DONE FUNCTION: show( void ) void
        };
        self.hide = function() {
        // FUNCTION: hide( void ) void
            
            // debug info
            self.debug( 'hide' );
            
            // hide layer
            mbAdminApp.setStyle( self.parentId, 'display', 'none' );

        // DONE FUNCTION: hide( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // container ! exists
            if( !mbAdminApp.getElementById( self.containerOptions['id'] ) ){
                
                // done
                return;
                
            }
            // container ! exists

            // get window layout
            const windowLayout = mbAdminApp.getWindowDimensions();
            
            // get caller layout
            const callerLayout = mbAdminApp.getElementById( self.listId ).getBoundingClientRect();
            
            // get container layout
            const containerLayout = mbAdminApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();
            
            // create left
            let left = callerLayout.left;
            
            // add caller width
            left += callerLayout.width / 2;

            // add spacing left
            left += self.displayOptions['spacingLeft'];
                
            // set minimum
            left = Math.max( left, self.displayOptions['spacingLeft'] );
       
            // set left
            mbAdminApp.setStyle( self.containerOptions['id'], 'left', left + 'px' );
            
            // calculate top
            let top = callerLayout.top - containerLayout.height + self.displayOptions['spacingTop'];
       
            // set minimum
            top = Math.max( top, self.displayOptions['spacingTop'] );
       
            // set maximum
            top = Math.min( top, windowLayout.height - ( containerLayout.height + self.displayOptions['spacingBottom'] ) );
       
            // set top
            mbAdminApp.setStyle( self.containerOptions['id'], 'top', top + 'px' );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // debug info
            self.debug( 'destruct' );
            
            // hide
            self.hide();

            // remove html
            self.removeHtml();
            
            // remove events
            self.removeEvents();
            
            // unset list options
            self.listOptions = null;
            
            // unset list types
            self.listTypes = null;
            
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
    // DONE MODULE: selectModule( html element id: listId,
    //                            named array: listTypes,
    //                            named array: listOptions,
    //                            named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
