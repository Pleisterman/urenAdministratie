/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the list template
  
        Last revision:  27-02-2025
 
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
    nameSpace.list = nameSpace.list ? nameSpace.list : {};
    
    // MODULE: listModule( html element id: parentId, 
    //                     named array: listOptions) named array 
    nameSpace.list.listModule = function( parentId, listOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesListModule';             // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.listOptions = listOptions;                         // named array
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'width'                 :   '100%'                  // css
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
            
            // create modules
            self.createModules();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );
            
            // create data 
            self.createData();
            
            // create header
            self.createHeader();
            
            // create selections
            self.createSelections();
            
            // create content
            self.createContent();
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.createHeader = function() {
        // FUNCTION: createHeader( void ) void
            
            // get header module
            let headerModule = nameSpace.list.header.headerModule;

            // create callbacks
            let callbacks = {
                'openClose' : self.openClose,
                'new'       : self.new
            };
            // create callbacks
            
            // create header
            self.modules['header'] = new headerModule( self.containerOptions['id'],
                                                       self.listOptions,
                                                       callbacks );
            // create header
            
        // DONE FUNCTION: createHeader( void ) void
        };
        self.createSelections = function() {
        // FUNCTION: createSelections( void ) void
            
            // get selections module
            let selectionsModule = nameSpace.list.selections.selectionsModule;

            // create callbacks
            let callbacks = {
                'loadData'    :   self.modules['data'].loadData
            };
            // create callbacks
            
            // create selections
            self.modules['selections'] = new selectionsModule( self.containerOptions['id'],
                                                               self.listOptions,
                                                               callbacks );
            // create selection
            
        // DONE FUNCTION: createDateSelections( void ) void
        };
        self.createContent = function() {
        // FUNCTION: createContent( void ) void
            
            // get content module
            let contentModule = nameSpace.list.content.contentModule;
            
            // create content
            self.modules['content'] = new contentModule( self.containerOptions['id'],
                                                         self.listOptions );
            // create content
            
        // DONE FUNCTION: createContent( void ) void
        };
        self.createData = function() {
        // FUNCTION: createData( void ) void
            
            // get data module
            let dataModule = nameSpace.list.data.dataModule;

            // create callbacks
            let callbacks = {
                'dataLoaded'    :   self.dataLoaded
            };
            // create callbacks
            
            // create data
            self.modules['data'] = new dataModule( self.listOptions,
                                                   callbacks );
            
        // DONE FUNCTION: createData( void ) void
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
        self.openClose = function() {
        // FUNCTION: openClose( void ) void

            // get open
            let open = mbAdminApp.getUserOption( self.listOptions['subject'] + 'HeaderOpen' );
            
            // toggle open
            open = open === 'true' ? 'false' : 'true';
            
            // set user option
            mbAdminApp.setUserOption( self.listOptions['subject'] + 'HeaderOpen', open );

            // is open
            if( open === 'true' ){
                
                // load data
                self.modules['data'].loadData();
            
                // done
                return;

            }
            // is open
            
            // close
            self.close();

        // DONE FUNCTION: openClose( void ) void
        };
        self.open = function() {
        // FUNCTION: open( void ) void

            // open selections
            self.modules['selections'].open();   
   
            // open content
            self.modules['content'].open();   
   
        // DONE FUNCTION: open( void ) void
        };
        self.close = function() {
        // FUNCTION: close( void ) void

            // close selections
            self.modules['selections'].close();
           
            // close content
            self.modules['content'].close();   
   
        // DONE FUNCTION: close( void ) void
        };
        self.new = function() {
        // FUNCTION: new( void ) void

            // set subject
            mbAdminApp.setUserOption( 'editSubject', self.listOptions['subject'] );

            // call insert
            mbAdminApp.callEvent( 'insert' );

        // DONE FUNCTION: new( void ) void
        };
        self.dataLoaded = function( data ) {
        // FUNCTION: dataLoaded( named array: data ) void

            // open
            self.open();

            // set selections data 
            self.modules['selections'].setData( data );                
                
            // set content data 
            self.modules['content'].setData( data );                
                
        // DONE FUNCTION: dataLoaded( named array: data ) void
        };
        self.loadData = function( ) {
        // FUNCTION: loadData( void ) void 

            // get open
            let open = mbAdminApp.getUserOption( self.listOptions['subject'] + 'HeaderOpen' );
            
            // ! open
            if( open === 'false' ){
                
                // done
                return;
                
            }
            // ! open
            
            // call data module
            self.modules['data'].loadData( );

        // DONE FUNCTION: loadData( void ) void 
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

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
            // FUNCTION: loadData( void ) void    
            loadData : function( ){
                
                // call internal
                self.loadData( );
                
            }            
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: listModule( html element id: parentId, 
    //                          named array: listOptions ) named array  
    
})( mbAdminApp );
// done create module function
