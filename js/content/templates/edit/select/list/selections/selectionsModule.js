/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the selections of the list template
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.templates.edit.select.list;
    
    // create name space
    nameSpace.selections = nameSpace.selections ? nameSpace.selections : {};
    
    // MODULE: selections( html element id: parentId, 
    //                     named array: listOptions,
    //                     named array: callbacks ) named array  
    nameSpace.selections.selectionsModule = function( parentId, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesEditSelectListSelectionsModule';   // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.callbacks = callbacks;                             // named array
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'position'              :   'relative',             // css
            'width'                 :   '100%',                 // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css
            'borderTop'             :   true,                   // boolean
            'borderBottom'          :   true,                   // boolean
            'borderWidth'           :   '1px',                  // css
            'borderColor'           :   mbAdminApp.getColor( 'dark' ).color, // css 
            'borderStyle'           :   'groove'                // css          
        };                                                      // done named array 
        self.titleOptions = {                                   // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Title' ), // string 
            'element'               :   'div',                  // css
            'textAlign'             :   'center',               // html element type 
            'paddingTop'            :   '6px',                  // css
            'paddingBottom'         :   '4px',                  // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'cursor'                :   'pointer',              // css            
            'colors' : {                                        // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                }                                               // done named array
            }                                                   // done named array
        };                                                      // done named array 
        self.listTypes = {                                      // named array 
            'export' : {                                        // named array 
                'title'             :   ''                      // string
            },                                                  // done named array 
            'lastUsed' : {                                      // named array 
                'title'             :   'Last used',            // string
                'rowSelect'         :   true                    // boolean
            },                                                  // done named array 
            'day' : {                                           // named array 
                'title'             :   'Day',                  // string
                'dateSelect'        :   true                    // boolean
            },                                                  // done named array 
            'dateDesc' : {                                      // named array 
                'title'             :   'Date (newest first)',  // string
                'rowSelect'         :   true                    // boolean
            },                                                  // done named array 
            'dateAsc' : {                                       // named array 
                'title'             :   'Date (oldest first)',  // string
                'rowSelect'         :   true                    // boolean
            },                                                  // done named array 
            'open' : {                                          // named array 
                'title'             :   'Open',                 // string
                'rowSelect'         :   true                    // boolean
            },                                                  // done named array 
            'closed' : {                                        // named array 
                'title'             :   'Closed',               // string
                'rowSelect'         :   true                    // boolean
            }                                                   // done named array 
        };                                                      // done named array 
        self.modules = {};                                      // named array
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

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                                    
            // add title
            self.addTitle();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove title
            self.removeTitle();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addTitle = function() {
        // FUNCTION: addTitle( void ) void

            // get current selection
            const selectedListType = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListType' );
            
            // set text
            self.titleOptions['text'] = self.listTypes[selectedListType]['title'];
                        
            // create callbacks
            let callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.titleClick
            };
            // create callbacks
            
            // add button
            self.modules['title'] = new mbAdminApp.ui.buttonModule( self.containerOptions['id'],
                                                                    self.titleOptions,
                                                                    callbacks );
            // add button
                        
        // DONE FUNCTION: addTitle( void ) void
        };
        self.removeTitle = function() {
        // FUNCTION: removeTitle( void ) void

            // destroy title
            self.modules['title'].destruct();
            
            // unset entry
            delete self.modules['title'];

        // DONE FUNCTION: removeTitle( void ) void
        };
        self.titleClick = function( event ) {
        // FUNCTION: titleClick( event: event ) void

            // stp propagation
            event.stopPropagation();
            
            // create select
            self.createSelect();

        // DONE FUNCTION: titleClick( event: event ) void
        };
        self.createSelect = function() {
        // FUNCTION: createSelect( void ) void

            // debug info
            self.debug( 'createSelect' );

            // get select module
            let selectModule = nameSpace.selections.select.selectModule;

            // create callbacks
            let callbacks = {
                'select'    :   self.selectClick,
                'cancel'    :   self.selectCancel
            };
            // create callbacks            

            // add select
            self.modules['select'] = new selectModule( self.containerOptions['id'],
                                                       self.listTypes,
                                                       self.listOptions,
                                                       callbacks );
            // add select
           
        // DONE FUNCTION: createSelect( void ) void
        };
        self.removeSelect = function( ) {
        // FUNCTION: removeSelect( void ) void

            // select ! exists
            if( !self.modules['select'] ){
                
                // done
                return;
                
            }
            // select ! exists
            
            // destroy select
            self.modules['select'].destruct();

            // unset select
            delete self.modules['select'];

        // DONE FUNCTION: removeSelect( void ) void
        };
        self.selectClick = function( options ) {
        // FUNCTION: selectClick( named array: options ) void

            // load data
            self.callbacks['loadData']( options );

        // DONE FUNCTION: selectClick( named array: options ) void
        };
        self.selectCancel = function() {
        // FUNCTION: selectCancel( void ) void

            // remove select
            self.removeSelect();

        // DONE FUNCTION: selectCancel( void ) void
        };
        self.createRowSelect = function( data ) {
        // FUNCTION: createRowSelect( named aray: data ) void

            // debug info
            self.debug( 'createRowSelect' );

            // get row select module
            let rowSelectModule = nameSpace.selections.rowSelect.rowSelectModule;
            
            // create callbacks
            let callbacks = {
                'select'    :   self.rowSelectClick
            };
            // create callbacks            

            // add row select
            self.modules['rowSelect'] = new rowSelectModule( self.containerOptions['id'],
                                                             self.listOptions,
                                                             data,
                                                             callbacks );
            // add row select
           
        // DONE FUNCTION: createRowSelect( named aray: data ) void
        };
        self.removeRowSelect = function( ) {
        // FUNCTION: removeRowSelect( void ) void

            // row select ! exists
            if( !self.modules['rowSelect'] ){
                
                // done
                return;
                
            }
            // row select ! exists
            
            // destroy row select
            self.modules['rowSelect'].destruct();

            // unset row select
            delete self.modules['rowSelect'];

        // DONE FUNCTION: removeRowSelect( void ) void
        };
        self.rowSelectClick = function() {
        // FUNCTION: rowSelectClick( void ) void

            // load data
            self.callbacks['loadData']();

        // DONE FUNCTION: rowSelectClick( void ) void
        };
        self.createDateSelect = function( data ) {
        // FUNCTION: createDateSelect( named aray: data ) void

            // debug info
            self.debug( 'createDateSelect' );
            
            // get date selection module
            let dateSelectModule = nameSpace.selections.dateSelect.dateSelectModule;            
            
            // create callbacks
            let callbacks = {
                'select'    :   self.dateSelectClick
            };
            // create callbacks            

            // add date select
            self.modules['dateSelect'] = new dateSelectModule( self.containerOptions['id'],
                                                               self.listOptions,
                                                               data,
                                                               callbacks );
            // add date select
           
        // DONE FUNCTION: createDateSelect( named aray: data ) void
        };
        self.removeDateSelect = function( ) {
        // FUNCTION: removeDateSelect( void ) void

            // date select ! exists
            if( !self.modules['dateSelect'] ){
                
                // done
                return;
                
            }
            // date select ! exists
            
            // destroy date select
            self.modules['dateSelect'].destruct();

            // unset date select
            delete self.modules['dateSelect'];

        // DONE FUNCTION: removeDateSelect( void ) void
        };
        self.dateSelectClick = function() {
        // FUNCTION: dateSelectClick( void ) void

            // load data
            self.callbacks['loadData']();

        // DONE FUNCTION: dateSelectClick( void ) void
        };
        self.removeSelects = function( ) {
        // FUNCTION: removeSelects( void ) void

            // debug info
            self.debug( 'removeSelects' );

            // remove select 
            self.removeSelect();
            
            // remove row select 
            self.removeRowSelect();
            
            // remove select 
            self.removeDateSelect();
            
        // DONE FUNCTION: removeSelects( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // layout change exists
                if( module.layoutChange ){
                    
                    // adjust module
                    module.layoutChange( );
                
                }
                // layout change exists
                
            });
            // done loop over modules
           
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.setData = function( data ) {
        // FUNCTION: setData( named aray: data ) void
            
            // remove date select
            self.removeSelects();

            // get current selection
            let selectedListType = mbAdminApp.getUserOption( self.listOptions['subject'] + 'ListType' );
            
            // get title
            let title = self.listTypes[selectedListType]['title'];
                    
            // set title
            mbAdminApp.getElementById( self.titleOptions['id'] ).innerHTML = title;
            
            // has row select
            if( self.listTypes[selectedListType]['rowSelect'] ){
                
                // create row select
                self.createRowSelect( data );
                
            }
            // has row select
            
            // has date select
            if( self.listTypes[selectedListType]['dateSelect'] ){
                
                // create date select
                self.createDateSelect( data );
                
            }
            // has date select
            
        // DONE FUNCTION: setData( named aray: data ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove selects
            self.removeSelects();

            // remove html
            self.removeHtml();

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
            // FUNCTION: setData( named array: data ) void    
            setData : function( data ){
                
                // call internal
                self.setData( data );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: selectionsModule( html element id: parentId, 
    //                                named array: listOptions,
    //                                named array: callbacks ) named array  
    
})( mbAdminApp );
// done create module function
