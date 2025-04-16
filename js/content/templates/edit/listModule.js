/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the text input template
  
        Last revision:  08-03-2025
 
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
    
    // MODULE: listModule( html element id: parentId, 
    //                     named array: itemOptions ) named array 
    nameSpace.edit.listModule = function( parentId, itemOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesListModule';             // string
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
            'element'               :   'div',                  // html element type
            'max-width'             :   '7.0rem',               // css
            'border'                :   true,                   // boolean
            'borderStyle'           :   'solid',                // css
            'borderWidth'           :   '0.1rem',               // css
            'borderRadius'          :   '0.1rem',               // css
            'borderColor'           :   mbAdminApp.getColor( 'darkest' ).color // css
        };                                                      // done named array
        self.rowOptions = {                                     // named array 
            'element'           :   'div',                      // html element type 
            'position'          :   'relative',                 // css
            'width'             :   '100%',                     // css
            'paddingLeft'       :   '7px',                      // css
            'paddingTop'        :   '7px',                      // css
            'paddingBottom'     :   '7px',                      // css
            'borderTop'         :   true,                       // boolean
            'borderBottom'      :   true,                       // boolean
            'borderWidth'       :   '1px',                      // css
            'borderColor'       :   mbAdminApp.getColor( 'dark' ).color, // css 
            'borderStyle'       :   'groove',                   // css
            'cursor'            :   'pointer',                  // css            
            'color'             :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'   :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                        // named array
                'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight, // color
                'selected'      :   mbAdminApp.getColor( 'darkest' ).selected, // color
                'background' : {                                // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight, // color
                    'selected'      :   mbAdminApp.getColor( 'dark' ).selected // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight, // color
                    'selected'      :   mbAdminApp.getColor( 'dark' ).selected // color
                }                                               // done named array
            }                                                   // done named array
        };                                                      // done named array 
        self.data = null;                                       // named array / null                                                      
        self.rows = {};                                         // named array / null                                                      
        self.modules = {};                                      // named array
        self.selected = null;                                   // string / integer / null
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
            
            // load data is set
            if( self.itemOptions['rowOptions'] &&
                self.itemOptions['rowOptions']['loadData'] ){
            
                // load data
                self.loadData();
            
                // done
                return;
            
            }
            // done load data is set

            // has data
            if( self.itemOptions['rowOptions'] &&
                self.itemOptions['rowOptions']['data'] ){
            
                // set data
                self.data = mbAdminApp.extend( {}, self.itemOptions['rowOptions']['data'] );

                // add rows
                self.addRows();
            
            }
            // has data
            
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

                // extend row
                self.rowOptions = mbAdminApp.extend( self.rowOptions, self.itemOptions['displayOptions']['row'] );

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
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
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
        self.loadData = function() {
        // FUNCTION: loadData( void ) void
            
        // DONE FUNCTION: loadData( void ) void
        };
        self.addRows = function() {
        // FUNCTION: addRows( void ) void
            
            // no rows
            if( !self.data ){

                // done
                return;
                
            }
            // no rows
            
            // loop over rows
            Object.entries( self.data ).forEach( ( [index, row] ) => {
            
                // create row
                self.createRow( row );          
            
            });
            // done loop over rows
            
        // DONE FUNCTION: createRows( void ) void
        };
        self.removeRows = function() {
        // FUNCTION: removeRows( void ) void
            
            // loop over rows
            Object.entries( self.rows ).forEach( ( [index, row] ) => {
            
                // destruct row
                row.destruct();
            
            });
            // done loop over rows
            
            // reset rows
            self.rows = {};
                
        // DONE FUNCTION: removeRows( void ) void
        };
        self.createRow = function( row ) {
        // FUNCTION: createRow( named array: row ) void
            
            // copy row options
            let rowOptions = mbAdminApp.extend( {}, self.rowOptions );
            
            // create callbacks
            const callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.rowClick
            };
            // create callbacks
            
            // set id
            rowOptions['id'] = mbAdminApp.getUiId( self.MODULE + row['id'] );
            
            // set text
            rowOptions['text'] = row['title'];

            // set row id
            rowOptions['rowId'] = row['id'];

            // add row
            self.rows['row' + row['id']] = new mbAdminApp.ui.buttonModule( self.selectOptions['id'],
                                                                           rowOptions,
                                                                           callbacks );
            // add row

            // is current row

            // is current row
            if( row['id'] === self.itemOptions['value'] ){
                
                // select row
                self.rows['row' + row['id']].select();
               
                // set selected
                self.selected = row['id'];
                
            }
            // is current row
            
        // DONE FUNCTION: createRow( named array: row ) void
        };
        self.rowClick = function( event, options ) {
        // FUNCTION: rowClick( event: event, named array: options ) void

            // debug info
            self.debug( 'select' );
            
            // deselect selected
            self.rows['row' + self.selected].deSelect();
            
            // set selected
            self.selected = options['rowId'];
            
            // select selected
            self.rows['row' + self.selected].select();
            
        // DONE FUNCTION: rowClick( event: event, named array: options ) void
        };
        self.changed = function() {
        // FUNCTION: changed( void ) boolean

            // value ! original value
            if( self.getValue() !== self.itemOptions['value'] ){

                // return changed
                return true;
                
            }
            // value ! original value

            // return not changed
            return false;

        // DONE FUNCTION: changed( void ) boolean
        };
        self.validate = function() {
        // FUNCTION: validate( void ) boolean

            // return result
            return true;

        // DONE FUNCTION: validate( void ) boolean
        };
        self.getValue = function() {
        // FUNCTION: getValue( void ) string

            // return result
            return self.selected;

        // DONE FUNCTION: getValue( void ) string
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

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
                
                // return internal call
                return self.changed( );
                
            },
            // FUNCTION: validate( void ) boolean
            validate : function( ){
                
                // return internal call
                return self.validate( );
                
            },
            // FUNCTION: getId( void ) string
            getId : function( ){
                
                // return result
                return self.itemOptions['id'];

            },
            // FUNCTION: getValue( void ) string
            getValue : function( ){
                
                // return internal call
                return self.getValue( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: textModule( html element id: parentId, 
    //                          named array: itemOptions ) named array  
    
})( mbAdminApp );
// done create module function
