/* 
        @package        Pleisterman/MbAdmin
        function:       Controls the options and saves the option to the database.
                        The function:
                        
                            mbAdminApp.getUserOption( string: name ) void 
                            mbAdminApp.setUserOption string: name, string: value ) void 
                            
                        is added to the application

        Last revision:  27-02-2025
 */

// create module function
( function( mbAdminApp ){
    
    // create name space
    mbAdminApp.user = mbAdminApp.user ? mbAdminApp.user : {};
            
    // MODULE: optionsModule( void ) named array  
    mbAdminApp.user.optionsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                            // object
        self.FUNCTION = 'UserOptions';              // string
        self.debugOn = false;                       // boolean
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function( ){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add set user option
            mbAdminApp.setUserOption = self.set;
            
            // add get user option
            mbAdminApp.getUserOption = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.set = function( id, value ) {
        // FUNCTION: set( string: id, string: value ) void
            
            // id ! exists
            if( mbAdminApp.options.user[id] === undefined ){
                
                // debug info
                console.log( 'Error set user option: ' + id + ' ! found.' );
                
                // done
                return;
            
            }
            // id ! exists
            
            
            // value ! changed
            if( mbAdminApp.options.user[id] === value ){

                // done
                return;
                
            }
            // value ! changed
            
            // debug info
            self.debug( 'set: ' + id + ' value: ' + value );
            
            // set the js value
            mbAdminApp.options.user[id] = value;
            
            // construct data object
            var data = { 
                'subject'   :   'userOptions',
                'id'        :   id,
                'value'     :   value 
            };
            // done construct data object
            
            // ajax
            mbAdminApp.server.update( data, self.updateOptionCallback );
            
        // DONE FUNCTION: set( string: id, string: value ) void
        };
        self.updateOptionCallback = function( result ){
        // FUNCTION: updateOptionCallback( named array: result ) string
            
            // debug info
            self.debug( result );
                        
        // DONE FUNCTION: updateOptionCallback( named array: result ) void
        };
        self.get = function( id ){
        // FUNCTION: get( string: id ) string
            
            // id ! exists
            if( !mbAdminApp.options.user[id] === undefined ){
                
                // debug info
                console.log( 'Error get user option: ' + id + ' ! found.' );
                
                // return empty result
                return '';
            
            }
            // id ! exists
            
            // debug info
            self.debug( 'get user option: ' + id );
            
            // return result
            return mbAdminApp.options.user[id];
            
        // FUNCTION: get( string: id ) string
        };
        self.debug = function( string ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // mbAdminApp debug
                mbAdminApp.debug( self.MODULE + ' ' + string );
                
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
    // DONE MODULE: optionsModule( void ) named array
    
})( mbAdminApp );
// done create module function
