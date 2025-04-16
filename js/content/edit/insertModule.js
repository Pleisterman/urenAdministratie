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

    // MODULE: insertModule( void ) named array
    nameSpace.edit.insertModule = function( ) {
        // PRIVATE:
  
        // MEMBERS:
        let self = this;                                            // object
        self.MODULE = 'ContentEditInsertModule';                    // string
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
        self.insert = function( items ) {
        // FUNCTION: insert( module: items ) void  
            
            // debug info
            self.debug( 'insert' );
            
            // remember items
            self.items = items;
            
            // ! valid
            if( !self.items.validate() ){

                // done
                return;
                
            }
            // ! valid
            
            // create options
            let data = {
                'subject'   :   mbAdminApp.getUserOption( 'editSubject' ),
                'data'      :   self.items.getData()
            };
            // create options
            
            // ajax call
            mbAdminApp.server.insert( data, self.inserted );
                        
        // DONE FUNCTION: insert( module: items ) void  
        };
        self.inserted = function( result ) {
        // FUNCTION: inserted( named array: result ) void
                        
            // has error
            if( result['error'] ){
      
                // show error
                self.showError( result['error'], result['errorObject'] );
                
                // done
                return;

            }
            // has error            
         
            // show insert succes
            self.showInsertSucces();

            // set selection
            mbAdminApp.setUserOption( 'editId', result['insertId'] );

            // refresh list
            self.refreshList();

            // refresh edit
            mbAdminApp.callEvent( 'refreshEdit' );
           
        // DONE FUNCTION: inserted( named array: result ) void  
        };
        self.setSelection = function() {
        // FUNCTION: refreshList( void ) void
            
        // DONE FUNCTION: refreshList( void ) void
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
        self.showInsertSucces = function() {
        // FUNCTION: showInsertSucces( void ) void
            
            // create options
            const options = {
                'messageId'       :  'insertSucces'
            };
            // create options
            
            // call items
            self.items.showMessage( options );            
            
        // DONE FUNCTION: showInsertSucces( void ) void
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
            
            // FUNCTION: insert( module: items ) void    
            insert : function( items ){
                
                // call internal
                self.insert( items );
                
            },
            // FUNCTION: reset( ) void    
            reset : function( ){
                
                // call internal
                self.reset( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: insertModule( void ) named array  
    
})( mbAdminApp );
// done create module function
