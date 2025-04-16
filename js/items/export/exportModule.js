/*
        @package        Pleisterman/MbAdmin
  
        function:       controls export of data 
  
        Last revision:  09-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items;
    
    // create name space
    nameSpace.export = nameSpace.export ? nameSpace.export : {};
    
    // MODULE: exportModule( html element id: listsContainerId ) named array
    nameSpace.export.exportModule = function( listsContainerId ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.MODULE = 'ExportModule';                       // string
        self.debugOn = false;                               // boolean
        self.id = 'export';                                 // string
        self.listsContainerId = listsContainerId;           // html element id
        self.listOptions = {                                // named array
            'subject'           :   'export',               // string  
            'title'             :   'Export',               // string  
            'listTypes'         : []                        // array
        };                                                  // done named array 
        self.listOptions = {                                // named array
            'subject'           :   'export',               // string  
            'title'             :   'Export',               // string  
            'openClose'         :   true,                   // boolean            
            'selections'        :   false,                  // boolean 
            'action'            :   'edit'                 // string 
        };                                                  // done named array 
        self.modules = {};                                  // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // create list
            self.createList();
                        
        // DONE FUNCTION: construct( void ) void
        };
        self.createList = function( ) {
        // FUNCTION: createList( void ) void

            // get list module
            let listModule = mbAdminApp.content.templates.list.listModule;
            
            // create list
            self.modules['list'] = new listModule( self.listsContainerId,
                                                   self.listOptions );
            // create list
            
        // DONE FUNCTION: createList( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // adjust module
                module.layoutChange( );
                
            });
            // done loop over modules
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.getEditModule = function() {
        // FUNCTION: getEditModule( void ) module

            // return edit module
            return new nameSpace.export.editModule();
        
        // DONE FUNCTION: getEditModule( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug is on
            if( self.debugOn ) {
                
                // call global debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug is on
            
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
            // FUNCTION: loadList( void ) void    
            loadList : function( ){
                
                // call internal
                self.modules['list'].loadData( );
                
            },
            // FUNCTION: getEditModule( void ) module    
            getEditModule : function( ){
                
                // return internal call
                return self.getEditModule();
                
            }            
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: exportModule( html element id: listsContainerId ) named array
    
})( mbAdminApp );
// done create module function
