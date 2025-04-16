/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the lists
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};

    // MODULE: editModule( void ) named array
    nameSpace.edit.editModule = function( ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentEditModule';                          // string
        self.debugOn = false;                                       // boolean
        self.actionModules = {                                      // named array
            'update'        :   new nameSpace.edit.updateModule(),  // module
            'insert'        :   new nameSpace.edit.insertModule(),  // module
            'export'        :   new nameSpace.edit.exportModule()   // module
        };                                                          // done named array
        self.buttonsModule = null;                                  // module / null
        self.modules = {};                                          // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create buttons
            self.createButtons();

            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();

            // add event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add edit data changed
            mbAdminApp.editDataChanged = self.dataChanged;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add edit
            mbAdminApp.subscribeToEvent( 'edit', self.showEdit );
            
            // add refresh edit
            mbAdminApp.subscribeToEvent( 'refreshEdit', self.showEdit );
            
            // add insert
            mbAdminApp.subscribeToEvent( 'insert', self.showInsert );
            
            // add show edit error
            mbAdminApp.subscribeToEvent( 'showEditError', self.showError );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.createButtons = function(){
        // FUNCTION: createButtons( void ) void

            // get buttons module
            let buttonsModule = nameSpace.edit.buttonsModule;
            
            // create callbacks
            let callbacks = {
                'update'    :   self.update,
                'insert'    :   self.insert,
                'export'    :   self.export,
                'cancel'    :   self.cancel
            };
            // create callbacks
            
            // create buttons module
            self.buttonsModule = new buttonsModule( callbacks );

        // DONE FUNCTION: createButtons( void ) void
        };
        self.update = function() {
        // FUNCTION: update( void ) void
            
            // call update module
            self.actionModules['update'].update( self.modules['items'] );
            
        // DONE FUNCTION: update( void ) void
        };
        self.insert = function() {
        // FUNCTION: insert( void ) void
            
            // call insert module
            self.actionModules['insert'].insert( self.modules['items'] );
            
        // DONE FUNCTION: insert( void ) void
        };
        self.export = function() {
        // FUNCTION: export( void ) void
            
            // call export module
            self.actionModules['export'].export( self.modules['items'] );
            
        // DONE FUNCTION: export( void ) void
        };
        self.cancel = function() {
        // FUNCTION: cancel( void ) void
            
            // cancel edit
            self.modules['items'].cancelEdit();
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.prepareEdit = function( options ) {
        // FUNCTION: prepareEdit( named array: options ) void
            
            // items changed
            if( self.modules['items'] &&
                self.modules['items'].changed() ){

                // create message options
                let messageOptions = {
                    'title'         :   'Data not saved.',
                    'message'       :   'Select cancel to return',
                    'buttons' : {
                        'ok' : {
                            'callback'  :   self.showEdit
                        },
                        'cancel' : {} 
                    }
                };
                // create options

                // show dialog
                mbAdminApp.showMessageDialog( messageOptions );
                
                // done
                return;
                
            }
            // items changed
     
            // show edit
            self.showEdit();
            
        // DONE FUNCTION: prepareEdit( named array: options ) void
        };
        self.showEdit = function() {
        // FUNCTION: showEdit( void ) void
            
            // get subject
            let subject = mbAdminApp.getUserOption( 'editSubject' );

            // get edit id
            let editId = mbAdminApp.getUserOption( 'editId' );

            // create data
            let data = { 
                'subject'           :   subject,
                'what'              :   'row',
                'selection' : {
                    'id'            :   editId
                }
            };
            // create data
            
            // ajax call
            mbAdminApp.server.read( data, self.dataLoaded );
            
        // DONE FUNCTION: showEdit( void ) void
        };
        self.showInsert = function() {
        // FUNCTION: insert( void ) void
            
            // remove edit items
            self.removeModules();
            
            // create modules
            self.createModules( null );
            
            // show buttons
            self.buttonsModule.show( self.modules['edit'], null );
            
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: showInsert( void ) void
        };
        self.dataChanged = function() {
        // FUNCTION: dataChanged( void ) boolean
            
            // iems exists and changed
            if( self.modules['items'] &&
                self.modules['items'].changed() ){

                // return changed
                return true;
            
            }
            // iems exists and changed
            
            // return ! changed
            return false;
            
        // DONE FUNCTION: dataChanged( void ) boolean
        };
        self.dataLoaded = function( result ) {
        // FUNCTION: dataLoaded( named array: result ) void 

            // reset action modules
            self.resetActionModules();
            
            // remove modules
            self.removeModules();
            
            // create modules
            self.createModules( result );

            // show buttons
            self.buttonsModule.show( self.modules['edit'], result );
            
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: dataLoaded( named array: result ) void 
        };
        self.resetActionModules = function() {
        // FUNCTION: resetActionModules( void ) void

            // loop over modules
            Object.entries( self.actionModules ).forEach( ( [index, module] ) => {
            
                // reset module
                module.reset();
            
            });
            // done loop over modules
            
        // DONE FUNCTION: resetActionModules( void ) void
        };
        self.createModules = function( row ) {
        // FUNCTION: createModules( named array: row ) void

            // get subject
            let subject = mbAdminApp.getUserOption( 'editSubject' );

            // get edit module 
            self.modules['edit'] = self.items.getEditModule( subject );
            
            // get edit items module
            let itemsModule = nameSpace.edit.itemsModule;
            
            // create edit items
            self.modules['items'] = new itemsModule( self.modules['edit'],
                                                     row );
            // create edit items

        // DONE FUNCTION: createModules( named array: row ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeEditItems( void ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [index, module] ) => {
            
                // destroy module
                module.destruct();
            
            });
            // done loop over modules
            
            // reset modules
            self.modules = {};
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // items exists
            if( self.modules['items'] ){
                
                // adjust items
                self.modules['items'].layoutChange();
            }
            // items exists

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
            
            // FUNCTION: setItems( named array: items ) void    
            setItems : function( items ){
                
                // set items
                self.items = items;
                
            },
            // FUNCTION: layoutChange( void ) void    
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: editModule( void ) named array  
    
})( mbAdminApp );
// done create module function
