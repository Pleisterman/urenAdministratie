/*
        @package        Pleisterman/MbAdmin
  
        function:       creates the content 
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.content = nameSpace.content ? nameSpace.content : {};

    // MODULE: contentModule( html element id: parentId ) named array     
    nameSpace.content.contentModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                            // object
        self.MODULE = 'ContentModule';              // string
        self.debugOn = false;                       // boolean
        self.parentId = parentId;                   // html element id
        self.modules = {                            // named array
            'lists' : {                             // named array
                'module'            :   nameSpace.content.lists.listsModule, // module
                'object'            :   null        // module object / null   
            },                                      // done named array
            'edit' : {                              // named array
                'module'            :   nameSpace.content.edit.editModule, // module
                'object'            :   null        // module object / null   
            }                                       // done named array
        };                                          // done named array    
        self.items = null;                          // module / null                                                                                              
        self.export = null;                         // module / null                                                                                              
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create modules
            self.createModules();

            // create items
            self.createItems();
            
            // adjust layout
            self.layoutChange();
            
            // add event subscription
            self.addEventSubscriptions();

            // load lists
            self.loadLists();
            
            // call edit
            mbAdminApp.callEvent( 'edit' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add layout change
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.createModules = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
                
                // create module
                self.modules[index]['object'] = new self.modules[index]['module']( );
                
            });
            // loop over modules

        // DONE FUNCTION: createModules( void ) void
        };
        self.createItems = function() {
        // FUNCTION: createItems( void ) void
            
            // debug info
            self.debug( 'createItems' );
            
            // get lists container id
            let listsContainerId = self.modules['lists']['object'].getContainerId();
            
            // get items module
            let itemsModule = mbAdminApp.items.itemsModule;

            // create items
            self.items = new itemsModule( listsContainerId );
                      
            // set edit items
            self.modules['edit']['object'].setItems( self.items );
            
        // DONE FUNCTION: createItems( void ) void
        };
        self.loadLists = function() {
        // FUNCTION: loadLists( void ) void
            
            // debug info
            self.debug( 'loadLists' );

            // load lists
            self.items.loadLists();
            
        // DONE FUNCTION: loadLists( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
                
                // layout change exists
                if( module['object'].layoutChange !== undefined ){
                    
                    // adjust layout
                    module['object'].layoutChange();
                    
                }
                // layout change exists
                
            });
            // loop over modules
            
        // DONE FUNCTION: layoutChange( void ) void
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
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: contentModule( html element id: parentId ) named array
    
})( mbAdminApp );
// done create module function
