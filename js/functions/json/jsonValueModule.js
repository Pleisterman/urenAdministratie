/* 
        @package        Pleisterman/MbAdmin
        function:       adds the function:
                            jsonValue( named array, named array ) let / undefined
                        to the application

        Last revision:  27-02-2025
 */

// create module function
( function( mbAdminApp ){
    
    // create name space
    mbAdminApp.functions = mbAdminApp.functions ? mbAdminApp.functions : {};
            
    // MODULE: jsonValueModule( void ) named array  
    mbAdminApp.functions.jsonValueModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                // object
        self.FUNCTION = 'FunctionsJsonValueModule';     // string
        self.debugOn = false;                           // boolean
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
            
            // add pad function
            mbAdminApp.getJsonValue = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.get = function( jsonObject, indexArray ){
        // FUNCTION: get( named array: jsonObject, named array: indexArray ) let / undefined
            
            // debug info
            self.debug( 'get' );
            
            // create depth
            let depth = 0;
            
            // get current object
            let currentObject = jsonObject;
            
            // loop over index array
            for( let i = 0; i < indexArray.length; i++ ){
            
                // current object is array
                if( Array.isArray( currentObject ) ){
                    
                    // debug info
                    self.debug( 'found array' + indexArray[depth] );
                    
                    // get index values
                    let indexValues = indexArray[depth].split( '=' );
                    
                    // get index 
                    let index = indexValues[0];
                    
                    // get value 
                    let value = indexValues[1];
                    
                    // loop over current object
                    Object.entries( currentObject ).forEach( ( [objectIndex, object] ) => {

                        // object found
                        if( object[index] === value ){
                            
                            // set current object
                            currentObject = object;

                            // next depth
                            depth++;
                            
                        }   
                        // object found
                        
                    });
                    // loop over current object
                    
                }
                else {
                    
                    // debug info
                    self.debug( 'found object' + indexArray[depth] );
                    
                    // set current object
                    currentObject = currentObject[indexArray[depth]];
                    
                    // next depth
                    depth++;
                    
                }
                // current object is array
                
            }
            // loop over index array
            
            // found / else
            if( depth === indexArray.length ){
                
                // debug info
                self.debug( 'value found: ' + currentObject );
                
                // return result
                return currentObject;
                
            }
            else {
                
                // debug info
                console.log( 'error getJsonValue object not found ' );
                console.log( 'object' +  JSON.stringify( jsonObject ) );
                console.log( 'search array' + JSON.stringify( indexArray ) );
                // debug info
                
                // return
                return undefined;
                
            }
            // done found / else
            
        // FUNCTION: getJ( named array: jsonObject, named array: indexArray ) let / undefined
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
    // DONE MODULE: jsonValueModule( void ) named array
    
})( mbAdminApp );
// done create module function
