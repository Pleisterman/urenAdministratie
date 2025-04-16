/*
        @package        Pleisterman/MbAdmin
  
        function:       displays the lists
  
        Last revision:  12-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};

    // MODULE: updateModule( void ) named array
    nameSpace.edit.updateModule = function( ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentEditUpdateModule';                    // string
        self.debugOn = false;                                       // boolean
        self.modules = {};                                          // named array
        self.items = null;                                          // module / null
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.prepareUpdate = function( items ) {
        // FUNCTION: prepareUpdate( module: items ) void  
            
            // remember items
            self.items = items;
            
            // ! changed
            if( !self.items.changed() ){

                // show error
                self.showError( 'nothingChanged' );

                // done
                return;
                
            }
            // ! changed
            
            // ! valid
            if( !self.items.validate() ){

                // done
                return;
                
            }
            // ! valid
            
            // update
            self.update();
            
        // DONE FUNCTION: prepareUpdate( module: items ) void  
        };
        self.update = function( ) {
        // FUNCTION: update( void ) void  
            
            // debug info
            self.debug( 'update' );
            
            // create options
            let data = {
                'subject'   :   mbAdminApp.getUserOption( 'editSubject' ),
                'what'      :   'row',
                'selection' : {
                    'id' :   self.items.getRowId()
                },
                'data'      :   self.items.getData()
            };
            // create options
            
            // ajax call
            mbAdminApp.server.update( data, self.updated );
                        
        // DONE FUNCTION: update( void ) void  
        };
        self.updated = function( result ) {
        // FUNCTION: updated( named array: result ) void
              
            // has error
            if( result['error'] ){
      
                // show error
                self.showError( result['error'], result['errorObject'] );
                
                // done
                return;

            }
            // has error
            
            // show update succes
            self.showUpdateSucces();

            // refresh list
            self.refreshList();
            
            // refresh edit
            mbAdminApp.callEvent( 'refreshEdit' );
           
        // DONE FUNCTION: updated( named array: result ) void  
        };
        self.refreshList = function() {
        // FUNCTION: refreshList( void ) void
            
            // get subject
            let subject = mbAdminApp.getUserOption( 'editSubject' );

            // get current selection
            let selectedListType = mbAdminApp.getUserOption( subject + 'ListType' );

            // is last used
            if( selectedListType === 'lastUsed' ){

                // reset offset
                mbAdminApp.setUserOption( subject + 'ListSelectionOffset', 0 );
                
            }
            // is last used

            // refresh list
            mbAdminApp.callEvent( 'refreshList', subject );
           
        // DONE FUNCTION: refreshList( void ) void
        };
        self.showError = function( errorId, element ) {
        // FUNCTION: showError( string: errorId, string / undefined: element ) void
              
            // create options
            const options = {
                'errorId'      :  errorId,
                'element'      :  element
            };
            // create options
            
            // call items
            self.items.showError( options );            
            
        // DONE FUNCTION: showError( string: errorId, string / undefined: element ) void  
        };
        self.showUpdateSucces = function() {
        // FUNCTION: showUpdateSucces( void ) void
            
            // create options
            const options = {
                'messageId'       :  'updateSucces'
            };
            // create options
            
            // call items
            self.items.showMessage( options );            
            
        // DONE FUNCTION: showUpdateSucces( void ) void
        };
        self.reset = function() {
        // FUNCTION: reset( void ) void

            // unset items
            self.items = null;
            
        // DONE FUNCTION: reset( void ) void
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
            
            // FUNCTION: update( module: items ) void    
            update : function( items ){
                
                // call internal
                self.prepareUpdate( items );
                
            },
            // FUNCTION: reset( ) void    
            reset : function( ){
                
                // call internal
                self.reset( );
                
            }            
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: updateModule( void ) named array  
    
})( mbAdminApp );
// done create module function
