/*
        @package        Pleisterman/MbAdmin
  
        function:       creates the lists, items and selects
  
        Last revision:  07-03-2025
 
*/


// create module function
( function( mbAdminApp ){
    
    // get name space
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.items = nameSpace.items ? nameSpace.items : {};
    
    // MODULE: itemsModule( html element id: listsContainerId ) named array
    nameSpace.items.itemsModule = function( listsContainerId ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                            // object
        self.MODULE = 'ContentItemsModule';         // string
        self.debugOn = true;                        // boolean
        self.listsContainerId = listsContainerId;   // html element id
        self.itemModules = {                        // named array
            'projects' : {                          // named array
                'moduleObject'  :   nameSpace.items.projects.projectsModule, // module
                'module'        :   null            // module object / null   
            },                                      // done named array
            'contacts' : {                          // named array
                'moduleObject'  :   nameSpace.items.contacts.contactsModule, // module
                'module'        :   null            // module object / null   
            },                                      // done named array
            'tasks' : {                             // named array
                'moduleObject'  :   nameSpace.items.tasks.tasksModule, // module
                'moduleO'       :   null            // module object / null   
            },                                      // done named array
            'vehicles' : {                          // named array
                'moduleObject'  :   nameSpace.items.vehicles.vehiclesModule, // module
                'module'        :   null            // module object / null   
            },                                      // done named array
            'rides' : {                             // named array
                'moduleObject'  :   nameSpace.items.rides.ridesModule, // module
                'module'        :   null            // module object / null   
            },                                      // done named array
            'export' : {                             // named array
                'moduleObject'  :   nameSpace.items.export.exportModule, // module
                'module'        :   null            // module object / null   
            }                                       // done named array
        };                                          // done named array
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create item modules
            self.createDataModules();

            // add event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add refresh list
            mbAdminApp.subscribeToEvent( 'refreshList', self.refreshList );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.createDataModules = function(){
        // FUNCTION: createDataModules( void ) void

            // get list order
            let listOrder = mbAdminApp.getUserOption( 'listOrder' ).split( ',' );
            
            // create modules in list order
            for( let i = 0; i < listOrder.length; i++ ){
                
                // switch list order
                switch( listOrder[i] ){
                    
                    // cases
                    case 'vat' : {
                            
                        // create vat module
                        self.itemModules['vat']['module'] = new self.itemModules['vat']['moduleObject']( self.listsContainerId );
                            
                        // done 
                        break;
                        
                    }
                    case 'projects' : {

                        // create projects module    
                        self.itemModules['projects']['module'] = new self.itemModules['projects']['moduleObject']( self.listsContainerId );
                        
                        // done 
                        break;
                    }
                    case 'contacts' : {
                            
                        // create contacts module    
                        self.itemModules['contacts']['module'] = new self.itemModules['contacts']['moduleObject']( self.listsContainerId );
                        
                        // done 
                        break;
                        
                    }
                    case 'vehicles' : {
                            
                        // create vehicles module    
                        self.itemModules['vehicles']['module'] = new self.itemModules['vehicles']['moduleObject']( self.listsContainerId );
                        
                        // done 
                        break;
                        
                    }
                    case 'tasks' : {
                            
                        // create tasks module    
                        self.itemModules['tasks']['module'] = new self.itemModules['tasks']['moduleObject']( self.listsContainerId );
                        
                        // done 
                        break;
                        
                    }
                    case 'rides' : {
                            
                        // create rides module    
                        self.itemModules['rides']['module'] = new self.itemModules['rides']['moduleObject']( self.listsContainerId );
                        
                        // done 
                        break;
                        
                    }
                    case 'export' : {
                            
                        // create export module    
                        self.itemModules['export']['module'] = new self.itemModules['export']['moduleObject']( self.listsContainerId );
                        
                        // done 
                        break;
                        
                    }
                    default : {
                            
                        // debug info   
                        self.debug( 'error list container unknown list ' + listOrder[i] );
                        
                        // log error
                        console.log( 'dataModule addDataModules unknown module: ' + listOrder[i] );
                        
                    }
                    // done cases
                    
                }   
                // switch list order
                
            }
            // done create modules in list order
            
        // DONE FUNCTION: createDataModules( void ) void
        };
        self.loadLists = function( ) {
        // FUNCTION: loadLists( void ) void
        
            // debug info
            self.debug( 'loadLists' );
            
            // loop over data modules
            Object.entries( self.itemModules ).forEach( ( [index, options] ) => {
            
                // call module 
                options['module'].loadList( );
                
            });
            // done loop over data modules

        // DONE FUNCTION: loadLists( void ) void
        };
        self.refreshList = function( subject ){
        // FUNCTION: refreshList( string: subject ) void

            // load list
            self.itemModules[subject]['module'].loadList();

        // DONE FUNCTION: refreshList( string: subject ) void
        };
        self.layoutChange = function(){
        // FUNCTION: layoutChange( void ) void
            
            // adjust lists
            self.listsModule['module'].layoutChange();

            // loop over data modules
            Object.entries( self.itemModules ).forEach( ( [index, options] ) => {
            
                // adjust module
                options['module'].layoutChange( );
                
            });
            // done loop over data modules
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.getEditModule = function( subject ){
        // FUNCTION: getEditModule( string: subject ) module
            
            // return module call
            return self.itemModules[subject]['module'].getEditModule();
            
        // DONE FUNCTION: getEditModule( string: subject ) module
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call global debug
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
            // FUNCTION: loadLists( ) void    
            loadLists : function( ){
                
                // call internal
                self.loadLists( );
                
            },  
            // FUNCTION: getEditModule( string: subject ) module    
            getEditModule : function( subject ){
                
                // return internal call
                return self.getEditModule( subject );
                
            }            
            
        };
        // DONE PUBLIC
    };
    // DONE MODULE: itemsModule( html element id: listsContainerId ) void 
    
})( mbAdminApp );
// done create module function
