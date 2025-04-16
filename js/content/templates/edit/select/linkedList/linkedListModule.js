/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the select template
                        displays a text input with a select window
                        with the selected data
  
        Last revision:  18-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.templates = nameSpace.templates ? nameSpace.templates : {};

    // set name space
    nameSpace = nameSpace.templates;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};
    
    // set name space
    nameSpace = nameSpace.edit;
    
    // create name space
    nameSpace.select = nameSpace.select ? nameSpace.select : {};
    
    // set name space
    nameSpace = nameSpace.select;
    
    // create name space
    nameSpace.linkedList = nameSpace.linkedList ? nameSpace.linkedList : {};
    
    // MODULE: linkedListModule( html element id: parentId, 
    //                           named array: itemOptions ) named array 
    nameSpace.linkedList.linkedListModule = function( parentId, itemOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesEditLinkedListModule';   // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.itemOptions = itemOptions;                         // named array
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'backgroundColor'       :   'transparent'           // css 
        };                                                      // done named array 
        self.itemContainerOptions = {                           // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ItemContainer' ), // string 
            'element'               :   'div',                  // html element type 
            'display'               :   'inline-block',         // css
            'padding'               :   '0.8rem 1.2rem',        // css
            'backgroundColor'       :   'transparent',          // css 
            'border'                :   true,                   // boolean
            'borderStyle'           :   'solid',                // css
            'borderWidth'           :   '0.1rem',               // css
            'borderRadius'          :   '1.0rem',               // css
            'borderColor'           :   mbAdminApp.getColor( 'light' )['transparent-50'] // css
        };                                                      // done named array 
        self.itemContentOptions = {                             // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ItemContent' ), // string 
            'element'               :   'div',                  // html element type 
            'display'               :   'flex'                  // css
        };                                                      // done named array 
        self.labelOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Label' ), // string 
            'element'               :   'div',                  // html element type
            'width'                 :   '7.0rem',               // css
            'fontSize'              :   '1.2rem',               // css
            'paddingTop'            :   '0.4rem',               // css
            'fontWeight'            :   'bold',                 // css
            'paddingRight'          :   '0.8rem',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css
            'backgroundColor'       :   'transparent'           // css 
        };                                                      // done named array
        self.selectOptions = {                                  // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Select' ), // string 
            'element'               :   'div'                   // html element type
        };                                                      // done named array
        self.selectContentOptions = {                           // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'SelectContent' ), // string 
            'element'               :   'div',                  // html element type
            'width'                 :   '230px',                // css
            'height'                :   '6.0rem',               // css
            'border'                :   true,                   // boolean
            'borderStyle'           :   'solid',                // css
            'borderWidth'           :   '0.1rem',               // css
            'borderRadius'          :   '0.1rem',               // css
            'borderColor'           :   mbAdminApp.getColor( 'darkest' ).color // css
        };                                                      // done named array
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
        self.modules = {};                              // named array
        self.rows = {};                                 // named array
        self.selectedRowId = null;                      // integer / null
        self.insertRow = null;                          // named array / null
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // extend options
            self.extendOptions();
            
            // add html
            self.addHtml();
            
            // add rows
            self.addRows();
            
            // add buttons
            self.addButtons();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void
            
            // has display options
            if( self.itemOptions['displayOptions'] ){
            
                // extend label
                self.labelOptions = mbAdminApp.extend( self.labelOptions, self.itemOptions['displayOptions']['label'] );

                // extend select
                self.selectOptions = mbAdminApp.extend( self.selectOptions, self.itemOptions['displayOptions']['select'] );

            }
            // done has display options
            
        // DONE FUNCTION: extendOptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
            // add item container to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.itemContainerOptions );
                        
            // add item content to item container
            mbAdminApp.appendContainer( self.itemContainerOptions['id'], self.itemContentOptions );
                        
            // add label to item content
            mbAdminApp.appendContainer( self.itemContentOptions['id'], self.labelOptions );
                        
            // add select to item content
            mbAdminApp.appendContainer( self.itemContentOptions['id'], self.selectOptions );
                        
            // add select content to select
            mbAdminApp.appendContainer( self.selectOptions['id'], self.selectContentOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove select content
            mbAdminApp.getElementById( self.selectContentOptions['id'] ).remove();
            
            // remove select 
            mbAdminApp.getElementById( self.selectOptions['id'] ).remove();
            
            // remove label
            mbAdminApp.getElementById( self.labelOptions['id'] ).remove();
            
            // remove item content
            mbAdminApp.getElementById( self.itemContentOptions['id'] ).remove();
            
            // remove item container
            mbAdminApp.getElementById( self.itemContainerOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addRows = function() {
        // FUNCTION: addRows( void ) void
            
            // loop over rows
            Object.entries( self.itemOptions['rows'] ).forEach( ( [index, row] ) => {
                
                // create row
                self.createRow( row );
                
            });
            // done loop over rows
            
        // DONE FUNCTION: addRows( void ) void
        };
        self.removeRows = function() {
        // FUNCTION: removeRows( void ) void
            
            // loop over rows
            Object.entries( self.rows ).forEach( ( [index, row] ) => {
                
                // destroy row
                row.destruct();
                
            });
            // done loop over rows
            
            // reset rows
            self.rows = {};
            
        // DONE FUNCTION: removeRows( void ) void
        };
        self.createRow = function( row ) {
        // FUNCTION: createRow( named array: row ) void
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.rowSelect
            };
            // create callbacks
            
            // copy row options
            let rowOptions = mbAdminApp.extend( {}, self.rowOptions );
            
            // set id
            rowOptions['id'] = mbAdminApp.getUiId( self.MODULE + row['id'] );
            
            // set text
            rowOptions['text'] = row['name'];

            // set list type id
            rowOptions['rowId'] = row['id'];

            // add row
            self.rows['row' + row['id']] = new mbAdminApp.ui.buttonModule( self.selectContentOptions['id'],
                                                                           rowOptions,
                                                                           callbacks );
            // add row
            
        // DONE FUNCTION: createRow( named array: row ) void
        };
        self.rowSelect = function( event, options ) {
        // FUNCTION: rowSelect( event: event, named array: options ) void

            // selected id exists
            if( self.selectedRowId !== null ){
                
                // deselect row
                self.rows['row' + self.selectedRowId].deSelect();
                
            }
            // selected id exists

            // set selected row id
            self.selectedRowId = options['rowId'];

            // select row
            self.rows['row' + self.selectedRowId].select();

        // DONE FUNCTION: rowSelect( event: event, named array: options ) void
        };
        self.addButtons = function() {
        // FUNCTION: addbuttons( void ) void

            // get buttons module
            let buttonsModule = nameSpace.linkedList.buttonsModule;
                        
            // create callbacks
            let callbacks = {
                'remove'    :   self.unLink,
                'add'       :   self.openList
            };
            // create callbacks

            // create buttons module
            self.modules['buttons'] = new buttonsModule( self.selectOptions['id'],
                                                         self.itemOptions,
                                                         callbacks );
            // create buttons module
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.removeButtons = function() {
        // FUNCTION: removeButtons( void ) void

            // destroy module
            self.modules['buttons'].destruct();
            
            // unset entry
            delete self.modules['buttons'];

        // DONE FUNCTION: removeButtons( void ) void
        };
        self.unLink = function() {
        // FUNCTION: unLink( void ) void

            // no row selected
            if( self.selectedRowId === null ){

                // show error
                self.showNoRowSelectedError( );
                
                // done
                return;
                
            }
            // no row selected

            // get list options
            let listOptions =  self.itemOptions['listOptions'];

            // create options
            let options = {
                'subject'           :   listOptions['subject'],
                'id'                :   self.itemOptions['selectedId'],
                'linkedId'          :   self.selectedRowId
            };
            // create options

            // ajax call
            mbAdminApp.server.delete( options, self.unLinked );
            
        // DONE FUNCTION: unLink( void ) void
        };
        self.unLinked = function( result ) {
        // FUNCTION: unLinked( named array: result ) void

            // destroy row
            self.rows['row' + self.selectedRowId].destruct();
            
            // unset entry
            delete self.rows['row' + self.selectedRowId];

            // unset selected row id
            self.selectedRowId = null;

            // show message
            self.showDeletedMessage();
            
        // DONE FUNCTION: unLinked( named array: result ) void
        };
        self.openList = function() {
        // FUNCTION: openList( void ) void

            // get list module
            let listModule = nameSpace.list.listModule;

            // create callbacks
            const callbacks = {
                'select'    :   self.link,
                'cancel'    :   self.cancelLink
            };
            // create callbacks
            
            // create list
            self.modules['list'] = new listModule( self.selectOptions['id'],
                                                   self.itemOptions,
                                                   callbacks );
            // create input

        // DONE FUNCTION: openList( void ) void
        };
        self.removeList = function() {
        // FUNCTION: removeList( void ) void

            // destroy list
            self.modules['list'].destruct();
            
            // unset entry
            delete self.modules['list'];

        // DONE FUNCTION: removeList( void ) void
        };
        self.link = function( rowId, name ) {
        // FUNCTION: link( integer: rowId, string: name ) void

            // remember insert row
            self.insertRow = {
                'id'        :   rowId,
                'name'      :   name
            };
            // remember insert row
            
            // get list options
            let listOptions =  self.itemOptions['listOptions'];

            // create options
            let options = {
                'subject'           :   listOptions['subject'],
                'id'                :   self.itemOptions['selectedId'],
                'linkId'            :   rowId
            };
            // create options

            // ajax call
            mbAdminApp.server.insert( options, self.linked );
            
        // DONE FUNCTION: link( integer: rowId, string: name ) void
        };
        self.linked = function( result ) {
        // FUNCTION: linked( named array: result ) void
            
            // remove list
            self.removeList();

            // create row
            self.createRow( self.insertRow );
            
            // unset insert row
            self.insertRow = null;
            
            // show message
            self.showInsertedMessage();
            
        // DONE FUNCTION: linked( named array: result ) void
        };
        self.cancelLink = function() {
        // FUNCTION: cancelLink( void ) void
            
            // remove list
            self.removeList();

        // DONE FUNCTION: cancelLink( void ) void
        };
        self.showNoRowSelectedError = function( ) {
        // FUNCTION: showNoRowSelectedError( void ) void
        
            // get list options
            let listOptions =  self.itemOptions['listOptions'];

            // create options
            let options = {
                'elementId'     :  self.selectOptions['id'], 
                'text'          :  listOptions['errors']['noRowSelected']  
            };
            // create options
        
            mbAdminApp.showErrorText( options );
        
        // DONE FUNCTION: showNoRowSelectedError( void  ) void
        };
        self.showDeletedMessage = function( ) {
        // FUNCTION: showDeletedMessage( void ) void
        
            // get list options
            let listOptions =  self.itemOptions['listOptions'];

            // create options
            let options = {
                'elementId'     :  self.selectOptions['id'], 
                'text'          :  listOptions['messages']['deleted']  
            };
            // create options
        
            mbAdminApp.showHoverText( options );
        
        // DONE FUNCTION: showDeletedMessage( void  ) void
        };
        self.showInsertedMessage = function( ) {
        // FUNCTION: showInsertedMessage( void ) void
        
            // get list options
            let listOptions =  self.itemOptions['listOptions'];

            // create options
            let options = {
                'elementId'     :  self.selectOptions['id'], 
                'text'          :  listOptions['messages']['inserted']  
            };
            // create options
        
            mbAdminApp.showHoverText( options );
        
        // DONE FUNCTION: showInsertedMessage( void  ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove buttons
            self.removeButtons();

            // remove rows
            self.removeRows();

            // remove html
            self.removeHtml();
            
            // unset item options
            self.itemOptions = null;
            
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
            
            // FUNCTION: getElementId( void ) html element id
            getElementId : function( ){
                
                // return result
                return self.selectOptions['id'];
                
            },
            // FUNCTION: changed( void ) boolean
            changed : function( ){
                
                // return not changed
                return false;
                
            },
            // FUNCTION: validate( void ) boolean
            validate : function( ){
                
                // return result
                return true;
                
            },
            // FUNCTION: getId( void ) string
            getId : function( ){
                
                // return result
                return self.itemOptions['id'];

            },
            // FUNCTION: resetValue( void ) void
            resetValue : function( ){
                
                // no action
                
                
            },
            // FUNCTION: getValue( void ) null
            getValue : function( ){
                
                // return null
                return null;
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: linkedListModule( html element id: parentId, 
    //                                named array: itemOptions ) named array  
    
})( mbAdminApp );
// done create module function
