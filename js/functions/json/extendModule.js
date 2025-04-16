/*
    @package        Pleisterman/MbAdmin

    function:       Extends an array or object

                    Adds the function:

                        mbAdminApp.extend( named array / array: initial, named array / array: overRide ) named array / array / var
                    
                    to the application

    Last revision:  27-02-2025

*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.functions = mbAdminApp.functions ? mbAdminApp.functions : {};
            
    // MODULE: extendModule( void ) named array
    mbAdminApp.functions.extendModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'FunctionsExtendModule';              // string
        self.initial = null;                                // array / named array / null
        self.overRide = null;                               // array / named array / null
        self.result = null;                                 // array / named array / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to the application
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add extend function
            mbAdminApp.extend = self.extend;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.extend = function( initial, overRide ) {
        // FUNCTION: extend( named array / array: initial, named array / array: overRide ) named array / array / var

            // override ! set
            if( overRide === undefined ){

                // return initial
                return initial;
                
            }
            // override ! set
            
            // initial ! set
            if( initial === undefined ){

                // return override
                return overRide;
                
            }
            // initial ! set
            
            // start merge
            return self.startMerge( initial, overRide );
            
        // DONE FUNCTION: extend( named array / array: initial, named array / array: overRide ) named array / array / var
        };
        self.startMerge = function( initial, overRide ) {
        // FUNCTION: startMerge( named array: initial, named array: overRide ) var

            // create result
            let result = null;

            // both objects
            if( typeof initial === 'object' &&
                typeof overRide === 'object' ){
            
                // initialize result
                result = {};
                
                // copy initial
                result = self.merge( initial, result );
                
                // merge override
                return self.merge( overRide, result );
                
            }    
            // both objects
            
            // both arrays
            if( Array.isArray( initial ) &&
                Array.isArray( overRide ) ){
            
                // initialize result
                result = [];
                
                // copy initial
                result = self.merge( initial, result );
                
                // merge override
                return self.merge( overRide, result );
                
            }    
            // both arrays
            
            // set result
            result = overRide;
            
            // input invalid
            return result;

        // DONE FUNCTION: startMerge( named array: initial, named array: overRide ) var
        };
        self.merge = function( original, result ) {
        // FUNCTION: merge( var: original, var: result ) var

            // loop over override
            for( let position in original ) {
     
                // try / catch
                try {

                    // Property in initial object set
                    if ( original[position] &&
                         original[position].constructor === Object ){

                        // key length is 0 / else
                        if( Object.keys( original[position] ).length === 0 ){

                            // is array / else
                            if( Array.isArray( original[position] ) ){

                                // add array
                                result[position] = [];

                            }
                            else {
                                
                                // add named array
                                result[position] = {};
                                
                            }
                            // is array / else

                        }
                        else {
                            
                            // result ! exists
                            if( !result[position] ){
                                
                                // is array / else
                                if( Array.isArray( original[position] ) ){

                                    // add array
                                    result[position] = [];

                                }
                                else {

                                    // add named array
                                    result[position] = {};

                                }
                                // is array / else
                                
                            }
                            // result ! exists
                            
                            // merge 
                            result[position] = self.merge( original[position], result[position] );

                        }
                        // key length is 0 / else

                    } 
                    else {

                        // copy value
                        result[position] = original[position];

                    }
                    // Property in initial object set

                  } 
                  catch(e) {

                    // Property in initial object not set
                    result[position] = original[position];

                  }
                // try / catch
              
            }
            // loop over override
            
            // return initial
            return result;
  
        // DONE FUNCTION: merge( var: original, var: result ) var
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
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: extendModule( void ) named array 
    
})( mbAdminApp );
// done create module function


