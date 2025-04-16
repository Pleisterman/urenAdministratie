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
            
    // MODULE: valuesModule( void ) named array
    mbAdminApp.service.valuesModule = function( ) {

        // valuesModule
        
        // private
        let self = this;                                    // object
        self.MODULE = 'valuesModule';                       // string
        self.debugOn = false;                               // boolean
        self.groups = {};                                   // named array
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
        
            // add functions to application 
            mbAdminApp.addValue = self.addValue;
            mbAdminApp.addValueList = self.addValueList;
            mbAdminApp.getValue = self.getValue;
            mbAdminApp.setValue = self.setValue;
            // add functions to application 
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addValue = function( id, group, value ) {
        // FUNCTION: addValue( string: id, string: group, var: value ) void            
            
            // debug info
            self.debug( 'addValue: ' + 'id:' + id + ', group, :' + group + ', value:' + value );
            
            // group ! exists
            if( self.groups[group] === undefined ){
                
                // create the group
                self.groups[group] = {};
                
            }    
            // group ! exists
            
            // group ! exists
            if( self.groups[group][id] !== undefined ){
                
                // debug info
                self.debug( 'add value warning value already exists id: ' +  id );
                
            }
            else {
                
                // add the value
                self.groups[group][id] = value;
                
            } 
            // group ! exists
            
        // DONE FUNCTION: addValue( string: id, string: group, var: value ) void            
        };
        self.addValueList = function( valueList, group ) {
        // FUNCTION: addValueList( named array: valueList, string: group ) void
            
            // debug info
            self.debug( 'addValueList: group, :' + group );
            
            // loop over value list
            for( let key in valueList ) {

                // add value
                self.addValue( key, group, valueList[key] );
                
            }                
            // loop over value list
            
        // DONE FUNCTION: addValueList( named array: valueList, string: group ) void
        };
        self.getValue = function( id, group ) {
        // FUNCTION: setValue( string: id, string: group ) var / undefined
            
            // debug info
            self.debug( 'getValue: ' + 'id:' + id + ', group, :' + group );
            
            // id exists
            if( self.groups[group][id] !== undefined ){
                
                // return result
                return self.groups[group][id];
                
            }
            // id exists
            
            // id not found error
            self.debug( 'get value error value not found id: ' +  id );
            
            // return undefined
            return undefined;
            
        // DONE FUNCTION: setValue( string: id, string: group ) var / undefined
        };
        self.setValue = function( id, group, value ) {
        // FUNCTION: setValue( string: id, string: group, var: value ) void
            
            // debug info
            self.debug( 'setValue: ' + 'id:' + id + ', group, :' + group + ', value:' + value );
            
            // value existst
            if( self.groups[group][id] !== undefined ){
                
                // set the value
                self.groups[group][id] = value;
            
                // done
                return;
                
            }
            // value existst
            
            // debug info
            self.debug( 'set value error value not found id: ' +  id );
                            
        // DONE FUNCTION: setValue( string: id, string: group, var: value ) void
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
    // DONE MODULE: setStyleModule( void ) named array 
    
})( mbAdminApp );
// done create module function


