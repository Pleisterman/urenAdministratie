/*
        @package        Pleisterman/MbAdmin
  
        function:       handles cashing and ajax calls to get messages
  
        Last revision:  09-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.messages = nameSpace.messages ? nameSpace.messages : {};
    
    // MODULE: messageModule( void ) named array
    nameSpace.messages.messageModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                        // object
        self.MODULE = 'ContentMessageModule';   // string
        self.debugOn = false;                   // boolean
        self.callback = null;                   // function / null
        self.messageId = '';                    // string
        self.messageCash = {};                  // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add the extensions to mbAdminApp
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add the get message extension to mbAdminApp
            mbAdminApp.getMessage = self.getMessage;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getMessage = function( messageId, callback ) {
        // FUNCTION: getMessage( string: messageId, function: callback ) void
            
            // debug info
            self.debug( 'getMessage messageId: ' + messageId );
            
            // save messageId
            self.messageId = messageId;
            
            // save callback
            self.callback = callback;
            
            // check if message is cashed
            if( self.messageCash[messageId] !== undefined ){
                
                // debug info
                self.debug( 'message cashed' );
                
                if( self.callback ){
                    
                    // call the callback with the cashed message
                    self.callback( self.messageCash[messageId] );
                    
                    // remove callback
                    self.callback = null;
                    
                }
                
            }
            else {
                // not cashed
                
                // create ajax data
                let data = { 
                    'workDirectory'     :   mbAdminApp.workDirectory,
                    'type'              :   'message',    
                    'messageId'         :   messageId,
                    'languageId'        :   mbAdminApp.selectedLanguageId 
                };
                // done create ajax data
                
                // ajax
                mbAdminApp.post( '/' + mbAdminApp.baseDirectory + '/getString', data, self.getStringCallback );
                
            }
            
        // DONE FUNCTION: getMessage( string: messageId, function: callback ) void
        };
        self.getStringCallback = function( result ){
        // FUNCTION: getStringCallback( json: result ) void
            
            // check for errors
            if( self.hasAjaxResultErrors( result ) ){
                
                // done with error
                return;
                
            }
            // done check for errors
            
            // debug info
            self.debug( 'getStringCallback string: ' + result['string'] );
            
            // has callback
            if( self.callback ){
                
                // create callback let
                let callback = self.callback;
                
                // remove callback
                self.callback = null;
                
                // cash the string
                self.messageCash[self.messageId] = result['string'];
                
                // call the callback with the string
                callback( result['string'] );
                
            }
            // done has callback
            
        // DONE FUNCTION: getStringCallback( json: result ) void
        };
        self.hasAjaxResultErrors = function( result ){
        // FUNCTION: hasAjaxResultErrors( json: result ) boolean
        
            // global check result
            if( mbAdminApp.hasAjaxResultErrors( result ) ){
                
                // done with error
                return true;
                
            }
            // done global check result
             
            // check errors
            if( result['error'] ){
                
                // debug info
                self.debug( result['error'] );
                
                // show error message
                mbAdminApp.callEvent( 'showEditError', result['error'] );

                // done with error
                return true;
                
           }
            // done check errors
          
            // done 
            return false;
            
        // DONE FUNCTION: hasAjaxResultErrors( json: result ) boolean
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
        };    
        // DONE PUBLIC
        
    };
    // DONE MODULE: messageModule( void ) named array
    
})( mbAdminApp );
// done create module function
