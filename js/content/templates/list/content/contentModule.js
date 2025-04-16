/*
        @package        Pleisterman/MbAdmin
  
        function:       displays a the content of the items list 
  
        Last revision:  02-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.list;
    
    // create name space
    nameSpace.content = nameSpace.content ? nameSpace.content : {};
    
    // MODULE: contentModule( html element id: parentId, 
    //                        named array: listOptions ) named array  
    nameSpace.content.contentModule = function( parentId, listOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesListsContentModule';     // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.containerOptions = {                               // named array 
            'id'                :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'           :   'div',                      // html element type 
            'display'           :   'none',                     // css
            'position'          :   'relative',                 // css
            'width'             :   '100%',                     // css
            'backgroundColor'   :   mbAdminApp.getColor( 'lightest' ).color // css
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
                'background' : {                                // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                              // done named array
                'border' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'dark' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'dark' ).highlight // color
                }                                               // done named array
            }                                                   // done named array
        };                                                      // done named array 
        self.rows = {};                                         // named array / null                                                      
        self.data = null;                                       // named array / null      
        self.selectedRowId = null;                              // integter / null                                                
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add container
            self.addContainer();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addContainer = function() {
        // FUNCTION: addContainer( void ) void
            
            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                
        // DONE FUNCTION: addContainer( void ) void
        };
        self.createRows = function() {
        // FUNCTION: createRows( void ) void
            
            // no rows
            if( !self.data['rows'] ){

                // done
                return;
                
            }
            // no rows
            
            // loop over rows
            Object.entries( self.data['rows'] ).forEach( ( [index, row] ) => {
            
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
            self.rows['row' + row['id']] = new mbAdminApp.ui.buttonModule( self.containerOptions['id'],
                                                                           rowOptions,
                                                                           callbacks );
            // add row
            
        // DONE FUNCTION: createRow( named array: row ) void
        };
        self.rowClick = function( event, options ) {
        // FUNCTION: rowClick( event: event, named array: options ) void

            // debug info
            self.debug( 'select' );
            
            // set selected row id
            self.selectedRowId = options['rowId'];
            
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
            
        // DONE FUNCTION: rowClick( event: event, named array: options ) void
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
        
            // set subject
            mbAdminApp.setUserOption( 'editSubject', self.listOptions['subject'] );

            // get subject
            mbAdminApp.setUserOption( 'editId', self.selectedRowId);

            // call edit
            mbAdminApp.callEvent( 'edit' );

        // DONE FUNCTION: edit( named array: options ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

           
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.open = function() {
        // FUNCTION: open( void ) void

            // debug info
            self.debug( 'open' );
            
            // show container
            mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'block' );
            
        // DONE FUNCTION: open( void ) void
        };
        self.close = function() {
        // FUNCTION: close( void ) void

            // debug info
            self.debug( 'close' );
            
            // hide container
            mbAdminApp.setStyle( self.containerOptions['id'], 'display', 'none' );
            
        // DONE FUNCTION: close( void ) void
        };
        self.setData = function( data ) {
        // FUNCTION: setData( named aray: data ) void
            
            // set data
            self.data = data;
            
            // remove rows
            self.removeRows();
            
            // add rows
            self.createRows();
            
        // DONE FUNCTION: setData( named aray: data ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove rows
            self.removeRows();
            
            // unset data
            self.data = null;
            
            // unset list options
            self.listOptions = null;
            
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
            // FUNCTION: open( void ) void    
            open : function( ){
                
                // call internal
                self.open( );
                
            },
            // FUNCTION: close( void ) void    
            close : function( ){
                
                // call internal
                self.close( );
                
            },
            // FUNCTION: setData( named array: data ) void    
            setData : function( data ){
                
                // call internal
                self.setData( data );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: contentModule( html element id: parentId, 
    //                             named array: listOptions ) named array  
    
})( mbAdminApp );
// done create module function
