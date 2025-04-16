/*
        @package        Pleisterman/MbAdmin
        function:       Ccontrols access to global values for the application
                        the values are mutable declarations which have global scope    
                        values are stored within a group
                        the module will add the functions:
                            addValue        create a new global value
                            addValueList    create a list of global values
                            getValue        get a value
                            setValue        set a value
                        to the app
        Last revision:  07-02-2025
 
*/

// create module function
( function( mbAdminApp ){
    
    // create name space
    mbAdminApp.service = mbAdminApp.service ? mbAdminApp.service : {};
            
    // MODULE: validateModule( void ) named array
    mbAdminApp.service.validateModule = function( ) {

        // valuesModule
        
        // private
        let self = this;                                            // object
        self.MODULE = 'ValidateModule';                             // string
        self.debugOn = false;                                       // boolean
        self.errors = {                                             // named array
            'valueEmpty'        :   'This value cannot be empty.',   // string
            'emailInValid'      :   'This is not a valid email address.'    // string
        };                                                          // done named array
        self.emailRegEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,64})$/; // string
        self.error = null;                                          // string / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add the extensions to the application
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add validate to application 
            mbAdminApp.validate = self.validate;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.validate = function( value, options ) {
        // FUNCTION: validate( var: value, named array: options ) named array        

            // no options
            if( !options ){
                
                // return valid
                return {
                    'message'   :   'Nothing to validate',
                    'valid'     :   true
                };
                // return valid
                
            }
            // no options
        
            // ! validate options
            if( !self.validateOptions( value, options ) ){
                
                // return invalid
                return {
                    'message'   :   self.error,
                    'valid'     :   false
                };
                // return invalid
                
            }
            // ! validate options
        
            // return valid
            return {
                'message'   :   'All is well',
                'valid'     :   true
            };
            // return valid
        
        };
        self.validateOptions = function( value, options ) {
        // FUNCTION validateOptions( var: value, named array: options ) boolean
        
            // option notEmpty exists
            if( options['notEmpty'] || options.indexOf( 'notEmpty' ) >= 0 ){

                // get options
                let emptyOptions = options['notEmpty'] ? options['notEmpty'] : {};

                // validate not empty
                 if( !self.validateNotEmpty( value, emptyOptions ) ){

                    // return invalid
                    return false;
                    
                }
                // validate not empty

            }
            // option notEmpty exists

            // option email exists
            if( options['email'] ){

                // validate not empty
                 if( !self.validateEmail( value, options['email'] ) ){

                    // return invalid
                    return false;
                    
                }
                // validate email

            }
            // option email exists
        
            // return valid
            return true;
                        
        // DONE FUNCTION validateOptions( var: value, named array: options ) boolean
        };
        self.validateNotEmpty = function( value, options ) {
        // FUNCTION validateNotEmpty( var: value, named array: options ) boolean

            // trim value
            value = value.trim();

            // value empty
            if( value === '' ){
                
                // set error
                self.error = options['error'] ?
                             options['error'] :
                             self.errors['valueEmpty'];
                // set error
                
                // return invalid
                return false;
                
            }
            // value empty
            
            // return valid
            return true;
        
        // DONE FUNCTION validateNotEmpty( var: value, named array: options ) boolean
        };
        self.validateEmail = function( value, options ) {
        // FUNCTION validateEmail( var: value, named array: options ) boolean

            // validate email
            if( !self.emailRegEx.test( value ) ){
                
                // set error
                self.error = options['error'] ?
                             options['error'] :
                             self.errors['emailInValid'];
                // set error
                
                // return invalid
                return false;
                
            }
            // validate email
                    
            // return valid
            return true;
            
        // DONE FUNCTION validateEmail( var: value, named array: options ) boolean
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
        
        // initialize the module 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: validateModule( void ) named array 
    
})( mbAdminApp );
// done create module function


