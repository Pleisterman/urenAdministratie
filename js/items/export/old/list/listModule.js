/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the list for the export
  
        Last revision:  10-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.export;
    
    // create name space
    nameSpace.list = nameSpace.list ? nameSpace.list : {};
    
    // MODULE: listModule( html element id: parentId, named array: listOptions ) named array 
    nameSpace.list.listModule = function( parentId, listOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ExportListModule';                       // string
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
            
            // create header
            self.createHeader();
            
            // create content
            self.createContent();
            
        // DONE FUNCTION: createModules( void ) void
        };
        self.createHeader = function() {
        // FUNCTION: createHeader( void ) void
            
            // get header module
            let headerModule = nameSpace.list.headerModule;

            // create callbacks
            let callbacks = {
                'openClose' : self.openClose
            };
            // create callbacks
            
            // create header
            self.modules['header'] = new headerModule( self.containerOptions['id'],
                                                       self.listOptions,
                                                       callbacks );
            // create header
            
        // DONE FUNCTION: createHeader( void ) void
        };
        self.createContent = function() {
        // FUNCTION: createContent( void ) void
            
            // get content module
            let contentModule = nameSpace.list.contentModule;

            // create callbacks
            let callbacks = {
                'select' : self.select
            };
            // create callbacks
            
            // create content
            self.modules['content'] = new contentModule( self.containerOptions['id'],
                                                         self.listOptions,
                                                         callbacks );
            // create content
            
        // DONE FUNCTION: createContent( void ) void
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

            // close
            self.close();

        // DONE FUNCTION: openClose( void ) void
        };
        self.open = function() {
        // FUNCTION: open( void ) void

            // open content
            self.modules['content'].open();   
   
        // DONE FUNCTION: open( void ) void
        };
        self.close = function() {
        // FUNCTION: close( void ) void

            // close content
            self.modules['content'].close();   
   
        // DONE FUNCTION: close( void ) void
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
                
            }            
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: listModule( html element id: parentId, 
    //                          named array: listOptions ) named array  
    
})( mbAdminApp );
// done create module function
