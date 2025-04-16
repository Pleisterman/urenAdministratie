/*
        @package        Pleisterman/MbAdmin
  
        function:       controls selection of the delimiter for the export
  
        Last revision:  10-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.items.export;
    
    // MODULE: delimiterSelectModule( json: options ) named array
    nameSpace.delimiterSelectModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'ContentItemsExportDelimiterSelectModule';    // string
        self.debugOn = false;                                       // boolean
        self.options = options;                                     // named array
        self.delimiters = [                                         // named array
            {                                                       // named array
                'id'            :   'comma',                        // string
                'delimiter'     :   ',',                            // string
                'text'          :   'Comma'                         // string
            },                                                      // done named array
            {                                                       // named array
                'id'            :   'tab',                          // string
                'delimiter'     :   '   ',                          // string
                'text'          :   'Tab'                           // string
            },                                                      // done named array
            {                                                       // named array
                'id'            :   'semicolon',                    // string
                'delimiter'     :   ';',                            // string
                'text'          :   'Semicolon'                     // string
            }                                                       // done named array
        ];                                                          // done named array
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( string: id, function: callback ) void
        
            // debug info
            self.debug( 'getSelectData id: ' + id );
            
            // create json result
            let result = {
                'open' :    {
                    'rows'  :    self.delimiters
                }
            };
            // create json result
            
            // call callback
            callback( result );   

        // DONE FUNCTION: getSelectData( string: id, function: callback ) void
        };
        self.getValue = function( id ){
        // FUNCTION: getValue( string: id ) string: delimiter
            
            // create default delimiter
            let delimiter = ';';
            
            // search id
            Object.entries( self.delimiters ).forEach( ( [index, value] ) => {
                
                // id found
                if( value['id'] === id ){
                    
                    // set delimiter
                    delimiter = value['delimiter'];
                    
                }
                // done id found
                
            });
            // done search id
            
            // done 
            return delimiter;
            
        // DONE FUNCTION: getValue( string: id ) string: delimiter
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
            
            // FUNCTION: load( string: id, function: callback ) void
            getSelectData :  function( id, callback ){
                
                // call internal
                self.getSelectData( id, callback );
                
            },
            // FUNCTION: load( string: id ) string: delimiter
            getValue :  function( id ){
            
                // return internal call
                return self.getValue( id );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: delimiterSelectModule( named array: options ) named array
    
})( mbAdminApp );
// done create module function
