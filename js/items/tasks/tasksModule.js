/*
        @package        Pleisterman/MbAdmin
  
        function:       displays tasks list
  
        Last revision:  07-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.items;
    
    // create name space
    nameSpace.tasks = nameSpace.tasks ? nameSpace.tasks : {};
    
    // MODULE: tasksModule( html element id: listsContainerId ) named array  
    nameSpace.tasks.tasksModule = function( listsContainerId ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.MODULE = 'ItemsTasksModule';                   // string
        self.debugOn = false;                               // boolean
        self.listsContainerId = listsContainerId;           // html element id
        self.listOptions = {                                // named array
            'subject'           :   'tasks',                // string  
            'title'             :   'Tasks',                // string  
            'newButton'         :   true,                   // boolean            
            'listTypes' : [                                 // array
                'lastUsed',                                 // string
                'day',                                      // string
                'dateDesc',                                 // string
                'dateAsc'                                   // string
            ]                                               // done array
        };                                                  // done named array 
        self.dataModule = nameSpace.tasks.dataModule;       // module
        self.modules = {};                                  // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create modules
            self.createModules();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );
            
            // get list module
            let listModule = mbAdminApp.content.templates.list.listModule;
            
            // create list
            self.modules['list'] = new listModule( self.listsContainerId,
                                                   self.listOptions );
            // create list
            
        // DONE FUNCTION: createModules( void ) void
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
            return new nameSpace.tasks.editModule();
        
        // DONE FUNCTION: getEditModule( void ) void
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
    // DONE MODULE: tasksModule( html element id: listsContainerId ) named array  
    
})( mbAdminApp );
// done create module function
